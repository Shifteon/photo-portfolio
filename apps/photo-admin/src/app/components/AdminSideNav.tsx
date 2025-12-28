'use client';

import { NavigationRail, NavigationRailItem } from '@portfolio/ui';
import { Home, Image, Library } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function AdminSideNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <NavigationRail>
      <NavigationRailItem
        icon={<Home />}
        label="Home"
        active={pathname === '/'}
        onClick={() => router.push('/')}
      />
      <NavigationRailItem
        icon={<Image />}
        label="Photos"
        active={pathname.startsWith('/photos')}
        onClick={() => router.push('/photos')}
      />
      <NavigationRailItem
        icon={<Library />}
        label="Collections"
        active={pathname.startsWith('/collections')}
        onClick={() => router.push('/collections')}
      />
    </NavigationRail>
  );
}
