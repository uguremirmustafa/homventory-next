import { auth } from '@/auth';
import MainNavbar from './main-navbar';
import UserNavbar from './user-nav';

export default async function SiteHeader() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNavbar />
        <div className="ml-auto flex items-center space-x-4">
          <UserNavbar session={session} />
        </div>
      </div>
    </header>
  );
}
