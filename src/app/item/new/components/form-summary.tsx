import { Icon as IconComponent } from '@iconify/react';
import { useFormContext } from 'react-hook-form';
import { ItemFormValues } from '../schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ItemType } from '@/app/items/queries';
import Icon from '@/components/icons';
import { ItemFormStep } from './item-form';

interface IProps {
  itemTypes: ItemType[];
  step: ItemFormStep;
}

function FormSummary(props: IProps): JSX.Element {
  const { itemTypes, step } = props;

  const { watch } = useFormContext<ItemFormValues>();
  const itemTypeId = watch('itemTypeId');
  // @ts-ignore
  const itemType = itemTypes.find((x) => x.id.toString() === itemTypeId);

  const imgUrl = watch('image');
  const name = watch('name');
  const description = watch('description');
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Form Summary</CardTitle>
        <CardDescription className="border-b pb-3">
          See the progress of your form here!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {itemType && (
            <div>
              <p className="text-muted-foreground text-sm mb-1">Category</p>
              <div className="flex gap-2 items-center">
                <IconComponent icon={itemType?.icon} fontSize={20} />
                <span className="capitalize">{itemType.name}</span>
              </div>
            </div>
          )}
          {imgUrl && (
            <div>
              <p className="text-muted-foreground text-sm mb-1">Image</p>
              <div className="flex gap-2 items-center">
                {/* <Icon icon="image" fontSize={20} /> <span>Image is ready!</span> */}
                <img src={imgUrl} className="h-20 rounded" />
              </div>
            </div>
          )}
          {name && (
            <div>
              <p className="text-muted-foreground text-sm mb-1">Name</p>
              <div className="flex gap-2 items-center">
                <span className="capitalize">{name}</span>
              </div>
            </div>
          )}
          {description && (
            <div>
              <p className="text-muted-foreground text-sm mb-1">Description</p>
              <div className="flex gap-2 items-center">
                <span>{description}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default FormSummary;
