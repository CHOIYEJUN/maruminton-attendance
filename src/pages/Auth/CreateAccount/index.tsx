import { useRecoilState } from 'recoil';

import { Text } from '@chakra-ui/react';

import CheckDuplicateEmailButton from '@pages/Auth/CreateAccount/components/CheckDuplicateEmailButton';
import SubmitButton from '@pages/Auth/CreateAccount/components/SubmitButton';

import LabelInput from '@components/input/LabelInput';
import LabelPasswordInput from '@components/input/LabelPasswordInput';
import BasicFlex from '@components/layout/BasicFlex';

import { signUpDataContext, signUpDataErrorMessageContext } from '@context/auth/authState';

import { ICreateUserErrorMessagesDatas, ICreateUserFieldProps } from '@/types/auth/createAccount';

import { GAP } from '@data/layout';

import { isEmpty } from '@utils/validationUtil';

const CreateAccount = () => {
  const [data, setData] = useRecoilState(signUpDataContext);
  const [errorMessage, setErrorMessage] = useRecoilState(signUpDataErrorMessageContext);

  const handleChange = (value: any, key: string, isRequierd: boolean) => {
    setData((currVal: ICreateUserFieldProps) => ({
      ...currVal,
      [key]: value,
    }));

    if (isRequierd) {
      setErrorMessage((currVal: ICreateUserErrorMessagesDatas) => ({
        ...currVal,
        [key]: '',
      }));
    }
  };

  return (
    <BasicFlex containerStyles={{ margin: '0 auto', width: '300px', gap: GAP.xl }}>
      <BasicFlex>
        <Text textAlign={'center'} fontSize={'md'} fontWeight={'bold'} marginTop={'50px'}>
          마루민턴 출석관리 시스템
        </Text>
        <Text textAlign={'center'} fontSize={'lg'} fontWeight={'bold'}>
          회원가입
        </Text>
      </BasicFlex>

      <BasicFlex containerStyles={{}}>
        <LabelInput
          label={'이메일'}
          value={data?.email}
          setValue={(value) => handleChange(value, 'email', true)}
          errorMessage={errorMessage?.email}
          isInvalid={!isEmpty(errorMessage?.email)}
          isRequired={true}
          rightElement={<CheckDuplicateEmailButton email={data?.email} />}
        />
        <LabelPasswordInput
          label={'비밀번호'}
          value={data?.password}
          setValue={(value) => handleChange(value, 'password', true)}
          errorMessage={errorMessage?.password}
          isInvalid={!isEmpty(errorMessage?.password)}
          isRequired={true}
        />
        <LabelPasswordInput
          label={'비밀번호 확인'}
          value={data?.passwordCheck}
          setValue={(value) => handleChange(value, 'passwordCheck', true)}
          errorMessage={errorMessage?.passwordCheck}
          isInvalid={!isEmpty(errorMessage?.passwordCheck)}
          isRequired={true}
        />
        <LabelInput
          label={'이름'}
          value={data?.username}
          setValue={(value) => handleChange(value, 'username', true)}
          errorMessage={errorMessage?.username}
          isInvalid={!isEmpty(errorMessage?.username)}
          isRequired={true}
        />
        <LabelInput
          label={'생년월일'}
          value={data?.birth}
          setValue={(value) => handleChange(value, 'birth', true)}
          errorMessage={errorMessage?.birth}
          isInvalid={!isEmpty(errorMessage?.birth)}
          isRequired={true}
          type={'date'}
        />
      </BasicFlex>
      <SubmitButton />
    </BasicFlex>
  );
};

export default CreateAccount;
