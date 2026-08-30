import { dummyProducts } from "../type";
import ProductForm from "./ProductForm";

export function generateStaticParams() {
  return dummyProducts.map((product) => ({
    slug: product.uuid,
  }));
}

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = dummyProducts.find((item) => item.uuid === slug);

  return <ProductForm initialData={product} />;
}
