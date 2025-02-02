import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');
    
    if (userName && userEmail) {
      setUser({
        name: userName,
        email: userEmail
      });
    }
  }, []);


  return user;
}