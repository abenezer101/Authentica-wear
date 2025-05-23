import React, { useState, useEffect } from 'react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const AdminOrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORDER-2024-001",
      date: "2024-03-15",
      customer: {
        firstName: "John",
        lastName: "Doe",
        phone: "123-456-7890",
      },
      total: 120.00,
      status: "Processing",
    },
    {
      id: "2",
      orderNumber: "ORDER-2024-002",
      date: "2024-03-14",
      customer: {
        firstName: "Jane",
        lastName: "Smith",
        phone: "987-654-3210",
      },
      total: 85.50,
      status: "Shipped",
    },
    {
      id: "3",
      orderNumber: "ORDER-2024-003",
      date: "2024-03-10",
      customer: {
        firstName: "Alice",
        lastName: "Johnson",
        phone: "555-123-4567",
      },
      total: 210.00,
      status: "Delivered",
    },
    {
      id: "4",
      orderNumber: "ORDER-2024-004",
      date: "2024-03-05",
      customer: {
        firstName: "Bob",
        lastName: "Williams",
        phone: "111-222-3333",
      },
      total: 45.00,
      status: "Cancelled",
    },
    {
      id: "5",
      orderNumber: "ORDER-2024-005",
      date: "2024-03-01",
      customer: {
        firstName: "Charlie",
        lastName: "Brown",
        phone: "444-555-6666",
      },
      total: 155.75,
      status: "Pending",
    },
  ]);

  const filteredOrders = orders.filter(order => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(order.orderNumber) ||
                           searchRegex.test(order.customer.firstName) ||
                           searchRegex.test(order.customer.lastName);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative flex-1">
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-[280px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{order.customer.firstName} {order.customer.lastName}</div>
                    <div className="text-sm text-muted-foreground">{order.customer.phone}</div>
                  </div>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}>
                          <SelectTrigger>
                            <SelectValue placeholder={order.status} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
