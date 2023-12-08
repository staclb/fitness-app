import React, { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtPayload, jwtDecode } from 'jwt-decode';
// import { WrappedComponent } from '../../types/types';
import { useAuthStore } from '../zustand';

const authCheck = (WrappedComponent: any) => {
  const WithAuthCheck = () => {
    const navigate = useNavigate();
    const { token, setToken } = useAuthStore();

    useEffect(() => {
      if (token) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
            // Token has expired
            setToken(null);
            navigate('/');
          }
        } catch (error) {
          // In case of token decoding errors, treat it as invalid
          console.error('Error decoding token:', error);
          setToken(null);
          navigate('/');
        }
      } else {
        // No token found
        navigate('/');
      }
    }, [navigate, setToken]);

    return <WrappedComponent />;
  };

  // Setting the display name for debugging purposes
  WithAuthCheck.displayName = `WithAuthCheck(${getDisplayName(
    WrappedComponent,
  )})`;

  return WithAuthCheck;
};

// Helper function to get a component's display name
function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default authCheck;
