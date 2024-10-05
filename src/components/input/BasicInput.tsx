import { ChangeEvent, ForwardedRef, KeyboardEvent, forwardRef } from 'react';

import { Input, InputProps } from '@chakra-ui/react';

export interface IBasicInputProps extends InputProps {
  setValue?: (value: any) => void;
  onEnter?: () => void;
}

const BasicInput = forwardRef((props: IBasicInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    type = 'text',
    value,
    setValue = () => {},
    onEnter = () => {},
    placeholder = '',
    isInvalid,
    isReadOnly,
    isDisabled,
    maxLength,
    min,
    max,
    width = '100%',
  } = props;

  const convertValue = (value: string) => {
    switch (type) {
      case 'time':
        return `${value.replace(':', '')}00`;
      default:
        return value;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(convertValue(e.target.value));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <Input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus={false}
      maxLength={maxLength}
      isReadOnly={isReadOnly}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      spellCheck={false}
      width={width}
      size={'md'}
      fontSize={'xs'}
      fontWeight={'500'}
      textAlign={!isReadOnly && type === 'number' ? 'right' : 'left'}
      borderRadius={'5px'}
      focusBorderColor={isInvalid ? '#e53e3e' : 'blue.600'}
      _placeholder={{ color: '#cfd5dd' }}
      {...(isReadOnly && { cursor: 'default', border: 'none', backgroundColor: '#efefef' })}
    />
  );
});

BasicInput.displayName = 'BasicInput';

export default BasicInput;
