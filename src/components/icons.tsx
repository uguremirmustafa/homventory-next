import { Icon as IconComponent, IconProps } from '@iconify/react';

const icons = {
  hamburger: 'material-symbols:menu-rounded',
  logout: 'line-md:logout',
  settings: 'solar:settings-outline',
  dashboard: 'ri:dashboard-line',
  personAdd: 'line-md:account-add',
  sunny: 'line-md:sunny-filled-loop',
  night: 'line-md:sunny-filled-loop-to-moon-filled-loop-transition',
  homeCog: 'tabler:home-cog',
  back: 'tabler:arrow-back-up',
  camera: 'bi:camera',
  cameraEdit: 'fluent:camera-edit-20-regular',
  confirm: 'line-md:confirm-circle',
  close: 'ic:round-close',
  cameraIris: 'mdi:camera-iris',
  removeImg: 'mdi:image-remove-outline',
  upload: 'line-md:upload-outline-loop',
  account: 'line-md:account',
  email: 'line-md:email',
  editImg: 'mdi:image-edit-outline',
  edit: 'line-md:edit',
  verticalDots: 'mdi:dots-vertical',
  horizontalDots: 'mdi:dots-horizontal',
  delete: 'material-symbols:delete-outline',
  category: 'bx:category-alt',
  items: 'line-md:list',
  company: 'mdi:company',
  chevronRight: 'line-md:chevron-right',
  chevronLeft: 'line-md:chevron-left',
  skip: 'fluent:skip-forward-tab-20-regular',
  party: 'emojione-v1:party-popper',
  loading: 'line-md:loading-loop',
} as const;

interface IProps extends Omit<IconProps, 'icon'> {
  icon: keyof typeof icons;
  loading?: boolean;
}

export default function Icon(props: IProps) {
  const { loading, ...rest } = props;
  return <IconComponent {...rest} icon={loading ? icons.loading : icons[props.icon]} />;
}
