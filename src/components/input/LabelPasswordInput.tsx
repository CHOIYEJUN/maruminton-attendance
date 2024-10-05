import { useState } from 'react';

import { IoEye, IoEyeOff } from 'react-icons/io5';

import { IconButton, InputRightElement } from '@chakra-ui/react';

import BasicInput, { IBasicInputProps } from '@components/input/BasicInput';
import LabelBox from '@components/label/LabelBox';

interface ILabelPasswordInputProps extends IBasicInputProps {
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
}

const LabelPasswordInput = (props: ILabelPasswordInputProps) => {
  const {
    value,
    setValue,
    onEnter,
    label,
    placeholder,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    errorMessage = '',
  } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <LabelBox label={label} isRequired={isRequired} errorMessage={errorMessage}>
      <BasicInput
        type={isVisible ? 'text' : 'password'}
        value={value}
        setValue={setValue}
        onEnter={onEnter}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        placeholder={placeholder}
      />
      <InputRightElement width={'auto'}>
        <IconButton
          aria-label={'show password'}
          variant={'ghost'}
          size={'md'}
          marginTop={'7px'}
          icon={isVisible ? <IoEye color={'#5a6a85'} /> : <IoEyeOff color={'#5a6a85'} />}
          onClick={() => setIsVisible(!isVisible)}
        />
      </InputRightElement>
    </LabelBox>
  );
};

export default LabelPasswordInput;
