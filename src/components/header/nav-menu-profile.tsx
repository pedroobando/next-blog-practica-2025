'use client';

import React from 'react';
import { NavMenuItem } from './nav-menu-item';
import { UserPenIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

export const NavMenuProfile: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <NavMenuItem
      key={'Profile-Menu'}
      title={'Profile'}
      urlItem={'/blog/profile'}
      iconItem={<UserPenIcon className="w-4 h-4" />}
    />
  );
};
