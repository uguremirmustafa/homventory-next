import { auth } from '@/auth';
import PageTitle from '@/components/page-title';

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <PageTitle primary="Dashboard" />
      <p>Welcome to your home inventory!</p>
    </main>
  );
}
