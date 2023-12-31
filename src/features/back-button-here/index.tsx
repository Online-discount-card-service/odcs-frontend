import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { backButtonStyle, iconStyle } from './style';

export const BackButtonToUserProfile = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() =>
        navigate('/user', { replace: true, state: { widgetScreen: 'default' } })
      }
      variant="text"
      disableRipple
      startIcon={<ArrowBackIosOutlinedIcon sx={iconStyle} />}
      sx={backButtonStyle}
    >
      Назад
    </Button>
  );
};
