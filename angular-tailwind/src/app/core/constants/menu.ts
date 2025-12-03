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
          label: 'Credito Prestamo',
          route: '/components/credito-prestamo',          
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
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Moneda',
          route: '/components/moneda',
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Tasa de Interés',
          route: '/components/tasa-interes',
        },
                {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Entidades Financieras',
          route: '/components/entidad-financiera-table',
        },        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Entidad Tasa',
          route: '/components/entidad-tasa-table',
        },
      ],
    },
    
  ];
}
