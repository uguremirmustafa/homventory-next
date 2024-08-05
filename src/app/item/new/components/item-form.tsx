'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { itemFormSchema, ItemFormValues } from '../schema';
import { useState, useTransition } from 'react';
import { ItemType } from '@/app/items/queries';
import ItemTypeSelector from './item-type-selector';
import { Form, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icons';
import ImageStep from './image-step';
import DetailsStep from './details-step';
import FormSummary from './form-summary';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { createItemAction } from '../actions';
import { useRouter } from 'next/navigation';

interface IProps {
  itemTypes: ItemType[];
}

const steps = ['Category Selection', 'Image Upload', 'General Details'] as const;
export type ItemFormStep = (typeof steps)[number];

function ItemForm(props: IProps): JSX.Element {
  const { itemTypes } = props;
  const router = useRouter();

  const form = useForm<ItemFormValues>({
    defaultValues: { description: '', name: '', itemTypeId: '', image: '' },
    resolver: zodResolver(itemFormSchema),
    mode: 'onTouched',
  });
  const [step, setStep] = useState<ItemFormStep>('Category Selection');
  const [isPending, startTransition] = useTransition();

  function prev() {
    const stepIndex = steps.indexOf(step);
    const newIndex = stepIndex === 0 ? 0 : stepIndex - 1;

    setStep(steps[newIndex]);
  }
  async function next() {
    const passed = await validateStep(step);
    if (!passed) return step;
    setStep((step) => {
      const stepIndex = steps.indexOf(step);
      const newIndex = stepIndex === steps.length - 1 ? steps.length - 1 : stepIndex + 1;
      return steps[newIndex];
    });
  }

  async function validateStep(step: ItemFormStep) {
    let passed = false;
    switch (step) {
      case 'Category Selection':
        passed = await form.trigger('itemTypeId');
        break;
      case 'Image Upload':
        passed = await form.trigger('image');
        break;
      case 'General Details':
        passed = await form.trigger(['name', 'description']);
        break;
      default:
        break;
    }
    return passed;
  }

  const isOnFirstStep = step === steps[0];
  const isOnLastStep = step === steps[steps.length - 1];

  async function onSubmit(data: ItemFormValues) {
    if (isOnLastStep) {
      const passed = await validateStep(step);
      if (!passed) return;

      startTransition(async () => {
        const res = await createItemAction(data);
        if (!res?.success) {
          form.setError('root', { message: res.message });
        } else {
          const path = `/item/${res.data?.id}`;
          router.push(path);
          toast({
            title: 'Success!',
            description: res.message,
          });
        }
      });
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <FormProvider {...form}>
        <Form {...form}>
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">New Item Form</CardTitle>
                <CardDescription className="border-b pb-3">{step}</CardDescription>
              </CardHeader>
              <CardContent>
                {form.formState.errors.root && (
                  <div className="text-red-500 text-sm">{form.formState.errors.root.message}</div>
                )}
                <form id="item-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                  {step === 'Category Selection' && <ItemTypeSelector itemTypes={itemTypes} />}
                  {step === 'Image Upload' && <ImageStep />}
                  {step === 'General Details' && <DetailsStep />}
                </form>
              </CardContent>
              <CardFooter className="flex justify-end gap-5">
                {!isOnFirstStep && (
                  <Button variant="outline" size="sm" type="button" onClick={() => prev()}>
                    <Icon icon="chevronLeft" className="mr-2" />
                    <span className="mr-1">Previous</span>
                  </Button>
                )}
                {isOnLastStep && (
                  <Button size="sm" variant="default" type="submit" form="item-form">
                    <span className="ml-1">Submit</span>
                    <Icon icon="check" className="ml-2" />
                  </Button>
                )}
                {!isOnLastStep && (
                  <Button size="sm" variant="secondary" type="button" onClick={() => next()}>
                    <span className="ml-1">Next</span>
                    <Icon icon="chevronRight" className="ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-1">
            <FormSummary itemTypes={itemTypes} />
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

export default ItemForm;
