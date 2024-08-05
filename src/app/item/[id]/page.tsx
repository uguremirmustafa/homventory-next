export default async function ItemPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <p>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </p>
    </div>
  );
}
