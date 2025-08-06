import { NavMenu } from './nav-menu';
import { NotificationMenu } from './notification-menu';
import { TitleMenu } from './title-menu';

export function BlogHeader() {
  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Titulo del menu */}
          <TitleMenu />
          {/* Navegación Central */}
          <NavMenu />
          {/* Usuario y Notificaciones */}
          <NotificationMenu />
        </div>
      </div>
    </header>
  );
}
