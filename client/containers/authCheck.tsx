import React, { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtPayload, jwtDecode } from 'jwt-decode';
// import { WrappedComponent } from '../../types/types';
import { useAuthStore } from '../zustand';

const authCheck = (WrappedComponent: ComponentType) => {
  return () => {
    const navigate = useNavigate();
    const { token, setToken } = useAuthStore();
    console.log('token in authCheck', token);

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
    }, [token, navigate, setToken]);

    // Return the wrapped component
    return <WrappedComponent />;
  };
};

export default authCheck;
