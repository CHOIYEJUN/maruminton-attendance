import { BoxProps, Flex } from '@chakra-ui/react';

const ScrollBox = ({ ...props }: BoxProps) => {
  return (
    <Flex
      flexDirection={'column'}
      overflow={'overlay'}
      css={{
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
      }}
      height={'100%'}
      {...props}
    />
  );
};

export default ScrollBox;
