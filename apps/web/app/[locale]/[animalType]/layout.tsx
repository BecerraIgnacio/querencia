interface AnimalLayoutProps {
  children: React.ReactNode;
  params: { locale: string; animalType: string };
}

export default function AnimalLayout({ children }: AnimalLayoutProps) {
  return <>{children}</>;
}
