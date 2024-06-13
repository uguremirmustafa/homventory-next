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

export default async function Family({ session }: { session: Session }) {
  const { user } = session;

  const families = await db
    .select()
    .from(family)
    .where(eq(family.id, user.familyId ?? 0));

  const hasFamily = families.length === 1;

  return (
    <Card>
      <CardHeader className="flex flex-column">
        <CardTitle className="text-lg md:text-xl">Family</CardTitle>
        <CardDescription>Manage your family here!</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasFamily ? (
          'You have not registered your family yet.'
        ) : (
          <div>
            <pre>{JSON.stringify(families, null, 2)}</pre>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {hasFamily ? (
          <Button size="sm" variant="outline">
            Invite family member
          </Button>
        ) : (
          <FamilyForm />
        )}
      </CardFooter>
    </Card>
  );
}
