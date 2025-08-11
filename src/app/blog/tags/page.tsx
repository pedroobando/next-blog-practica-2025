import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' }, include: { _count: true } });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Etiquetas del Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.name} href={`/blog/tags/${tag.id}`} passHref>
                <Badge
                  variant="secondary"
                  className="cursor-pointer px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag.name}
                  <span className="ml-1 text-xs opacity-70">
                    ({tag._count.articles.toString()})
                  </span>
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
