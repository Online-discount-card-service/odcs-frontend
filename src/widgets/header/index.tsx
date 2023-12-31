import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, IconButton } from '@mui/material';
import { Logo, CloseButton } from '~/shared/ui';
import { PermIdentity } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useUser } from '~/shared/store/useUser';
import { headerStyle, closeButtonStyle, iconButtonStyle } from './style';

//INFO: 'minimal' for logo only, like on authorization screen, 'standard' for full featured header
export type HeaderProps = {
  type: 'minimal' | 'standard';
};

export const Header: FC<HeaderProps> = ({ type }) => {
  const user = useUser((state) => state.user);
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        ...headerStyle,
        justifyContent: type === 'minimal' ? 'center' : 'space-between',
      }}
      elevation={0}
      position="static"
    >
      <Logo type={type === 'standard' ? 'full' : 'image'} color={'dark'} />
      {type === 'standard' &&
        (user ? (
          <IconButton
            onClick={() => navigate('/user')}
            color="primary"
            size="small"
            sx={iconButtonStyle}
          >
            <PermIdentity />
          </IconButton>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="outlined"
            color="primary"
            sx={{ border: '#7A757F 1px solid' }}
            state={{ tab: 0 }}
          >
            Войти
          </Button>
        ))}
      {type === 'minimal' && (
        <CloseButton sx={closeButtonStyle} component={Link} to="/" />
      )}
    </AppBar>
  );
};
