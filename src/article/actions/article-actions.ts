'use server';

import prisma from '@/lib/prisma';
import { slugify } from '@/lib/slugify';

interface IArticleCreateInput {
  title: string;
  content?: string | null | undefined;
  publishedAt?: string | Date | null | undefined;
  published?: boolean | undefined;
  imageUrl?: string | null | undefined;
  author?: { id: string; name: string; avatar: string };
  tags?: { name: string }[];
}

export const addNewArticle = async (article: IArticleCreateInput) => {
  const newArticle = await prisma.article.create({
    data: {
      slug: slugify(article.title),
      title: article.title,
      authorId: article.author?.id ?? '',
      content: article.content,
      imageUrl: article.imageUrl,
      published: article.published,
      publishedAt: article.publishedAt,
      tags: {
        connectOrCreate:
          article.tags?.map((item) => ({
            where: { name: item.name.toLowerCase() },
            create: { name: item.name.toLowerCase() },
          })) ?? [],
      },
      createdAt: new Date(),
    },
  });

  if (!newArticle) {
    throw new Error('Error creating article');
  }

  return true;
};

export const getArticleByUser = async (
  userId: string,
): Promise<
  ({
    tags: {
      name: string;
      id: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  } & {
    authorId: string;
    title: string;
    id: string;
    slug: string;
    content: string | null;
    publishedAt: Date | null;
    published: boolean;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  })[]
> => {
  const articles = await prisma.article.findMany({
    where: { authorId: userId },
    orderBy: { title: 'asc' },
    include: { tags: true },
  });

  return articles;
};
