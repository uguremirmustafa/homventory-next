import { auth } from '@/auth';
import Image from 'next/image';

import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/profile');
  }

  return (
    <div>
      <p>profile</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Image
        src={session?.user?.image ?? ''}
        alt="avatar"
        className="avatar"
        width={40}
        height={40}
      />
    </div>
  );
}
