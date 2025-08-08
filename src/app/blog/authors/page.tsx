'use client';

import { PaginationLocal } from '@/components/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

// Definición de la interfaz para un autor
interface Author {
  id: string;
  name: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

// Placeholder data for authors
const authors: Author[] = [
  // Tipado explícito del array de autores
  {
    id: '1',
    name: 'Alice Johnson',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 1250,
    comments: 345,
  },
  {
    id: '2',
    name: 'Bob Smith',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 980,
    comments: 210,
  },
  {
    id: '3',
    name: 'Charlie Brown',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 1500,
    comments: 400,
  },
  {
    id: '4',
    name: 'Diana Prince',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 800,
    comments: 150,
  },
  {
    id: '5',
    name: 'Eve Adams',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 1100,
    comments: 280,
  },
  {
    id: '6',
    name: 'Frank White',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 750,
    comments: 120,
  },
  {
    id: '7',
    name: 'Grace Lee',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 1300,
    comments: 380,
  },
  {
    id: '8',
    name: 'Henry Green',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 900,
    comments: 190,
  },
  {
    id: '9',
    name: 'Ivy King',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 1050,
    comments: 250,
  },
  {
    id: '10',
    name: 'Jack Black',
    imageUrl: '/placeholder.svg?height=100&width=100',
    likes: 1600,
    comments: 450,
  },
];

const ITEMS_PER_PAGE: number = 6; // Define cuántos autores por página

export default function AuthorPage() {
  const [currentPage, setCurrentPage] = useState<number>(1); // Tipado explícito para useState

  const totalPages: number = Math.ceil(authors.length / ITEMS_PER_PAGE);
  const startIndex: number = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const currentAuthors: Author[] = authors.slice(startIndex, endIndex); // Tipado explícito

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Autores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <Card
            key={author.id}
            className="flex flex-col pl-0 py-0 rounded-sm shadow-sm overflow-hidden"
          >
            <div className="grid grid-cols-3 h-full">
              {/* Sección de la imagen (w-4/12) */}
              <div className="col-span-1 flex items-center justify-center bg-muted/20">
                <Avatar className="h-full w-full rounded-none">
                  <AvatarImage
                    src={author.imageUrl || '/placeholder.svg'}
                    alt={`@${author.name}`}
                  />
                  <AvatarFallback>
                    {author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Sección de detalles (w-8/12) */}
              <div className="col-span-2 flex flex-col justify-center px-4 py-2">
                <CardTitle className="text-xl font-semibold mb-1">{author.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-3">
                  Autor de artículos de blog
                </CardDescription>
                <CardContent className="flex items-center gap-4 p-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    <span>{author.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{author.comments}</span>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <PaginationLocal
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
