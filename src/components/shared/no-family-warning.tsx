import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Icon from '../icons';
import Link from 'next/link';

function NoFamilyWarning(): JSX.Element {
  return (
    <Alert>
      <Icon icon="warning" fontSize={20} />
      <AlertTitle className="font-bold">Warning! You do not have a family yet!</AlertTitle>
      <AlertDescription>
        You need to join to a family using a &apos;family join code&apos; or create your own family.
        Jump to{' '}
        <Link href="/profile" className="text-blue-500 underline">
          profile page
        </Link>{' '}
        to manage your family.
      </AlertDescription>
    </Alert>
  );
}

export default NoFamilyWarning;
