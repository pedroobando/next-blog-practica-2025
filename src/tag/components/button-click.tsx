'use client';

import React from 'react';
import { main } from '@/lib/seed';

export const ButtonClick = () => {
  const handleOnClick = async () => {
    await main();
  };

  return (
    <button
      onClick={() => handleOnClick()}
      className="w-2/12 border-2 px-3 py-2 bg-violet-200 border-violet-400 rounded-xl hover:bg-violet-300"
    >
      Press
    </button>
  );
};
