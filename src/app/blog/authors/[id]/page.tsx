import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';

type Author = {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  interests: string[];
};

type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  image: string;
  tags: string[];
};

function toTitleCase(str: string) {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

function formatDateES(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const author = await prisma.user.findFirst({
    where: { id: id },
    select: {
      image: true,
      name: true,
      id: true,
      email: true,
      articles: {
        select: {
          slug: true,
          title: true,
          imageUrl: true,
          tags: true,
          publishedAt: true,
        },
      },
    },
    // orderBy: { publishedAt: 'desc' },
  });

  if (!author) {
    return (
      <main className="px-4 py-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center"></div>
        <h1 className="text-2xl font-bold">Autor no encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          No hemos podido encontrar información sobre este autor.
        </p>
      </main>
    );
  }

  return (
    <main className="px-4 py-4 md:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        {/* Banner superior opcional */}
        <div className="mb-8 overflow-hidden rounded-2xl border bg-muted">
          <Image
            src={author.image ?? '/placeholder.svg?height=240&width=1216'}
            alt={author.name!}
            width={1216}
            height={240}
            className="h-40 w-full object-cover md:h-56 lg:h-60"
            priority
          />
        </div>

        {/* Header del autor */}
        <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar className="h-16 w-16 ring-2 ring-foreground/5">
            <AvatarImage
              src={author.image || '/placeholder.svg'}
              alt={`Avatar de ${author.name}`}
            />
            <AvatarFallback aria-hidden="true">
              {author
                .name!.split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{author.name}</h1>
            <h4 className="text-muted-foreground">{author.email}</h4>
          </div>
        </header>

        <Separator className="my-8" />

        {/* Lista de artículos */}
        <section aria-labelledby="articulos-del-autor">
          <div className="mb-4 flex items-end justify-between">
            <h2 id="articulos-del-autor" className="text-xl font-semibold tracking-tight">
              Artículos publicados
            </h2>
            <p className="text-sm text-muted-foreground">
              {author.articles.length === 1 ? 'artículo' : 'artículos'}
            </p>
          </div>

          <ul className="grid gap-6 md:grid-cols-2">
            {author.articles.map((post) => (
              <li key={post.slug}>
                <Card className="group h-full overflow-hidden pt-0">
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="overflow-hidden bg-muted">
                      <Image
                        src={post.imageUrl || '/placeholder.svg'}
                        alt={`Portada del artículo: ${post.title}`}
                        width={640}
                        height={360}
                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <CardHeader className="space-y-2 p-4">
                      <CardTitle className="text-base md:text-lg">{post.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <time dateTime={post.publishedAt?.toDateString()}>
                          {formatDateES(post.publishedAt?.toDateString()!)}
                        </time>
                      </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between p-4 pt-0">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tg) => (
                          <Badge
                            key={tg.id}
                            variant="outline"
                            className="rounded-full px-2.5 py-0.5 text-xs"
                          >
                            {tg.name}
                          </Badge>
                        ))}
                      </div>
                      <span className="inline-flex items-center text-sm text-muted-foreground group-hover:text-foreground">
                        Leer artículo
                        <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
