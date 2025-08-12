import { Prisma, PrismaClient } from '@/prisma/gen';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { slugify } from '@/lib/slugify';

const ArticlesData: Prisma.ArticleCreateInput[] = [
  {
    title: 'El Futuro del Desarrollo Web con React 18',
    slug: slugify('El Futuro del Desarrollo Web con React 18'),
    published: true,
    publishedAt: new Date('2023-12-24'),
    author: {
      create: {
        name: 'Pedro Perez',
        image: '/placeholder.svg?height=40&width=40',
        email: 'pedroperez@pecaditos.com',
        password: bcrypt.hashSync('12345', 2),
      },
    },
    content:
      'React 18 introduce nuevas características revolucionarias que cambiarán la forma en que desarrollamos aplicaciones web. Con el nuevo sistema de renderizado concurrente, las aplicaciones serán más rápidas y responsivas que nunca...',
    tags: { create: [{ name: 'react' }, { name: 'javascript' }] },
  },
  {
    title: 'TypeScript: Mejores Prácticas para Proyectos Grandes',
    slug: slugify('TypeScript: Mejores Prácticas para Proyectos Grandes'),
    publishedAt: new Date('2024-01-14'),
    published: true,
    author: {
      create: {
        name: 'Juan Pérez',
        image: '/placeholder.svg?height=40&width=40',
        email: 'juan-perez@calculator.com',
        password: bcrypt.hashSync('12345', 2),
      },
    },
    content:
      'Cuando trabajamos en proyectos de gran escala, TypeScript se convierte en una herramienta indispensable. En este artículo exploraremos las mejores prácticas para mantener un código limpio y escalable...',
    tags: { create: [{ name: 'typescript' }] },
  },

  {
    title: 'CSS Grid vs Flexbox: Cuándo Usar Cada Uno',
    slug: slugify('CSS Grid vs Flexbox: Cuándo Usar Cada Uno'),
    publishedAt: new Date('2024-01-13'),
    published: true,
    imageUrl: '/placeholder.svg?height=200&width=400',
    author: {
      create: {
        name: 'Ana López',
        image: '/placeholder.svg?height=40&width=40',
        email: 'sorraardiente@todorelatos.com',
        password: bcrypt.hashSync('12345', 2),
      },
    },
    content:
      'La elección entre CSS Grid y Flexbox puede ser confusa para muchos desarrolladores. En este artículo analizaremos las fortalezas de cada tecnología y cuándo es mejor usar una sobre la otra...',

    tags: { create: [{ name: 'css' }, { name: 'diseño' }] },
  },

  {
    title: 'Introducción a los Microservicios con Node.js',
    slug: slugify('Introducción a los Microservicios con Node.js'),
    publishedAt: new Date('2024-08-24'),
    published: true,
    imageUrl: '/placeholder.svg?height=200&width=400',
    author: {
      create: {
        name: 'Carlos Ruiz',
        image: '/placeholder.svg?height=40&width=40',
        email: 'carlos.ruiz@yahoo.com',
        password: bcrypt.hashSync('12345', 2),
      },
    },
    content:
      'Los microservicios han revolucionado la arquitectura de software moderna. Aprende cómo implementar una arquitectura de microservicios robusta utilizando Node.js y las mejores herramientas del ecosistema...',
    tags: { create: [{ name: 'microservicios' }, { name: 'backend' }] },
  },
];

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  await prisma.article.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tag.deleteMany({});

  for (const u of ArticlesData) {
    await prisma.article.create({ data: u });
  }

  return NextResponse.json({ message: 'Seed Executed' });
}
