import { ReactNode } from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

import { GAP } from '@data/layout';

interface IBasicFlexProps {
  direction?: 'vertical' | 'horizontal';
  children: ReactNode;
  containerStyles?: FlexProps;
}

const BasicFlex = (props: IBasicFlexProps) => {
  const { direction = 'vertical', children, containerStyles } = props;

  return (
    <Flex gap={GAP[direction]} flexDirection={direction === 'vertical' ? 'column' : 'row'} {...containerStyles}>
      {children}
    </Flex>
  );
};

export default BasicFlex;
