import { defineStyleConfig } from '@chakra-ui/system';

const Button = defineStyleConfig({
  sizes: {
    sm: {
      fontSize: '12px',
    },
  },
  defaultProps: {
    size: 'sm',
  },
});

export default Button;
