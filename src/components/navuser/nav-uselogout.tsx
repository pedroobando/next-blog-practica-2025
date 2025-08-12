'use client';

import { FC } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';

export const NavUserLogOut: FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <DropdownMenuItem>
        <LogOutIcon />
        Loagin...
      </DropdownMenuItem>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <DropdownMenuItem onClick={() => signIn()}>
        <LogInIcon />
        SignIn
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem onClick={() => signOut()}>
      <LogOutIcon />
      LogOut
    </DropdownMenuItem>
  );
};
