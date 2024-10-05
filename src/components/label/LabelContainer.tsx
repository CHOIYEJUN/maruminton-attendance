import { ForwardedRef, ReactNode, forwardRef } from 'react';

import { Box, Flex, FlexboxProps } from '@chakra-ui/react';

interface ILabelContainerProps extends FlexboxProps {
  label: string;
  children: ReactNode;
  width?: string;
  element?: ReactNode;
}

const LabelContainer = forwardRef((props: ILabelContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { label, children, element } = props;

  return (
    <Flex ref={ref} flexDirection={'column'} gap={'15px'} {...props}>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        color={'#5a6a85'}
        fontSize={'12px !important'}
        fontWeight={'bold'}
        cursor={'default'}
      >
        <Box
          _before={{
            content: '""',
            display: 'inline-block',
            width: '4px',
            height: '4px',
            backgroundColor: 'blue.600',
            borderRadius: '2px',
            marginBottom: '4px',
            marginRight: '5px',
            verticalAlign: 'middle',
          }}
        >
          {label}
        </Box>

        {element}
      </Flex>

      {children}
    </Flex>
  );
});

LabelContainer.displayName = 'LabelContainer';

export default LabelContainer;
