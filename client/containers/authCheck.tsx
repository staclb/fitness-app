import React, { useEffect, ComponentType } from 'react'
import { useNavigate } from 'react-router-dom';
import { JwtPayload, jwtDecode } from 'jwt-decode';
// import { WrappedComponent } from '../../types/types';
import { userAuthStore } from '../zustand';


const authCheck = (WrappedComponent: ComponentType) => {
  return (): React.ReactElement => {
    const navigate = useNavigate();
    const { token, setToken } = userAuthStore();

    useEffect(() => {
      if (token) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
            // Token has expired
            setToken(null);
            navigate('/login');
          }
        } catch (error) {
          // In case of token decoding errors, treat it as invalid
          console.error('Error decoding token:', error);
          setToken(null);
          navigate('/login');
        }
      } else {
        // No token found
        navigate('/login');
      }
    }, [token, navigate, setToken]);

    // Return the wrapped component
    return <WrappedComponent />;
  };
}

export default authCheck