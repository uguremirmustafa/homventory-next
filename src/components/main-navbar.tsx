'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainNavbar() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image src="/logo-dark.svg" className="h-10" alt="logo" width={60} height={40} />
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/items"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/items' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Inventory
        </Link>
        <Link
          href="https://github.com/uguremirmustafa"
          className={cn(
            'hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block'
          )}
        >
          GitHub
        </Link>
      </nav>
    </div>
  );
}
