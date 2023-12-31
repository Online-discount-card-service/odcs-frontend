import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const PurpleButton = styled(Button)({
  width: '100%',
  fontSize: '1.125rem',
  lineHeight: '1.43',
  padding: '1.125rem',
  borderRadius: '.5rem',
  textTransform: 'none',
  boxShadow: 'none',
  backgroundColor: ' primary.main',
  '@media (max-width:600px)': {
    fontSize: '1rem',
  },
  '&:hover': {
    backgroundColor: '#7965af',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#735eab',
  },
  '&:focus': {
    backgroundColor: '#7965af',
  },
});

export const AccentButton = ({ ...props }) => {
  return <PurpleButton variant="contained" {...props} />;
};
