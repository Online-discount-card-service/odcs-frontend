import { FC, useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import coverImage from '~/shared/assets/chatbot-bw-1.svg';
import { mainContainerStyle, coverImgStyle, paragraphStyle } from './styles';
import { useUser } from '~/shared/store/useUser';

interface IReactivationSuccessWidget {
  onClose: () => void;
}

export const ReactivationSuccessWidget: FC<IReactivationSuccessWidget> = ({
  onClose,
}) => {
  const user = useUser((state) => state.user);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => onClose(),
      6000
    );
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

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
    </Stack>
  );
};
