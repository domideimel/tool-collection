type MenuItem = {
  link: string;
  name: string;
  description?: string;
  showInNav: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    link: '/',
    name: 'home.title',
    showInNav: false,
  },
  {
    link: 'password-generator',
    name: 'passwordGenerator.title',
    description: 'passwordGenerator.description',
    showInNav: true,
  },
  {
    link: 'redirect-generator',
    name: 'redirectGenerator.title',
    description: 'redirectGenerator.description',
    showInNav: true,
  },
];
