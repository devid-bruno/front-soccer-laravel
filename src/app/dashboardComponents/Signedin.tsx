import * as React from 'react';
import {
  AuthenticationContext,
  SessionContext,
  type Session,
} from '@toolpad/core/AppProvider';
import MenuList from '@mui/material/MenuList';
import { Account } from '@toolpad/core/Account';
import { logout } from '../services/api';
import Logout from '@mui/icons-material/Logout';

interface Authentication {
    signIn: () => void;
    signOut: () => void;
  }
  
  interface Props {
    user: {
      name: string;
      email: string;
    } | null;
  }
  

  const AccountDemoSignedIn: React.FC<Props> = ({ user }) => {
    const [session, setSession] = React.useState<Session | null>(null);
  
    React.useEffect(() => {
      if (user) {
        setSession({
          user: {
            name: user.name,
            email: user.email,
            image: 'https://avatars.githubusercontent.com/u/19550456', 
          },
        });
      }
    }, [user]);
  
    const authentication: Authentication = React.useMemo(() => {
        return {
          signIn: () => { /* ... */ },
          signOut: async () => {
            await logout();
            console.log(logout)
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            setSession(null);
            window.location.href = '/login';
          },
        };
      }, []);
  
    return (
      <AuthenticationContext.Provider value={authentication}>
        <SessionContext.Provider value={session}>
          <Account 
            slotProps={{
              signOutButton: {
                color: 'success',
              },
              preview: {
                variant: 'expanded',
                slotProps: {
                  avatarIconButton: {
                    sx: {
                      width: 'fit-content',
                      margin: 'auto',
                    },
                  },
                  avatar: {
                    variant: 'rounded',
                  },
                },
              },
            }}
          />
        </SessionContext.Provider>
      </AuthenticationContext.Provider>
    );
  };
  
  export default AccountDemoSignedIn;