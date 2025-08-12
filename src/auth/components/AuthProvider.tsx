'use client';
import { SessionProvider } from 'next-auth/react';
// import React from 'react';

// interface Props extends React.PropsWithChildren {}

export const AuthProvider = ({ children, ...rest }: React.PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};
