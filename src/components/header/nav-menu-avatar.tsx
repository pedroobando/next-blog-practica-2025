'use client';

import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
// import { auth } from '@/lib/auth/auth';

export const NavMenuAvatar: React.FC = () => {
  // const session = await auth();

  const { data: session } = useSession();

  // const session = false;
  const imagenUser = session ? session.user?.image : '/placeholder.svg';

  const handleLogin = () => {
    console.log('first');
    redirect('/api/auth/signin');
  };

  return (
    <Avatar onClick={() => handleLogin()}>
      <AvatarImage src={`${imagenUser}?height=32&width=32`} alt="Usuario" />
      <AvatarFallback>
        <User className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
};
