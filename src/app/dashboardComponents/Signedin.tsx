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
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings'; // Ícone para configurações
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { AccountPopoverFooter, SignOutButton } from '@toolpad/core/Account';

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

function CustomAccountPopover() {
  return (
    <Stack direction="column">
      <MenuList>
        <Button
          variant="text"
          fullWidth
          startIcon={<SettingsIcon />}
          onClick={() => {
            window.location.href = '/settings';
          }}
          sx={{ justifyContent: 'flex-start' }}
        >
          Configurações
        </Button>
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
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
          slots={{
            popoverContent: CustomAccountPopover
          }}
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
            popover: {
              transformOrigin: { horizontal: 'left', vertical: 'top' },
              anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            }
          }}
        />
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
};

export default AccountDemoSignedIn;