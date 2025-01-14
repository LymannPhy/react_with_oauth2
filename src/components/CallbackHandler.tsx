// src/components/CallbackHandler.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CallbackHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const { setAuthState } = useAuth();
  const processedCode = useRef<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
    
        if (!code) {
          setError('No authorization code received');
          return;
        }
    
        // Prevent processing the same code multiple times
        if (processedCode.current === code) {
          return;
        }
        processedCode.current = code;
    
        console.log('Sending authorization code to backend:', code);
    
        const isGoogle = location.pathname.includes('google');
        const apiUrl = isGoogle
          ? 'http://localhost:8000/api/v1/auth/google'
          : 'http://localhost:8000/api/v1/auth/facebook';

        console.log(`Sending ${isGoogle ? 'Google' : 'Facebook'} authorization code to backend:`, code);

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ code }),
        });
    
        console.log('Backend response:', response);
    
        if (!response.ok) {
          // Log and handle backend errors
          const errorData = await response.json();
          console.error('Error data from backend:', errorData);
    
          throw new Error(errorData.detail || 'Login failed');
        }
    
        // Parse the successful response
        const data = await response.json();
        console.log('Parsed response data:', data);
    
        // Validate expected fields in the response
        if (!data.payload || !data.payload.user || !data.payload.access_token || !data.payload.refresh_token) {
          throw new Error('Invalid response data');
        }
    
        // Set authentication state (update context or state with user info and tokens)
        setAuthState(data.payload.user, {
          access_token: data.payload.access_token,
          refresh_token: data.payload.refresh_token,
          token_type: 'bearer',
        });
    
        // Navigate to the dashboard
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Login error:', error);
    
        // Display error message
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };
    

    handleCallback();
  }, [location.search, navigate, setAuthState]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <p>Error: {error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p>Processing login...</p>
      </div>
    </div>
  );
};

export default CallbackHandler;