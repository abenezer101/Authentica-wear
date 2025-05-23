
import React, { useState } from 'react';
import { products } from '@/data/mockData';
import { Product } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import ProductFilters from '@/components/admin/ProductFilters';
import ProductsTable from '@/components/admin/ProductsTable';
import AddProductModal from '@/components/admin/AddProductModal';
import EditProductModal from '@/components/admin/EditProductModal';

const AdminProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const categories = [...new Set(productsList.map(p => p.category))];

  const filteredProducts = productsList.filter(product => {
    // Category filter
    if (categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.id.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const handleAddProduct = (newProduct: Product) => {
    setProductsList([...productsList, newProduct]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProductsList(
      productsList.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    toast({
      title: "Product updated",
      description: "The product has been successfully updated.",
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductsList(productsList.filter(p => p.id !== productId));
      toast({
        title: "Product deleted",
        description: "The product has been successfully removed.",
      });
    }
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsEditProductModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <ProductFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        onAddProductClick={() => setIsAddProductModalOpen(true)}
      />

      <ProductsTable 
        products={filteredProducts}
        onEditProduct={openEditModal}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Add Product Modal */}
      <AddProductModal
        open={isAddProductModalOpen}
        onOpenChange={setIsAddProductModalOpen}
        onAddProduct={handleAddProduct}
      />

      {/* Edit Product Modal */}
      {currentProduct && (
        <EditProductModal
          open={isEditProductModalOpen}
          onOpenChange={setIsEditProductModalOpen}
          onSaveProduct={handleEditProduct}
          product={currentProduct}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;
