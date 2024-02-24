

type MenuItem = {
  link: string;
  name: string;
  description?: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    link: '/',
    name: 'home.title',
  },
  {
    link: 'password-generator',
    name: 'passwordGenerator.title',
    description: 'passwordGenerator.description',
  },
];
