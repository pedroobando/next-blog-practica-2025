import { ReactElement } from 'react';
import { FingerprintIcon, HouseIcon, NewspaperIcon, TagIcon } from 'lucide-react';
import { NavMenuItem } from './nav-menu-item';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';

const menuItems: {
  title: string;
  urlItem: string;
  iconItem: ReactElement;
}[] = [
  {
    title: 'Articulos',
    urlItem: '/blog',
    iconItem: <NewspaperIcon className="w-4 h-4" />,
  },
  {
    title: 'Autores',
    urlItem: '/blog/autores',
    iconItem: <FingerprintIcon className="w-4 h-4" />,
  },
  {
    title: 'tags',
    urlItem: '/blog/tags',
    iconItem: <TagIcon className="w-4 h-4" />,
  },
  {
    title: 'Acerca',
    urlItem: '/blog/about',
    iconItem: <HouseIcon className="w-4 h-4" />,
  },
];

export const NavMenu = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-x-2">
        {menuItems.map((navItem) => (
          <NavMenuItem
            key={navItem.urlItem}
            title={navItem.title}
            urlItem={navItem.urlItem}
            iconItem={navItem.iconItem}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
