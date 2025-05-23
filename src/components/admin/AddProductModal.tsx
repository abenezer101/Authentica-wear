
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Upload, ImageIcon, X } from "lucide-react";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ 
  open, 
  onOpenChange, 
  onAddProduct 
}) => {
  const { toast } = useToast();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"],
    sizes: [],
    colors: [],
    inStock: true,
    isNew: true,
    featured: false,
  });

  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "price" || name === "originalPrice") {
      // Only allow numbers and decimal points
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    
    setProductData({ ...productData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProductData({ ...productData, [name]: checked });
  };

  const addSize = () => {
    if (sizeInput && !productData.sizes.includes(sizeInput)) {
      setProductData({
        ...productData,
        sizes: [...productData.sizes, sizeInput],
      });
      setSizeInput("");
    }
  };

  const addColor = () => {
    if (colorInput && !productData.colors.includes(colorInput)) {
      setProductData({
        ...productData,
        colors: [...productData.colors, colorInput],
      });
      setColorInput("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        
        // Add the image to the product data
        setProductData({
          ...productData,
          images: [result, ...productData.images.slice(0, 4)]  // Keep max 5 images
        });
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Image uploaded",
        description: "Image has been successfully uploaded.",
      });
    }
  };

  const removeImage = (index: number) => {
    setProductData({
      ...productData,
      images: productData.images.filter((_, i) => i !== index)
    });

    if (index === 0 && imagePreview) {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!productData.name || !productData.description || !productData.category || !productData.price) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create a new product with proper data types
    const newProduct = {
      ...productData,
      id: `product-${Date.now()}`, // Generate a simple ID
      price: parseFloat(productData.price),
      originalPrice: parseFloat(productData.originalPrice) || parseFloat(productData.price),
      discount: productData.originalPrice ? 
        Math.round(((parseFloat(productData.originalPrice) - parseFloat(productData.price)) / parseFloat(productData.originalPrice)) * 100) : 0,
    };

    onAddProduct(newProduct);
    
    toast({
      title: "Product added",
      description: `${productData.name} has been added to your products.`,
    });

    // Reset form and close modal
    setProductData({
      name: "",
      description: "",
      category: "",
      price: "",
      originalPrice: "",
      images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"],
      sizes: [],
      colors: [],
      inStock: true,
      isNew: true,
      featured: false,
    });
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Product Image</Label>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productData.images.map((image, index) => (
                  <div key={index} className="relative group aspect-square rounded-md overflow-hidden border bg-gray-50">
                    <img 
                      src={image} 
                      alt={`Product image ${index}`} 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md bg-gray-50 relative">
                  <Input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Upload Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name*</Label>
              <Input
                id="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Input
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                placeholder="e.g., T-Shirts, Hoodies, Accessories"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)*</Label>
              <Input
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="29.99"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ($) (if on sale)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                value={productData.originalPrice}
                onChange={handleChange}
                placeholder="39.99"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Sizes</Label>
              <div className="flex">
                <Input
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  placeholder="e.g., S, M, L, XL"
                  className="mr-2"
                />
                <Button type="button" onClick={addSize} variant="outline">Add</Button>
              </div>
              {productData.sizes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {productData.sizes.map((size) => (
                    <div 
                      key={size} 
                      className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Colors</Label>
              <div className="flex">
                <Input
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  placeholder="e.g., Black, White, Red"
                  className="mr-2"
                />
                <Button type="button" onClick={addColor} variant="outline">Add</Button>
              </div>
              {productData.colors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {productData.colors.map((color) => (
                    <div 
                      key={color} 
                      className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center"
                    >
                      {color}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={productData.inStock}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300"
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNew"
                name="isNew"
                checked={productData.isNew}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isNew">Mark as New</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={productData.featured}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300"
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-authentic-yellow text-authentic-black hover:bg-opacity-90">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
