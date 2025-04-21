import { ICreateProduct, IProduct } from '@/features/product';
import { axiosClassic, axiosWithToken } from './helpers/api-instance';

class ProductService {
  async getAll() {
    const response = await axiosClassic<IProduct[]>('/products');
    return response.data;
  }
  async createProduct(data: ICreateProduct) {
    const response = await axiosWithToken.post('/new-product', data);
    return response.data;
  }
}

export const productService = new ProductService();
