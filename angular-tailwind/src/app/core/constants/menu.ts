import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/calculator1.svg',
          label: 'Metodo-Frances',
          route: '/components/metodo_frances',
        },
          {
          icon: 'assets/icons/heroicons/outline/inmobiliaria.svg',
          label: 'Inmobiliaria',
          route: '/components/Listarinmobiliaria',
          protected: true, 
           
        },
        {
          icon: 'assets/icons/heroicons/outline/user.svg',
          label: 'Usuario',
          route: '/components/usuario',
        },
        {
          icon: 'assets/icons/heroicons/outline/prestamo1.svg',
          label: 'Credito Prestamo',
          route: '/components/credito-prestamo',

        },
        {
          icon: 'assets/icons/heroicons/outline/cliente.svg',
          label: 'Clientes',
          route: '/components/cliente',

        },
        {
          icon: 'assets/icons/heroicons/outline/moneda.svg',
          label: 'Moneda',
          route: '/components/moneda',
          children: [
            { label: 'Listar Monedas', route: '/components/moneda' },
            { label: 'Registrar Moneda', route: '/components/moneda-registrar' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/tasa1.svg',
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
