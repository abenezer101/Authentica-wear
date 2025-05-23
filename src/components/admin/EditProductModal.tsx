
import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Upload, ImageIcon, X } from "lucide-react";

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveProduct: (product: Product) => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ 
  open, 
  onOpenChange, 
  onSaveProduct, 
  product 
}) => {
  const { toast } = useToast();
  const [productData, setProductData] = useState<Product>({ ...product });
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(product.images[0] || null);

  useEffect(() => {
    if (open) {
      setProductData({ ...product });
      setImagePreview(product.images[0] || null);
    }
  }, [open, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'price' || name === 'originalPrice' || name === 'discount' 
        ? parseFloat(value) || 0
        : value
    });
  };

  const handleStockChange = (value: string) => {
    setProductData({
      ...productData,
      inStock: value === 'inStock'
    });
  };

  const handleAddSize = () => {
    if (sizeInput && !productData.sizes.includes(sizeInput)) {
      setProductData({
        ...productData,
        sizes: [...productData.sizes, sizeInput],
      });
      setSizeInput("");
    }
  };

  const handleAddColor = () => {
    if (colorInput && !productData.colors.includes(colorInput)) {
      setProductData({
        ...productData,
        colors: [...productData.colors, colorInput],
      });
      setColorInput("");
    }
  };

  const handleRemoveSize = (size: string) => {
    setProductData({
      ...productData,
      sizes: productData.sizes.filter((s) => s !== size),
    });
  };

  const handleRemoveColor = (color: string) => {
    setProductData({
      ...productData,
      colors: productData.colors.filter((c) => c !== color),
    });
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
      setImagePreview(productData.images[1] || null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productData.name || !productData.category || productData.price <= 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields: name, category, and price.",
        variant: "destructive",
      });
      return;
    }

    onSaveProduct(productData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Product Images</Label>
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
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Current Price*</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={productData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={productData.discount}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Status*</Label>
              <Select 
                value={productData.inStock ? "inStock" : "outOfStock"} 
                onValueChange={handleStockChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stock status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inStock">In Stock</SelectItem>
                  <SelectItem value="outOfStock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Sizes</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {productData.sizes.map((size) => (
                  <Badge key={size} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                    {size}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent"
                      onClick={() => handleRemoveSize(size)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  placeholder="Enter size"
                  className="flex-grow"
                />
                <Button 
                  type="button" 
                  onClick={handleAddSize}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Colors</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {productData.colors.map((color) => (
                  <Badge key={color} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                    {color}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent"
                      onClick={() => handleRemoveColor(color)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  placeholder="Enter color"
                  className="flex-grow"
                />
                <Button 
                  type="button" 
                  onClick={handleAddColor}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
