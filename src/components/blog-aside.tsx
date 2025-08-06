import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { NavUser } from './nav-user';

const recentArticles = [
  { id: 1, title: 'Introducción a React 18', date: '2024-01-15', author: 'María García' },
  { id: 2, title: 'TypeScript para Principiantes', date: '2024-01-14', author: 'Juan Pérez' },
  { id: 3, title: 'Mejores Prácticas en CSS', date: '2024-01-13', author: 'Ana López' },
  { id: 4, title: 'Node.js y Express', date: '2024-01-12', author: 'Carlos Ruiz' },
  { id: 5, title: 'Bases de Datos NoSQL', date: '2024-01-11', author: 'Laura Martín' },
  {
    id: 6,
    title: 'Desarrollo Mobile con React Native',
    date: '2024-01-10',
    author: 'Pedro Sánchez',
  },
  { id: 7, title: 'GraphQL vs REST API', date: '2024-01-09', author: 'Sofia Torres' },
  { id: 8, title: 'Testing en JavaScript', date: '2024-01-08', author: 'Miguel Herrera' },
  { id: 9, title: 'Docker para Desarrolladores', date: '2024-01-07', author: 'Elena Vega' },
  { id: 10, title: 'Microservicios con Node.js', date: '2024-01-06', author: 'Roberto Silva' },
];

export function BlogAside222() {
  // Datos de usuario de ejemplo para NavUser
  const currentUser = {
    name: 'María García',
    email: 'maria.garcia@example.com',
    avatar: '/placeholder.svg?height=80&width=80',
  };

  return (
    <div className="space-y-6">
      {/* Artículos Recientes */}
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Artículos Recientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentArticles.map((article) => (
            <div key={article.id} className="border-b pb-3 last:border-b-0">
              <h4 className="font-medium text-sm hover:text-primary cursor-pointer line-clamp-2">
                {article.title}
              </h4>
              <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-2">
                <Calendar className="h-3 w-3" />
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reemplazado por NavUser */}
      <NavUser user={currentUser} />
    </div>
  );
}
