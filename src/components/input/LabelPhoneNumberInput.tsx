import { ReactNode } from 'react';

import { FlexProps, InputRightElement } from '@chakra-ui/react';

import { IBasicInputProps } from '@components/input/BasicInput';
import PhoneNumberInput from '@components/input/PhoneNumberInput';
import LabelBox from '@components/label/LabelBox';

import { isEmpty } from '@utils/validationUtil';

interface ILabelInputProps extends IBasicInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  isRequired?: boolean;
  rightElement?: ReactNode;
  errorMessage?: string;
  countryCode: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  containerStyle?: FlexProps;
}

const LabelPhoneNumberInput = (props: ILabelInputProps) => {
  const {
    type,
    value,
    setValue,
    label,
    rightElement,
    isRequired = false,
    isInvalid = false,
    isReadOnly = false,
    isDisabled = false,
    errorMessage = '',
    width,
    containerStyle,
  } = props;

  return (
    <LabelBox
      label={label}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      errorMessage={errorMessage}
      isWidth={!isEmpty(width)}
      containerStyle={containerStyle}
    >
      <PhoneNumberInput
        type={type}
        value={value}
        setValue={setValue}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
      />
      <InputRightElement width={'auto'}>{rightElement}</InputRightElement>
    </LabelBox>
  );
};

export default LabelPhoneNumberInput;
