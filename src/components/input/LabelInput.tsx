import { ForwardedRef, ReactNode, forwardRef } from 'react';

import { InputRightElement } from '@chakra-ui/react';

import BasicInput, { IBasicInputProps } from '@components/input/BasicInput';
import LabelBox from '@components/label/LabelBox';

import { isEmpty } from '@utils/validationUtil';

interface ILabelInputProps extends IBasicInputProps {
  label?: string;
  isRequired?: boolean;
  rightElement?: ReactNode;
  errorMessage?: string;
}

const LabelInput = forwardRef((props: ILabelInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    type,
    value,
    setValue,
    onEnter,
    label = '',
    placeholder,
    rightElement,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    maxLength,
    errorMessage = '',
    min,
    max,
    width,
  } = props;

  return (
    <LabelBox
      label={label}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      errorMessage={errorMessage}
      isWidth={!isEmpty(width)}
    >
      <BasicInput
        ref={ref}
        type={type}
        value={value}
        setValue={setValue}
        onEnter={onEnter}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        width={width}
      />
      <InputRightElement width={'auto'}>{rightElement}</InputRightElement>
    </LabelBox>
  );
});

LabelInput.displayName = 'LabelInput';

export default LabelInput;
