import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  api_key: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');
    const userapi_key = localStorage.getItem('api_key');
    
    if (userName && userEmail && userapi_key) {
      setUser({
        name: JSON.parse(userName),
        email: JSON.parse(userEmail),
        api_key: JSON.parse(userapi_key),
      });
    }
  }, []);


  return user;
}