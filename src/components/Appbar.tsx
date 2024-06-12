import { auth } from '@/auth';
import Link from 'next/link';

export default async function Appbar() {
  const session = await auth();

  return (
    <div className="flex gap-2">
      <Link href="/">Home</Link>
      {session?.user ? (
        <div className="flex gap-2">
          <Link href="/profile">{`Profile(${session.user.name})`}</Link>
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        </div>
      ) : (
        <Link href="/api/auth/signin">Signin</Link>
      )}
    </div>
  );
}
