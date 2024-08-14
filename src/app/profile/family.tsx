import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import db from '@/db';
import { family } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Session } from 'next-auth';
import { FamilyForm } from './family-form';
import Icon from '@/components/icons';
import { FamilyJoinForm } from './family-join-form';
import { FamilyInvite } from './family-invite';

export default async function Family({ session }: { session: Session }) {
  const { user } = session;

  const families = await db
    .select()
    .from(family)
    .where(eq(family.id, user.familyId ?? 0));

  const hasFamily = families.length === 1;

  const familyItem = families[0];

  return (
    <Card>
      <CardHeader className="flex flex-column border-b">
        <CardTitle className="text-lg md:text-xl">Family</CardTitle>
        <CardDescription>
          Manage your family here! Family members can see each other&apos;s items and comment on
          them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasFamily ? (
          <p className="mt-4">You have not registered your family yet.</p>
        ) : (
          <div className="mt-5 flex items-center gap-4 p-2 rounded hover:bg-slate-800">
            <Icon icon="home" fontSize="32" />
            <div>
              <p>{familyItem?.name}</p>
              <p className="text-sm text-muted-foreground">{familyItem?.description}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {hasFamily ? (
          <div className="flex gap-2">
            <FamilyForm
              initialValues={{
                name: familyItem?.name ?? '',
                description: familyItem?.description ?? '',
              }}
            />
            <FamilyInvite />
          </div>
        ) : (
          <div className="flex gap-2">
            <FamilyForm />
            <FamilyJoinForm />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
