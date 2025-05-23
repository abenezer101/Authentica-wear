
import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await signup(email, password);
      navigate(`/${redirect}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create account';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg relative">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 p-2 h-8 w-8"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} />
        </Button>
        
        <div className="text-center">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="bg-authentic-yellow text-authentic-black p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Join Authentic Wear</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="mt-1 bg-gray-50 border-gray-200 focus:border-authentic-yellow focus:ring-authentic-yellow"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="mt-1 bg-gray-50 border-gray-200 focus:border-authentic-yellow focus:ring-authentic-yellow"
            />
            <p className="text-xs text-gray-500 mt-2">
              Password must be at least 8 characters long
            </p>
          </div>
          
          <div>
            <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
              className="mt-1 bg-gray-50 border-gray-200 focus:border-authentic-yellow focus:ring-authentic-yellow"
            />
          </div>
          
          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-authentic-black text-white hover:bg-authentic-yellow hover:text-authentic-black transition-colors"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <div className="text-center">
              <span className="text-gray-600">Already have an account?</span>{' '}
              <Link
                to={`/login${redirect ? `?redirect=${redirect}` : ''}`}
                className="text-authentic-yellow hover:underline font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
