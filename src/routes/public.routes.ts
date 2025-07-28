
export interface Route {
  path: string;
  name: string;
  component: string;
}

export const publicRoutes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: 'HomePage'
  },
  {
    path: '/crear-hamburguesa',
    name: 'crear-hamburguesa',
    component: 'CrearHamburguesaPage'
  },
  {
    path: '/menu',
    name: 'menu',
    component: 'ComingSoon'
  },
  {
    path: '/acerca-de',
    name: 'acerca-de',
    component: 'ComingSoon'
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: 'ComingSoon'
  }
];

// Simple utility functions
export const getRouteByPath = (path: string): Route | undefined => {
  return publicRoutes.find(route => route.path === path);
};

export const getRouteByName = (name: string): Route | undefined => {
  return publicRoutes.find(route => route.name === name);
};

export const isActiveRoute = (currentPath: string, routePath: string): boolean => {
  return currentPath === routePath;
};
