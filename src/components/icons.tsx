import { Icon as IconComponent, IconProps } from '@iconify/react';

const icons = {
  hamburger: 'material-symbols:menu-rounded',
  logout: 'line-md:logout',
  add: 'material-symbols:add',
  settings: 'solar:settings-outline',
  dashboard: 'ri:dashboard-line',
  personAdd: 'line-md:account-add',
  sunny: 'line-md:sunny-filled-loop',
  night: 'line-md:sunny-filled-loop-to-moon-filled-loop-transition',
  homeCog: 'tabler:home-cog',
  home: 'tabler:home',
  back: 'tabler:arrow-back-up',
  camera: 'bi:camera',
  cameraEdit: 'fluent:camera-edit-20-regular',
  confirm: 'line-md:confirm-circle',
  close: 'ic:round-close',
  cameraIris: 'mdi:camera-iris',
  removeImg: 'mdi:image-remove-outline',
  upload: 'material-symbols:upload',
  account: 'line-md:account',
  email: 'line-md:email',
  editImg: 'mdi:image-edit-outline',
  edit: 'line-md:edit',
  verticalDots: 'heroicons-solid:dots-vertical',
  horizontalDots: 'mdi:dots-horizontal',
  delete: 'material-symbols:delete-outline',
  category: 'bx:category-alt',
  items: 'line-md:list',
  company: 'mdi:company',
  chevronRight: 'mdi:chevron-right',
  chevronLeft: 'mdi:chevron-left',
  chevronDown: 'mdi:chevron-down',
  skip: 'fluent:skip-forward-tab-20-regular',
  party: 'emojione-v1:party-popper',
  loading: 'line-md:loading-loop',
  mail: 'hugeicons:mail-send-02',
  slash: 'tabler:slash',
  resetImage: 'material-symbols:reset-image',
  check: 'material-symbols:check',
  image: 'material-symbols:image-outline',
  save: 'lucide:save',
  calendar: 'solar:calendar-linear',
  linkExternal: 'akar-icons:link-out',
} as const;

interface IProps extends Omit<IconProps, 'icon'> {
  icon: keyof typeof icons;
  loading?: boolean;
}

export default function Icon(props: IProps) {
  const { loading, ...rest } = props;
  return <IconComponent {...rest} icon={loading ? icons.loading : icons[props.icon]} />;
}
