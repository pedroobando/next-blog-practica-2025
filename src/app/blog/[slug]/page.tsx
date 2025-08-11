import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';

function formatDateES(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const findPost = await prisma.article.findFirst({
    where: { slug },
    include: { author: true, tags: true },
  });

  if (!findPost) {
    return <h1>Post no encontrado {slug}</h1>;
  }

  const related = [
    {
      slug: 'optimizar-renderizado-next-15',
      title: 'Optimiza el renderizado en Next.js 15',
      excerpt:
        'Aprende a combinar Server Components, caché y streaming para mejorar el TTFB y la experiencia de usuario.',
      image: '/placeholder.svg?height=360&width=640',
      tags: ['nextjs', 'rendering'],
    },
    {
      slug: 'patrones-de-diseno-con-shadcn',
      title: 'Patrones de diseño con shadcn/ui',
      excerpt:
        'Crea interfaces consistentes y accesibles con los componentes y tokens de diseño de shadcn.',
      image: '/placeholder.svg?height=360&width=640',
      tags: ['shadcn', 'design-system'],
    },
    {
      slug: 'tailwind-buenas-practicas',
      title: 'Tailwind CSS: buenas prácticas en proyectos grandes',
      excerpt:
        'Estrategias para escalabilidad: utilidades, variantes, temas y convenciones para equipos.',
      image: '/placeholder.svg?height=360&width=640',
      tags: ['tailwindcss', 'arquitectura'],
    },
  ];

  return (
    <main className="px-4 py-4 md:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        {/* Imagen de portada */}
        <div className="relative overflow-hidden rounded-2xl border bg-muted">
          <Image
            src={findPost.imageUrl || '/placeholder.svg'}
            alt={findPost.title}
            width={1200}
            height={600}
            className="h-120 w-full object-cover"
            priority
          />
          {/* Degradado para legibilidad del título */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="h-28 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          {/* Título superpuesto en la parte inferior */}
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow md:text-4xl">
              {findPost.title}
            </h1>
          </div>
        </div>

        {/* Encabezado */}
        <header className="mt-6 space-y-4">
          <Link href={`/blog/authors/${findPost.authorId}`} className="flex items-center gap-4">
            <Avatar className="size-11">
              <AvatarImage
                src={findPost.author.avatar || '/placeholder.svg'}
                alt={findPost.author.name}
              />
              <AvatarFallback aria-hidden="true">ML</AvatarFallback>
            </Avatar>

            <div className="leading-tight">
              <p className="font-medium">{findPost.author.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" aria-hidden="true" />
                <time dateTime={findPost.publishedAt?.toDateString()}>
                  {formatDateES(findPost.publishedAt?.toDateString()!)}
                </time>
                <span aria-hidden="true">{'•'}</span>
                <span>6 min de lectura</span>
              </div>
            </div>
          </Link>

          {/* Etiquetas principales */}
          <div className="flex flex-wrap gap-2 pt-1">
            {findPost.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="rounded-full px-3 py-1">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </header>

        {/* Contenido */}
        <section className="mt-8 space-y-6 text-base leading-7">
          <p className="text-muted-foreground">{findPost.content}</p>
        </section>

        {/* Etiquetas al final del contenido */}
        <footer className="mt-10">
          <h2 className="sr-only">Etiquetas del artículo</h2>
          <Separator className="mb-6" />
          <div className="flex flex-wrap gap-2">
            {findPost.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="rounded-full px-3 py-1">
                <div id={tag.id}>{tag.name}</div>
              </Badge>
            ))}
          </div>
        </footer>

        {/* Relacionados */}
        <section aria-labelledby="relacionados" className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 id="relacionados" className="text-xl font-semibold">
              Artículos relacionados
            </h2>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              Ver todos
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Card key={item.slug} className="group overflow-hidden py-0 rounded-sm">
                <Link href={`/blog/${item.slug}`} className="block">
                  <div className="overflow-hidden bg-muted">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={`Imagen de portada del artículo: ${item.title}`}
                      width={640}
                      height={360}
                      className="h-auto w-full transform object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription>{item.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tg) => (
                        <Badge
                          key={tg}
                          variant="secondary"
                          className="rounded-full px-2.5 py-0.5 text-xs"
                        >
                          {tg}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
