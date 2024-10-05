import { ForwardedRef, forwardRef } from 'react';

import { GroupBase, OptionsOrGroups } from 'react-select';

import LabelBox from '@components/label/LabelBox';
import { IBasicSelect } from '@components/select/BasicSelect';
import SearchSelect from '@components/select/SearchSelect';

import { ISelectOption } from '@/types/common';

import { isEmpty } from '@utils/validationUtil';

interface ILabelSelectProps extends IBasicSelect {
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
  isInvalid?: boolean;
  isReadonly?: boolean;
}
interface ICustomSelectProps {
  options: OptionsOrGroups<any, GroupBase<any>>;
  // 추가 props들을 여기에 추가
}

const LabelSearchSelect = forwardRef((props: ILabelSelectProps, ref: ForwardedRef<ICustomSelectProps>) => {
  const { label, data, value, setValue, isRequired, errorMessage, isInvalid, isReadonly, width = '100%' } = props;

  const selectedValue: ISelectOption | undefined = data.find((option) => option.value === value);

  return (
    <LabelBox label={label} isRequired={isRequired} errorMessage={errorMessage} isWidth={!isEmpty(width)}>
      <SearchSelect
        data={data}
        value={selectedValue}
        setValue={setValue}
        isInvalid={isInvalid}
        isReadonly={isReadonly}
        width={width as string}
        ref={ref}
      />
    </LabelBox>
  );
});

LabelSearchSelect.displayName = 'LabelSearchSelect';

export default LabelSearchSelect;
