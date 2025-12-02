import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        
          {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Inmobiliarias',
          route: '/components/Listarinmobiliaria',
          protected: true, 
           
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Usuario',
          route: '/components/usuario',
        },
      
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Clientes',
          route: '/components/cliente',

        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Simulador Financiero',
          route: '/components/registraeditacreditoprestamo',

        },
        {
          icon: 'assets/icons/heroicons/outline/currency-dollar.svg',
          label: 'Moneda',
          route: '/components/moneda',
          children: [
            { label: 'Listar Monedas', route: '/components/moneda' },
            { label: 'Registrar Moneda', route: '/components/moneda-registrar' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Tasa de Interés',
          route: '/components/tasa-interes',
          children: [
            { label: 'Listar Tasas', route: '/components/tasa-interes' },
            { label: 'Registrar Tasa', route: '/components/tasa-interes-registrar' },
          ],
        },
      ],
    },
  ];
}
