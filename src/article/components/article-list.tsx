'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { getArticleByUser } from '@/article/actions/article-actions';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const tagColors = [
  'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'bg-green-100 text-green-800 hover:bg-green-200',
  'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'bg-orange-100 text-orange-800 hover:bg-orange-200',
  'bg-pink-100 text-pink-800 hover:bg-pink-200',
  'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
];

const getTagColor = (index: number) => {
  return tagColors[index % tagColors.length];
};

interface Props {
  authorId: string;
}

interface IArticleList {
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
  tags: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export const ArticleList: React.FC<Props> = ({ authorId }) => {
  const { data: session, status } = useSession();
  const [articles, setArticles] = useState<IArticleList[]>([]);

  if (status === 'unauthenticated') {
    signIn();
  }

  useEffect(() => {
    const getArticle = async () => {
      const tmp = await getArticleByUser(authorId);
      setArticles(tmp);
    };
    getArticle();
    return () => {};
  }, [authorId]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Artículos Publicados</h2>

      {articles.length === 0 ? (
        <DontHaveArticle />
      ) : (
        <ul className="space-y-6">
          {articles.map((article, articleIndex) => (
            <li key={article.id}>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Article Title */}
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {article.title}
                    </h3>

                    {/* Article Content */}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {article.content}
                    </p>

                    {/* Tags */}
                    {article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge key={tag.id} variant="secondary" className={getTagColor(tagIndex)}>
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Creation Date */}
                    <div className="flex items-center text-sm text-gray-500 pt-2 border-t">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Publicado el {formatDate(article.publishedAt?.toDateString()!)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DontHaveArticle: React.FC = () => {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <p className="text-gray-500 text-lg">
          No hay artículos publicados aún. ¡Crea tu primer artículo!
        </p>
      </CardContent>
    </Card>
  );
};
