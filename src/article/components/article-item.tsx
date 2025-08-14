import { Article } from '@/prisma/gen';
import { removeArticle } from '@/article/actions/article-actions';
import { Calendar, Trash2Icon } from 'lucide-react';
import { firstWords } from '@/lib/first-word';
import Link from 'next/link';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
  });
};

export const ArticleItem: React.FC<Article> = ({ content, id, publishedAt, slug, title }) => {
  const handleOnDelete = async (articleId: string) => {
    await removeArticle(articleId);
  };

  return (
    <li>
      {/* Article Title */}
      <h4 className="text-2xl font-bold text-gray-900 leading-tight flex items-center justify-between">
        <span className="flex  items-center">
          <button onClick={() => handleOnDelete(id)}>
            <Trash2Icon className="mr-2 w-5 h-5 text-muted-foreground hover:text-red-300" />
          </button>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </span>

        <span className="text-sm font-normal flex text-muted-foreground ">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Publicado el {formatDate(publishedAt?.toDateString()!)}</span>
        </span>
      </h4>

      {/* Article Content */}
      <p className="mx-2 text-gray-700 leading-relaxed whitespace-pre-wrap border-b-1 pb-2">
        {firstWords(content!, 10, true)}
      </p>
    </li>
  );
};
