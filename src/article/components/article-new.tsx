'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Calendar } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { addNewArticle } from '../actions/article-actions';

interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

interface IArticleCreateInput {
  title: string;
  content?: string | null | undefined;
  publishedAt?: string | Date | null | undefined;
  published?: boolean | undefined;
  imageUrl?: string | null | undefined;
  author?: { id: string; name: string; avatar: string };
  tags?: { name: string }[];
}

export const ArticleNew: React.FC = () => {
  const { data: session } = useSession();

  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  // Load articles from localStorage on component mount
  useEffect(() => {
    const savedArticles = localStorage.getItem('blog-articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  // Save articles to localStorage whenever articles change
  useEffect(() => {
    localStorage.setItem('blog-articles', JSON.stringify(articles));
  }, [articles]);

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!content.trim()) {
      newErrors.content = 'El contenido es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newArticle: IArticleCreateInput = {
      title: title,
      content: content,
      imageUrl: '/placeholder.svg',
      author: {
        id: session?.user?.id!,
        name: session?.user?.name!,
        avatar: session?.user?.image ?? '/placeholder.svg',
      },
      published: true,
      publishedAt: new Date(),
      tags: tags.map((tagItem) => ({ name: tagItem })),
    };

    await addNewArticle(newArticle);

    // Reset form
    setTitle('');
    setContent('');
    setTags([]);
    setCurrentTag('');
    setErrors({});
  };

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

  return (
    <>
      {/* Header */}
      {/* <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestor de Artículos</h1>
        <p className="text-gray-600">Crea y gestiona tus artículos de blog</p>
      </div> */}

      {/* New Article Form */}
      <Card id="newarticle" className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">Nuevo Artículo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <Input
                type="text"
                placeholder="Título del artículo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`text-lg ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Content Textarea */}
            <div>
              <Textarea
                placeholder="Contenido del artículo"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className={`resize-none ${errors.content ? 'border-red-500' : ''}`}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>

            {/* Tags Section */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Agregar etiqueta"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  size="icon"
                  disabled={!currentTag.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Display Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`${getTagColor(index)} cursor-pointer transition-colors`}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full text-lg py-6">
              Publicar artículo
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
