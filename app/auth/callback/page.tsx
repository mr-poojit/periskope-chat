'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('Session error:', error);
        return;
      }

      const user = session.user;

      // Check if profile exists
      const { data: profileExists, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!profileExists && !profileError) {
        await supabase.from('profiles').insert({
          id: user.id,
          name: user.email?.split('@')[0], // default name
          avatar_url: '', // optional
        });
      }

      router.replace('/chats');
    };

    handleAuth();
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Signing you in...</p>
    </main>
  );
}