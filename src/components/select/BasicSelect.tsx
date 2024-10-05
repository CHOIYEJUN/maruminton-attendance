import { ForwardedRef, forwardRef } from 'react';

import { Select, SelectProps } from '@chakra-ui/react';

import BasicInput from '@components/input/BasicInput';

import { ISelectOption } from '@/types/common';

export interface IBasicSelect extends SelectProps {
  data: ISelectOption[];
  value?: string | number;
  setValue?: (value: any) => void;
  placeholder?: string;
}

const BasicSelect = forwardRef((props: IBasicSelect, ref: ForwardedRef<HTMLSelectElement>) => {
  const { data, value, setValue = () => {}, placeholder, isInvalid, isReadOnly, width = '100%' } = props;

  return (
    <>
      {isReadOnly ? (
        <BasicInput value={value} isReadOnly={true} />
      ) : (
        <Select
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          isInvalid={isInvalid}
          size={'md'}
          backgroundColor={'#ffffff'}
          borderRadius={'5px'}
          width={width}
          cursor={'pointer'}
          fontSize={'0.75rem'}
          fontWeight={500}
        >
          {data?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    </>
  );
});

BasicSelect.displayName = 'BasicSelect';

export default BasicSelect;
