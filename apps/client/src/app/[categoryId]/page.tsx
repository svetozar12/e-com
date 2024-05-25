import Category from '../../components/Category/Category';

export default function Index({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  return <Category categoryId={categoryId} />;
}
