import { redirect } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog-card';

import { auth } from '@/lib/auth/auth';
import prisma from '@/lib/prisma';

export default async function BlogPage() {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');

  const { user } = session;

  const articles = await prisma.article.findMany({
    where: { published: true },
    include: { author: true, tags: true },
  });

  return (
    <div className="px-8">
      {/* Artículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <BlogCard
            key={article.id}
            id={article.id.toString()}
            slug={article.slug}
            title={article.title}
            dateTime={article.publishedAt!}
            author={{
              name: article.author.name,
              avatar: article.author.avatar!,
              slug: article.author.slug,
              id: article.authorId,
            }}
            image={article.imageUrl ?? ''}
            content={article.content ?? ''}
            tags={article.tags}
            likes={10}
            comments={20}
          />
        ))}
      </div>
      {/* Navegación */}
      <div className="flex justify-center space-x-4 mt-8">
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <ChevronLeft className="h-4 w-4" />
          <span>Atrás</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <span>Adelante</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
