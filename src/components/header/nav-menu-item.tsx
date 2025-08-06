import { ReactElement } from 'react';
import { NavigationMenuItem } from '../ui/navigation-menu';
import Link from 'next/link';

interface IMenuItem {
  title: string;
  urlItem: string;
  iconItem: ReactElement;
}

export const NavMenuItem: React.FC<IMenuItem> = ({ title, urlItem, iconItem }) => {
  return (
    <NavigationMenuItem>
      <Link
        href={urlItem}
        className="flex flex-row items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary-foreground
              transition-colors"
      >
        {iconItem}
        {title}
      </Link>
    </NavigationMenuItem>
  );
};
