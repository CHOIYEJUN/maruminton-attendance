import { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';

import BasicInput from '@components/input/BasicInput';
import BasicSelect from '@components/select/BasicSelect';

import { isEmpty } from '@utils/validationUtil';

interface ILabelPhoneNumberInputProps {
  type?: string;
  value: string;
  setValue: (value: string) => void;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const PhoneNumberInput = (props: ILabelPhoneNumberInputProps) => {
  const { type = 'text', value, setValue, isReadOnly = false, isInvalid = false, isDisabled = false } = props;
  const countryCodeOptions = [
    { label: '+82', value: '+82' },
    { label: '+81', value: '+81' },
    { label: '+1', value: '+1' },
  ];

  const [currentCountryCode, setCurrentCountryCode] = useState('+82');
  const [currentNumber, setCurrentNumber] = useState('');

  useEffect(() => {
    let matchedCode = null;

    if (value) {
      matchedCode = countryCodeOptions.find((option) => value.startsWith(option?.value || ''));
    }

    if (matchedCode) {
      setCurrentCountryCode(matchedCode.value);
      setCurrentNumber(value.replace(matchedCode.value, ''));
    } else {
      setCurrentNumber(value);
    }
  }, [value]);

  const handleCountryCodeChange = (code: string) => {
    setCurrentCountryCode(code);
    setValue(code + currentNumber);
  };

  const handleNumberChange = (number: string) => {
    // 숫자 이외의 문자 제거
    const numericValue = number.replace(/\D/g, '');

    setCurrentNumber(numericValue);
    if (isEmpty(numericValue)) {
      setValue('');
    } else {
      setValue(currentCountryCode + numericValue);
    }
  };

  return (
    <Flex width={'100%'}>
      {isReadOnly ? (
        <BasicInput
          type={type}
          value={value}
          setValue={handleNumberChange}
          isReadOnly={isReadOnly}
          isDisabled={isDisabled}
        />
      ) : (
        <>
          <BasicSelect
            data={countryCodeOptions}
            value={currentCountryCode}
            setValue={handleCountryCodeChange}
            isReadOnly={isReadOnly}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            width={'110px'}
          />
          <BasicInput
            type={type}
            value={currentNumber}
            setValue={handleNumberChange}
            isReadOnly={isReadOnly}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            maxLength={11}
          />
        </>
      )}
    </Flex>
  );
};

export default PhoneNumberInput;
