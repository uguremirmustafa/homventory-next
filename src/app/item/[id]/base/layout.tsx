export default function Layout({
  children,
  details,
}: Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
      <div className="col-span-2">{children}</div>
      <div className="col-span-2">{details}</div>
    </div>
  );
}
