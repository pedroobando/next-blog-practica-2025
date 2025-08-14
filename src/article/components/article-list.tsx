'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Article } from '@/prisma/gen';
import { ArticleItem } from '@/article/components/article-item';

interface Props {
  articleList: Article[];
}

export const ArticleList: React.FC<Props> = ({ articleList }) => {
  return (
    <div className="mt-6">
      {articleList.length === 0 ? (
        <DontHaveArticle />
      ) : (
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 px-6 py-4">
          <ul className="space-y-6">
            <h3 className="text-2xl mb-4 font-bold text-gray-900">Artículos Publicados</h3>
            {articleList.map((article) => (
              <ArticleItem key={article.id} {...article} />
            ))}
          </ul>
        </Card>
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
