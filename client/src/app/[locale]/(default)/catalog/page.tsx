import { productService } from '@/shared/api/product-service';
import { CatalogClient } from '@/widgets';

export default async function Catalog() {
  const products = await productService.getAll();

  return (
    <div className="bg-gray-50 min-h-screen">
      <CatalogClient products={products} />
    </div>
  );
}
