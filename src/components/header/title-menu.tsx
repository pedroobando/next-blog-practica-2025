'use client';

import React from 'react';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'; // Importa useSidebar

export const TitleMenu = () => {
  const { state } = useSidebar(); // Obtén el estado del sidebar
  console.log(state);

  return (
    <div className="flex items-center space-x-2">
      <SidebarTrigger className="-ml-1 hidden sm:block" />
      <h1
        className={`text-2xl font-bold text-primary ${state === 'expanded' ? 'hidden' : 'block'}`}
      >
        TechBlog
      </h1>
    </div>
  );
};
