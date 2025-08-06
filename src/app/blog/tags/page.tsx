import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogTagsPage() {
  const tags = [
    { name: 'Next.js', count: 12 },
    { name: 'React', count: 25 },
    { name: 'Tailwind CSS', count: 8 },
    { name: 'Shadcn UI', count: 5 },
    { name: 'Desarrollo Web', count: 30 },
    { name: 'Frontend', count: 18 },
    { name: 'Backend', count: 10 },
    { name: 'JavaScript', count: 22 },
    { name: 'TypeScript', count: 15 },
    { name: 'Vercel', count: 7 },
    { name: 'Base de Datos', count: 9 },
    { name: 'API', count: 11 },
    { name: 'Rendimiento', count: 6 },
    { name: 'SEO', count: 4 },
    { name: 'UX/UI', count: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Etiquetas del Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                passHref
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag.name} <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
