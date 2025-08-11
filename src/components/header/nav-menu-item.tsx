'use client';
import { ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenuItem } from '../ui/navigation-menu';

interface IMenuItem {
  title: string;
  urlItem: string;
  iconItem: ReactElement;
}

export const NavMenuItem: React.FC<IMenuItem> = ({ title, urlItem, iconItem }) => {
  const pathName = usePathname();
  const separator = pathName.split('/');
  // const pathName2 = separator[separator.length - 2];

  // console.log(pathName2, pathName);

  return (
    <NavigationMenuItem>
      <Link
        href={urlItem}
        className={`flex flex-row items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary-foreground hover:dark:text-white transition-colors ${
          pathName === urlItem && 'text-primary bg-primary-foreground dark:bg-gray-300 '
        }`}
      >
        {iconItem}
        {title}
      </Link>
    </NavigationMenuItem>
  );
};
