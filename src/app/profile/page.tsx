import { auth } from '@/auth';
import PageTitle from '@/components/page-title';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { redirect } from 'next/navigation';
import Family from './family';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/profile');
  }

  const { user } = session;

  return (
    <div>
      <PageTitle primary="Profile" />
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
              <AvatarFallback className="uppercase">{user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg md:text-xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut provident aliquid suscipit.
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">
              Some action
            </Button>
          </CardFooter>
        </Card>
        <Family session={session} />
      </div>
    </div>
  );
}
