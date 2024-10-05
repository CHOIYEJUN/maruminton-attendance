import { ReactNode } from 'react';

import { Grid, GridProps } from '@chakra-ui/react';

import { GAP } from '@data/layout';

interface IBasicGridProps {
  repeatColumn?: number;
  containerStyles?: GridProps;
  children?: ReactNode;
}

const BasicGrid = (props: IBasicGridProps) => {
  const { repeatColumn = 2, containerStyles, children } = props;

  return (
    <Grid
      templateColumns={`repeat(${repeatColumn}, 1fr)`}
      columnGap={GAP.horizontal}
      rowGap={GAP.vertical}
      {...containerStyles}
    >
      {children}
    </Grid>
  );
};

export default BasicGrid;
