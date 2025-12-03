import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        
          {
          icon: 'assets/icons/heroicons/outline/building-office.svg',
          label: 'Inmobiliarias',
          route: '/components/Listarinmobiliaria',
          protected: true, 
           
        },
        {
          icon: 'assets/icons/heroicons/outline/user-group.svg',
          label: 'Usuario',
          route: '/components/table copy',
        },
                {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Credito Prestamo',
          route: '/components/credito-prestamo',
           
        },
      ],
    },
    {
      group: 'Collaboration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Download',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Gift Card',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Clientes',
          route: '/components/cliente',

        },
        {
          icon: 'assets/icons/heroicons/outline/calculator.svg',
          label: 'Simulador Financiero',
          route: '/components/registraeditacreditoprestamo',

        },
        {
          icon: 'assets/icons/heroicons/outline/currency-dollar.svg',
          label: 'Moneda',
          route: '/components/moneda',
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Tasa de Interés',
          route: '/components/tasa-interes',
        },
      ],
    },
  ];
}
