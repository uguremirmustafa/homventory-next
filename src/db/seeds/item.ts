import { InferInsertModel } from 'drizzle-orm';
import { item } from '../schema';

export const items: InferInsertModel<typeof item>[] = [
  {
    id: 1,
    name: 'desktop computer',
    description: 'workstation computer, ryzen5 2600 | rx570 gpu | 16gb 3200mhz | 512gb nvme',
    familyID: 1,
    ownerID: '',
    itemTypeID: 2,
  },
];
