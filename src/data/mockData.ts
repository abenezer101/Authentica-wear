
import { Product, Order } from "@/types";

// Product data
export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Cotton T-Shirt",
    description: "Made from 100% premium cotton, this t-shirt combines comfort with style. Perfect for everyday wear with a relaxed fit.",
    category: "men",
    price: 39.99,
    originalPrice: 39.99,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    inStock: true,
    isNew: true,
    featured: true
  },
  {
    id: "p2",
    name: "Vintage Logo Hoodie",
    description: "Stay warm in style with our vintage-inspired logo hoodie. Features a front pocket, adjustable hood, and soft interior lining.",
    category: "men",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1565693413579-8a73e60f0f79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Black", "Red"],
    inStock: true,
    isNew: false,
    featured: true
  },
  {
    id: "p3",
    name: "High-Waist Cargo Pants",
    description: "Urban-inspired cargo pants with multiple pockets and a comfortable high waist. Made from durable cotton blend.",
    category: "women",
    price: 89.99,
    originalPrice: 99.99,
    discount: 10,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Khaki", "Black", "Olive"],
    inStock: true,
    isNew: false,
    featured: false
  },
  {
    id: "p4",
    name: "Canvas Tote Bag",
    description: "Environmentally friendly and stylish tote bag, perfect for shopping or casual day out. Features internal pocket and sturdy handles.",
    category: "accessories",
    price: 29.99,
    originalPrice: 29.99,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Natural", "Black"],
    inStock: true,
    isNew: true,
    featured: true
  },
  {
    id: "p5",
    name: "Oversized Denim Jacket",
    description: "Classic oversized denim jacket with a modern twist. Features distressed details and a comfortable fit.",
    category: "women",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Light Blue", "Dark Blue"],
    inStock: true,
    isNew: false,
    featured: true
  },
  {
    id: "p6",
    name: "Minimalist Watch",
    description: "Elegant minimalist watch with leather strap. Water resistant and perfect for any occasion.",
    category: "accessories",
    price: 129.99,
    originalPrice: 129.99,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1533139143976-30918502365b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Black", "Brown"],
    inStock: true,
    isNew: false,
    featured: false
  },
  {
    id: "p7",
    name: "Streetwear Sneakers",
    description: "Urban-inspired sneakers combining comfort and style. Perfect for casual wear or making a statement.",
    category: "men",
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    colors: ["White", "Black", "Multi"],
    inStock: true,
    isNew: true,
    featured: true
  },
  {
    id: "p8",
    name: "Premium Beanie",
    description: "Warm and stylish beanie made from premium materials. Perfect for cold weather.",
    category: "accessories",
    price: 24.99,
    originalPrice: 24.99,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1510598125064-a9af32b46a850?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Black", "Gray", "Navy"],
    inStock: true,
    isNew: false,
    featured: false
  }
];

// Function to get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Function to get a single product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Function to get new arrivals
export const getNewArrivals = () => {
  return products.filter(product => product.isNew);
};

// Function to get products on sale
export const getProductsOnSale = () => {
  return products.filter(product => product.discount > 0);
};

// Order data (for admin panel)
export const orders = [
  {
    id: "ord1",
    userId: "user1",
    items: [
      {
        productId: "p1",
        name: "Premium Cotton T-Shirt",
        price: 39.99,
        quantity: 2,
        size: "L",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      {
        productId: "p4",
        name: "Canvas Tote Bag",
        price: 29.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ],
    total: 109.97,
    status: "delivered",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      phone: "212-555-1234"
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      phone: "212-555-1234"
    },
    paymentMethod: "credit_card",
    createdAt: "2023-06-15T14:30:00Z"
  },
  {
    id: "ord2",
    userId: "user2",
    items: [
      {
        productId: "p2",
        name: "Vintage Logo Hoodie",
        price: 59.99,
        quantity: 1,
        size: "M",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ],
    total: 59.99,
    status: "processing",
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address1: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "USA",
      phone: "213-555-6789"
    },
    billingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address1: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "USA",
      phone: "213-555-6789"
    },
    paymentMethod: "paypal",
    createdAt: "2023-06-18T10:15:00Z"
  },
  {
    id: "ord3",
    userId: "user3",
    items: [
      {
        productId: "p7",
        name: "Streetwear Sneakers",
        price: 119.99,
        quantity: 1,
        size: "US 9",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      {
        productId: "p3",
        name: "High-Waist Cargo Pants",
        price: 89.99,
        quantity: 1,
        size: "M",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ],
    total: 209.98,
    status: "shipped",
    shippingAddress: {
      firstName: "Robert",
      lastName: "Johnson",
      address1: "789 Oak St",
      city: "Chicago",
      state: "IL",
      postalCode: "60007",
      country: "USA",
      phone: "312-555-9876"
    },
    billingAddress: {
      firstName: "Robert",
      lastName: "Johnson",
      address1: "789 Oak St",
      city: "Chicago",
      state: "IL",
      postalCode: "60007",
      country: "USA",
      phone: "312-555-9876"
    },
    paymentMethod: "credit_card",
    createdAt: "2023-06-20T09:45:00Z"
  }
];

// Customer data (for admin panel)
export const customers = [
  {
    id: "user1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    addresses: [
      {
        firstName: "John",
        lastName: "Doe",
        address1: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
        phone: "212-555-1234"
      }
    ],
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "user2",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    isAdmin: false,
    addresses: [
      {
        firstName: "Jane",
        lastName: "Smith",
        address1: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "USA",
        phone: "213-555-6789"
      }
    ],
    createdAt: "2023-02-20T15:45:00Z"
  },
  {
    id: "user3",
    email: "robert.johnson@example.com",
    firstName: "Robert",
    lastName: "Johnson",
    isAdmin: false,
    addresses: [
      {
        firstName: "Robert",
        lastName: "Johnson",
        address1: "789 Oak St",
        city: "Chicago",
        state: "IL",
        postalCode: "60007",
        country: "USA",
        phone: "312-555-9876"
      }
    ],
    createdAt: "2023-03-10T09:15:00Z"
  },
  {
    id: "admin1",
    email: "admin@authenticwear.com",
    firstName: "Admin",
    lastName: "User",
    isAdmin: true,
    addresses: [],
    createdAt: "2023-01-01T08:00:00Z"
  }
];
