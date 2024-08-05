import { InferInsertModel } from 'drizzle-orm';
import { itemType } from '../schema';

export const itemTypes: InferInsertModel<typeof itemType>[] = [
  {
    id: 1,
    name: 'clothing, shoes and accessories',
    description: 'You can store clothing items, shoes and accessories under this category.',
    icon: 'ion:shirt-outline',
  },
  {
    id: 2,
    name: 'technological device',
    description: 'Laptops, sound systems, cables and mobile phones etc.',
    icon: 'ph:devices-light',
  },
  {
    id: 3,
    name: 'furniture',
    description: 'Sofa, bed, chairs and carpets. Any furniture can be stored under this category.',
    icon: 'solar:sofa-2-linear',
  },
  {
    id: 4,
    name: 'household appliances',
    description: 'Fridge, oven, microwave and your favourite toaster goes here.',
    icon: 'solar:fridge-outline',
  },
  {
    id: 5,
    name: 'cooking utensils',
    description: 'Spoons, pots and forks. Dont forget the jars.',
    icon: 'hugeicons:kitchen-utensils',
  },
  {
    id: 6,
    name: 'sports equipment',
    description: 'Bike, yoga mat and weights.',
    icon: 'game-icons:weight-lifting-up',
  },
  {
    id: 7,
    name: 'stationery and books',
    description: 'Pencils, A4 papers, books and notebooks goes here.',
    icon: 'lucide:notebook-pen',
  },
];
