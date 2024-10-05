import { ForwardedRef, forwardRef } from 'react';

import LabelBox from '@components/label/LabelBox';
import BasicSelect, { IBasicSelect } from '@components/select/BasicSelect';

import { isEmpty } from '@utils/validationUtil';

interface ILabelSelectProps extends IBasicSelect {
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
}

const LabelSelect = forwardRef((props: ILabelSelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const { label, data, value, setValue, placeholder, isRequired, isInvalid, isReadOnly, errorMessage, width } = props;

  return (
    <LabelBox
      label={label}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      errorMessage={errorMessage}
      isWidth={!isEmpty(width)}
    >
      <BasicSelect
        ref={ref}
        data={data}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        width={width}
      />
    </LabelBox>
  );
});

LabelSelect.displayName = 'LabelSelect';

export default LabelSelect;
