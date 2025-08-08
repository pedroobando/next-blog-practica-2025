'use server';

import { Prisma } from '@/prisma/gen';
import prisma from './prisma';
import { slugify } from './slugify';

const ArticlesData: Prisma.ArticleCreateInput[] = [
  {
    title: 'El Futuro del Desarrollo Web con React 18',
    slug: slugify('El Futuro del Desarrollo Web con React 18'),
    author: {
      create: {
        name: 'Pedro Perez',
        slug: 'pedro-perez',
        active: true,
        avatar: '/placeholder.svg?height=40&width=40',
      },
    },
    content:
      'React 18 introduce nuevas características revolucionarias que cambiarán la forma en que desarrollamos aplicaciones web. Con el nuevo sistema de renderizado concurrente, las aplicaciones serán más rápidas y responsivas que nunca...',

    tags: { create: [{ name: 'react' }, { name: 'JavaScript' }, { name: 'Frontend' }] },
  },
  {
    title: 'TypeScript: Mejores Prácticas para Proyectos Grandes',
    slug: slugify('TypeScript: Mejores Prácticas para Proyectos Grandes'),
    publishedAt: new Date('2024-01-14'),
    published: true,
    author: {
      create: {
        name: 'Juan Pérez',
        slug: 'juan-perez',
        active: true,
        avatar: '/placeholder.svg?height=40&width=40',
      },
    },
    content:
      'Cuando trabajamos en proyectos de gran escala, TypeScript se convierte en una herramienta indispensable. En este artículo exploraremos las mejores prácticas para mantener un código limpio y escalable...',

    tags: { create: [{ name: 'TypeScript' }, { name: 'Desarrollo' }] },
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
        slug: slugify('Ana López'),
        active: true,
        avatar: '/placeholder.svg?height=40&width=40',
      },
    },
    content:
      'La elección entre CSS Grid y Flexbox puede ser confusa para muchos desarrolladores. En este artículo analizaremos las fortalezas de cada tecnología y cuándo es mejor usar una sobre la otra...',

    tags: { create: [{ name: 'CSS' }, { name: 'Diseno' }, { name: 'Fitma' }] },
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
        slug: slugify('Carlos Ruiz'),
        active: true,
        avatar: '/placeholder.svg?height=40&width=40',
      },
    },
    content:
      'Los microservicios han revolucionado la arquitectura de software moderna. Aprende cómo implementar una arquitectura de microservicios robusta utilizando Node.js y las mejores herramientas del ecosistema...',

    tags: { create: [{ name: 'Node.js' }, { name: 'microservicios' }, { name: 'backend' }] },
  },
];

export async function main() {
  // await tagData;
  await prisma.article.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.tag.deleteMany({});

  for (const u of ArticlesData) {
    await prisma.article.create({ data: u });
  }
}
