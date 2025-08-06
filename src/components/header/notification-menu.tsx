'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Bell, Search, User, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '@/components/theme/mode-toggle';

export const NotificationMenu = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Buscando:', searchQuery);
      // Aquí puedes agregar la lógica de búsqueda
      alert(`Buscando: ${searchQuery}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Búsqueda */}
      <div className="relative">
        {!isSearchOpen ? (
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
        ) : (
          <div className="flex items-center space-x-2 bg-background border rounded-md px-3 py-1 min-w-[300px]">
            <Input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={handleSearch} className="h-6 w-6">
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Notificaciones */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
          3
        </Badge>
      </Button>

      <ModeToggle />

      {/* Avatar del Usuario */}
      <Avatar>
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
