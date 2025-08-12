'use client';
import { SessionProvider } from 'next-auth/react';

export const AuthProvider = ({ children, ...rest }: React.PropsWithChildren) => {
  return <SessionProvider {...rest}>{children}</SessionProvider>;
};
