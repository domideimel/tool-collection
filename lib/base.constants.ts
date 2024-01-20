type MenuItem = {
  link: string;
  name: string;
  description?: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    link: '/',
    name: 'Home',
  },
  {
    link: '/password-generator',
    name: 'Password Generator',
    description:
      'Ein Passwort-Generator ist ein Tool, das starke und sichere Passwörter erstellt, die schwer zu knacken sind. Es generiert zufällige Passwörter, die aus Buchstaben, Zahlen und Sonderzeichen bestehen, um eine hohe Sicherheit zu gewährleisten. Dieses Tool ist besonders nützlich, um einzigartige Passwörter für jede Ihrer Online-Konten zu erstellen und so Ihre digitale Sicherheit zu erhöhen.',
  },
];
