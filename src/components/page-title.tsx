export default async function PageTitle({ primary }: { primary: string }) {
  return (
    <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">{primary}</h2>
  );
}
