import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
// import { useState } from 'react';

// Definición de la interfaz para un autor
interface Author {
  id: string;
  name: string;
  avatar: string;
  likes: number;
  comments: number;
  active: true;
}

const ITEMS_PER_PAGE: number = 6; // Define cuántos autores por página

export default async function AuthorPage() {
  // const [currentPage, setCurrentPage] = useState<number>(1); // Tipado explícito para useState

  const authors = await prisma.author.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  });

  // const totalPages: number = Math.ceil(authors.length / ITEMS_PER_PAGE);
  // const startIndex: number = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex: number = startIndex + ITEMS_PER_PAGE;
  // const currentAuthors: Author[] = authors.slice(startIndex, endIndex); // Tipado explícito

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
                  <AvatarImage src={author.avatar || '/placeholder.svg'} alt={`@${author.name}`} />
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
                <Link href={`/blog/authors/${author.id}`}>
                  <CardTitle className="text-xl font-semibold mb-1">{author.name}</CardTitle>
                </Link>
                <CardDescription className="text-sm text-muted-foreground mb-3">
                  Autor de artículos de blog
                </CardDescription>
                <CardContent className="flex items-center gap-4 p-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    <span>{3}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{4}</span>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      {/* {totalPages > 1 && (
        <PaginationLocal
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )} */}
    </div>
  );
}
