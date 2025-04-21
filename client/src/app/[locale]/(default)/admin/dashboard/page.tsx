'use client';

import { ICreateProduct } from '@/features/product';
import { productService } from '@/shared/api/product-service';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const [formData, setFormData] = useState<ICreateProduct>({
    name: '',
    description: '',
    price: 0,
    images: [''],
    brand: '',
    inStock: true,
    category: 'KEYBOARD',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.createProduct(formData);
      toast.success(t('productCreated'));
      setFormData({
        name: '',
        description: '',
        price: 0,
        images: [''],
        brand: '',
        inStock: true,
        category: 'KEYBOARD',
      });
    } catch (error) {
      toast.error(t('productCreationError'));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t('createProduct')}</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('productName')}
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('description')}
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('price')}
            </label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('brand')}
            </label>
            <Input
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('category')}
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: value as 'KEYBOARD' | 'SWITCH',
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KEYBOARD">{t('keyboard')}</SelectItem>
                <SelectItem value="SWITCH">{t('switch')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('inStock')}
            </label>
            <Select
              value={formData.inStock.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, inStock: value === 'true' }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">{t('yes')}</SelectItem>
                <SelectItem value="false">{t('no')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('images')}
            </label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={t('imageUrl')}
                  required
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeImageField(index)}
                  >
                    {t('remove')}
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addImageField}>
              {t('addImage')}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          {t('createProduct')}
        </Button>
      </form>
    </div>
  );
}
