import { auth } from '@/auth';
import Icon from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col h-[calc(100vh_-_6rem)] gap-8 items-center justify-center">
      <img
        src="/logo-dark.svg"
        alt="logo"
        className="max-w-[250px] md:max-w-[400px] lg:max-w-[600px] mx-auto"
      />
      <div className="max-w-[250px] md:max-w-[400px] lg:max-w-[600px] mx-auto text-center">
        <h1 className="font-extrabold text-2xl md:text-4xl">You have lots of stuff!</h1>
        <p className="text-lg md:text-2xl">Manage them wisely...</p>
        <Separator className="my-3" />
        <p className="md:text-lg">Next generation inventory management solution for your home</p>

        <Button asChild variant="secondary" className="mt-4">
          <Link href="/item/new">
            Get Started <Icon icon="chevronRight" className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
