import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Item } from '../../queries';
import { format, formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface IProps {
  item: Item;
}
function ItemCard(props: IProps): JSX.Element {
  const { item } = props;
  const { id, name, description, updatedAt } = item;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{`last update: ${formatDistance(
          new Date(updatedAt),
          new Date()
        )} ago`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="px-0">
          <Link href={`/item/${id}/base`}>See details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ItemCard;
