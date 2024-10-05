import { forwardRef } from 'react';

import Select, { StylesConfig } from 'react-select';

import { ISelectOption } from '@/types/common';

export interface IBasicSelectWithSearch {
  data: ISelectOption[];
  value?: ISelectOption;
  setValue?: (value: string) => void;
  width?: string;
  ref?: string;
  isInvalid?: boolean;
  isReadonly?: boolean;
}

const customStyles: StylesConfig<ISelectOption, false> = {
  control: (provided) => ({
    ...provided,
  }),
  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  indicatorSeparator: () => ({
    display: 'none', // Remove the separator line
  }),
};

const SearchSelect = forwardRef((props: IBasicSelectWithSearch) => {
  const { data, value, setValue = () => {}, isInvalid, width = '100%' } = props;

  const handleChange = (selectedOption: ISelectOption | null) => {
    setValue && setValue(selectedOption?.value || '');
  };

  const customWidthStyles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      width: width,
      height: '32px',
      padding: 0,
      border: isInvalid && '2px solid #E53E3E',
    }),
    container: (baseStyles: any) => ({
      ...baseStyles,
      width: width,
      height: '32px',
    }),
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={data}
      styles={{ ...customStyles, ...customWidthStyles }}
      isClearable
      menuPortalTarget={document.body}
    />
  );
});

SearchSelect.displayName = 'SearchSelect';

export default SearchSelect;
