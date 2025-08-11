import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { BlogCard } from '@/components/blog-card';
import prisma from '@/lib/prisma';

// const articles = [
//   {
//     id: 1,
//     title: 'El Futuro del Desarrollo Web con React 18',
//     date: '2024-01-15',
//     author: {
//       name: 'María García',
//       avatar: '/placeholder.svg?height=40&width=40',
//     },
//     image: '/placeholder.svg?height=200&width=400',
//     content:
//       'React 18 introduce nuevas características revolucionarias que cambiarán la forma en que desarrollamos aplicaciones web. Con el nuevo sistema de renderizado concurrente, las aplicaciones serán más rápidas y responsivas que nunca...',
//     tags: [
//       { id: '23', name: 'React' },
//       { id: '222', name: 'JavaScript' },
//       { id: '2222', name: 'Frontend' },
//     ],
//     likes: 42,
//     comments: 8,
//   },
//   {
//     id: 2,
//     title: 'TypeScript: Mejores Prácticas para Proyectos Grandes',
//     date: '2024-01-14',
//     author: {
//       name: 'Juan Pérez',
//       avatar: '/placeholder.svg?height=40&width=40',
//     },
//     image: '/placeholder.svg?height=200&width=400',
//     content:
//       'Cuando trabajamos en proyectos de gran escala, TypeScript se convierte en una herramienta indispensable. En este artículo exploraremos las mejores prácticas para mantener un código limpio y escalable...',
//     tags: [
//       { id: '028', name: 'TypeScript' },
//       { id: '644', name: 'JavaScript' },
//       { id: '083', name: 'Desarrollo' },
//     ],
//     likes: 35,
//     comments: 12,
//   },
//   {
//     id: 3,
//     title: 'CSS Grid vs Flexbox: Cuándo Usar Cada Uno',
//     date: '2024-01-13',
//     author: {
//       name: 'Ana López',
//       avatar: '/placeholder.svg?height=40&width=40',
//     },
//     image: '/placeholder.svg?height=200&width=400',
//     content:
//       'La elección entre CSS Grid y Flexbox puede ser confusa para muchos desarrolladores. En este artículo analizaremos las fortalezas de cada tecnología y cuándo es mejor usar una sobre la otra...',
//     tags: [
//       { id: '028', name: 'CSS' },
//       { id: '644', name: 'Frontend' },
//       { id: '083', name: 'Diseno' },
//     ],
//     likes: 28,
//     comments: 6,
//   },
//   {
//     id: 4,
//     title: 'Introducción a los Microservicios con Node.js',
//     date: '2024-01-12',
//     author: {
//       name: 'Carlos Ruiz',
//       avatar: '/placeholder.svg?height=40&width=40',
//     },
//     image: '/placeholder.svg?height=200&width=400',
//     content:
//       'Los microservicios han revolucionado la arquitectura de software moderna. Aprende cómo implementar una arquitectura de microservicios robusta utilizando Node.js y las mejores herramientas del ecosistema...',
//     tags: [
//       { id: '028', name: 'Node.js' },
//       { id: '644', name: 'Microservicios' },
//       { id: '083', name: 'Backend' },
//     ],
//     likes: 51,
//     comments: 15,
//   },
// ];

export default async function BlogPage() {
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
