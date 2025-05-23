import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

const CustomerAddressesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
      isDefault: true
    },
    {
      id: '2',
      name: 'John Doe',
      street: '456 Oak Ave',
      city: 'Other City',
      state: 'NY',
      zip: '67890',
      country: 'USA',
      isDefault: false
    }
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect=customer/addresses');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newAddress: Address = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      country: formData.get('country') as string,
      isDefault: formData.get('isDefault') === 'true'
    };

    if (newAddress.isDefault) {
      // Update other addresses to not be default
      setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })));
    }

    setAddresses([...addresses, newAddress]);
    setIsAddingAddress(false);
    toast({
      title: "Address Added",
      description: "Your new address has been added successfully.",
    });
  };

  const handleUpdateAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAddress) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedAddress: Address = {
      ...editingAddress,
      name: formData.get('name') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      country: formData.get('country') as string,
      isDefault: formData.get('isDefault') === 'true'
    };

    let updatedAddresses = addresses.map(addr => 
      addr.id === updatedAddress.id ? updatedAddress : addr
    );

    if (updatedAddress.isDefault) {
      // Update other addresses to not be default
      updatedAddresses = updatedAddresses.map(addr => 
        addr.id === updatedAddress.id ? addr : { ...addr, isDefault: false }
      );
    }

    setAddresses(updatedAddresses);
    setEditingAddress(null);
    toast({
      title: "Address Updated",
      description: "Your address has been updated successfully.",
    });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Address Removed",
      description: "Your address has been removed successfully.",
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast({
      title: "Default Address Updated",
      description: "Your default address has been updated.",
    });
  };

  const AddressForm = ({ address, onSubmit, onCancel }: { address?: Address, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, onCancel: () => void }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" defaultValue={address?.name} required />
        </div>
        
        <div>
          <Label htmlFor="street">Street Address</Label>
          <Input id="street" name="street" defaultValue={address?.street} required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue={address?.city} required />
          </div>
          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input id="state" name="state" defaultValue={address?.state} required />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zip">ZIP/Postal Code</Label>
            <Input id="zip" name="zip" defaultValue={address?.zip} required />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select name="country" defaultValue={address?.country || 'USA'}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="CAN">Canada</SelectItem>
                <SelectItem value="GBR">United Kingdom</SelectItem>
                <SelectItem value="AUS">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isDefault"
            name="isDefault"
            value="true"
            defaultChecked={address?.isDefault}
            className="rounded border-gray-300"
          />
          <Label htmlFor="isDefault" className="cursor-pointer">Set as default address</Label>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {address ? 'Update Address' : 'Add Address'}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Addresses</CardTitle>
          <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Add a new shipping or billing address to your account.
                </DialogDescription>
              </DialogHeader>
              <AddressForm onSubmit={handleAddAddress} onCancel={() => setIsAddingAddress(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4 relative">
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 bg-authentic-yellow text-authentic-black text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-gray-600">{address.street}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <p className="text-sm text-gray-600">{address.country}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog open={editingAddress?.id === address.id} onOpenChange={(open) => {
                      if (!open) setEditingAddress(null);
                      else setEditingAddress(address);
                    }}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Address</DialogTitle>
                          <DialogDescription>
                            Update your shipping or billing address.
                          </DialogDescription>
                        </DialogHeader>
                        {editingAddress && (
                          <AddressForm 
                            address={editingAddress} 
                            onSubmit={handleUpdateAddress} 
                            onCancel={() => setEditingAddress(null)} 
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    {!address.isDefault && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="mb-4 text-gray-500">You haven't added any addresses yet.</p>
              <Button onClick={() => setIsAddingAddress(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAddressesPage; 