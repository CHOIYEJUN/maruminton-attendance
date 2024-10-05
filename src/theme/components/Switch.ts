import { defineStyleConfig } from '@chakra-ui/system';

const Switch = defineStyleConfig({
  sizes: {
    md: {
      height: '30px',
      alignItems: 'center',
    },
  },
  defaultProps: {
    size: 'md',
  },
});

export default Switch;
