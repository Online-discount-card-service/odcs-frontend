import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopListContext } from '~/app/contexts';
import { Box, Container, Typography } from '@mui/material';
import { AccentButton } from '~/shared/ui';
import { PromoSlider } from '~/features';
import coverImage from '~/shared/assets/save-money-bw-1.svg';
import { coverImgStyle, mainContainerStyle, paragraphStyle } from './styles';

export const Home = () => {
  const { shops = [] } = useContext(ShopListContext);
  const navigate = useNavigate();

  return (
    <Container component="main" sx={{ ...mainContainerStyle }}>
      <Typography
        component="p"
        textAlign="center"
        sx={{ paddingBottom: '1rem', ...paragraphStyle }}
      >
        Удобный и быстрый доступ к вашим картам лояльности в любом месте
      </Typography>

      <Box
        component="img"
        sx={{ ...coverImgStyle }}
        alt="Персонаж, несущий свинью-копилку"
        src={coverImage}
        //NOTE: May not be supported in all browsers
        height="248"
        width="328"
      />

      <Typography
        component="p"
        textAlign="left"
        sx={{ paddingTop: '1rem', ...paragraphStyle }}
      >
        Добавьте в свой электронный кошелёк
      </Typography>

      <PromoSlider items={shops} />

      <AccentButton
        onClick={() => navigate('/auth', { relative: 'path' })}
        children={'Попробовать'}
      />
    </Container>
  );
};
