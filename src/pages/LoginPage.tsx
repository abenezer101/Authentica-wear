import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      const redirectPath = redirect.startsWith('/') ? redirect : `/${redirect}`;
      navigate(redirectPath);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login';
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your Authentic Wear account</p>
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
            <div className="flex justify-between items-baseline">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Link to="/forgot-password" className="text-sm text-authentic-yellow hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <div className="text-center">
              <span className="text-gray-600">Don't have an account?</span>{' '}
              <Link
                to={`/signup${redirect ? `?redirect=${redirect}` : ''}`}
                className="text-authentic-yellow hover:underline font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
        
        {/* Admin login hint for demo purposes */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Demo Admin Access:</strong><br />
            Email: admin@authenticwear.com<br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
