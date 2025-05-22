'use client';

import { useEffect, useState } from 'react';
import ChatList from '../../components/ChatList';
import ChatWindow from '../../components/ChatWindow';
import { supabase } from '../../lib/supabaseClient';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface Chat {
  id: string;
  messages: Message[];
}

export default function ChatsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [profiles, setProfiles] = useState<{ [key: string]: string }>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user.id) {
        const uid = data.session.user.id;
        setUserId(uid);
        fetchChats(uid);
        fetchProfiles();
      }
    });
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username');
    if (!error && data) {
      const map: { [key: string]: string } = {};
      data.forEach((p) => {
        map[p.id] = p.username || 'Unknown';
      });
      setProfiles(map);
    }
  };

  async function fetchChats(uid: string) {
    const { data, error } = await supabase
      .from('chat_members')
      .select('chat_id, chats (id, created_at)')
      .eq('user_id', uid);

    if (!error && data) {
      const chatList = data.map((item) => ({
        id: item.chat_id,
        messages: [],
      }));
      setChats(chatList);
      if (chatList.length > 0) {
        setActiveChatId(chatList[0].id);
        fetchMessages(chatList[0].id);
      }
    }
  }

  async function fetchMessages(chatId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at');

    if (!error && data) {
      setMessages(data);
    }
  }

  async function handleSend(content: string) {
    if (!userId || !activeChatId) return;

    const { data, error } = await supabase.from('messages').insert({
      chat_id: activeChatId,
      sender_id: userId,
      content,
    });

    if (!error && data) {
      setMessages((prev) => [...prev, data[0]]);
    }
  }

  // ✅ Realtime listener
  useEffect(() => {
    if (!activeChatId) return;

    const channel = supabase
      .channel(`chat-${activeChatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${activeChatId}`,
        },
        (payload) => {
        const newMessage = payload.new as Message; // ✅ Strong typing
        setMessages((prev) => [...prev, newMessage]);
      }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChatId]);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
    <main className="flex h-screen">
      <ChatList
        chats={chats.map((c) => ({
          id: c.id,
          name: `Chat ${c.id.slice(0, 4)}`,
          lastMessage: '',
        }))}
        activeChatId={activeChatId ?? ''}
        onSelectChat={(id) => {
          setActiveChatId(id);
          fetchMessages(id);
        }}
      />
      <ChatWindow
        userName={activeChat?.id ?? ''}
        messages={messages.map((msg) => ({
          id: msg.id,
          sender:
            msg.sender_id === userId
              ? 'You'
              : profiles[msg.sender_id] || 'Other',
          content: msg.content,
          timestamp: msg.created_at,
        }))}
        onSend={handleSend}
      />
    </main>
  );
}
