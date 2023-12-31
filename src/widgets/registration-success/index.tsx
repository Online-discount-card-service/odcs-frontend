import { FC, useEffect } from 'react';
import { Typography, Box, Link, Stack } from '@mui/material';
import coverImage from '~/shared/assets/chatbot-bw-1.svg';
import { AccentButton } from '~/shared/ui';
import {
  mainContainerStyle,
  coverImgStyle,
  paragraphStyle,
  linkStyle,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { useUser } from '~/shared/store/useUser';

export const RegistrationSuccessWidget: FC<{
  handleShowChangeEmail?: () => void;
}> = ({ handleShowChangeEmail }) => {
  const user = useUser((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => navigate('/'),
      6000
    );
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <Stack
      direction="column"
      useFlexGap={true}
      spacing={2}
      sx={mainContainerStyle}
    >
      <Typography textAlign="center" sx={paragraphStyle}>
        {`Мы отправили письмо на адрес ${user?.email}`}
        <br />
        Перейдите по ссылке в письме, чтобы подтвердить почту
      </Typography>
      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt="Робот"
        src={coverImage}
      />
      {handleShowChangeEmail && (
        <Link sx={linkStyle} onClick={handleShowChangeEmail}>
          Изменить почту
        </Link>
      )}
      <AccentButton
        onClick={() => {
          navigate('/');
        }}
      >
        Войти
      </AccentButton>
    </Stack>
  );
};
