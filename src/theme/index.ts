import Badge from '@theme/components/Badge';
import Button from '@theme/components/Button';
import Modal from '@theme/components/Modal';
import Switch from '@theme/components/Switch';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        minWidth: '1200px',
        fontSize: '12px',
        '&::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#828282',
          borderRadius: '24px',
        },
      },
      ':where(ol, ul)': {
        paddingLeft: '40px',
      },
    },
  },
  fonts: {
    heading: 'Pretendard',
    body: 'Pretendard',
  },
  components: {
    Button,
    Switch,
    Modal,
    Badge,
  },
});

export default theme;
