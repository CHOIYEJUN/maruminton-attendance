import { ReactNode } from 'react';

import { Flex, FlexProps, InputGroup, Text } from '@chakra-ui/react';

import { isEmpty } from '@utils/validationUtil';

interface ILabelInputBoxProps {
  label: string;
  children: ReactNode;
  isRequired?: boolean;
  isReadOnly?: boolean;
  errorMessage?: string;
  isWidth?: boolean;
  containerStyle?: FlexProps;
}

const LabelBox = (props: ILabelInputBoxProps) => {
  const { label, children, isRequired, isReadOnly, errorMessage = '', isWidth, containerStyle } = props;

  return (
    <Flex flexDirection={'column'} flex={isWidth ? 'none' : 1} gap={'5px'} position={'relative'} {...containerStyle}>
      {label && (
        <Text
          color={'#393636'}
          fontSize={'11px !important'}
          fontWeight={'bold'}
          cursor={'default'}
          _after={isRequired && !isReadOnly ? { content: '"*"', color: '#ff4e4e', marginLeft: '3px' } : {}}
        >
          {label}
        </Text>
      )}

      <InputGroup size={'sm'}>{children}</InputGroup>

      {!isEmpty(errorMessage) && (
        <Text fontSize={'xs'} fontWeight={'bold'} color={'red'}>
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
};

export default LabelBox;
