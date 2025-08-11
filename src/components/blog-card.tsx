import Image from 'next/image';
import { Calendar, Heart, MessageCircle } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  slug: string;
  dateTime: Date;
  author: {
    slug: string;
    name: string;
    avatar: string;
    id: string;
  };
  image: string;
  content: string;
  tags: {
    id: string;
    name: string;
  }[];
  likes: number;
  comments: number;
}

export const BlogCard = (article: Props) => {
  return (
    <Card
      key={article.id}
      className="overflow-hidden border border-gray-200 shadow-sm rounded-sm py-0 pb-6 dark:bg-gray-800"
    >
      <Image
        src={article.image || '/placeholder.svg'}
        alt={article.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />

      <CardHeader className="flex flex-col md:flex-row justify-between items-start p-6 pb-4">
        <div className="flex-1 pr-4">
          <Link href={`/blog/${article.slug}`}>
            <h2 className="text-xl md:font-bold hover:text-primary cursor-pointer">
              {article.title}
            </h2>
          </Link>
        </div>

        <div className="flex flex-col items-end text-right space-y-2">
          <Link
            href={`/blog/authors/${article.author.id}`}
            className="hidden md:flex items-center space-x-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={article.author.avatar || '/placeholder.svg'}
                alt={article.author.name}
              />
              <AvatarFallback className="text-xs">
                {article.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-medium text-foreground">{article.author.name}</span>
          </Link>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{article.dateTime.toDateString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-6">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {article.content}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-6 pt-0">
        {/* Ajustado padding */}
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="text-xs">
              <Link href={`/blog/tags/${tag.name}`}>{tag.name}</Link>
            </Badge>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{article.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{article.comments}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
