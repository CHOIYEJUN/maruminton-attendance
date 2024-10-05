import { useRecoilState } from 'recoil';

import { useNavigate } from 'react-router';

import { Link, Text } from '@chakra-ui/react';

import LoginButton from '@pages/Auth/Login/components/LoginButton';

import LabelInput from '@components/input/LabelInput';
import LabelPasswordInput from '@components/input/LabelPasswordInput';
import BasicFlex from '@components/layout/BasicFlex';

import { loginDataContext, loginErrorMessageContext } from '@context/auth/authState';

import { GAP } from '@data/layout';

import { isEmpty } from '@utils/validationUtil';

const Login = () => {
  const [loginData, setLoginData] = useRecoilState(loginDataContext);
  const [errorMessage, setErrorMessage] = useRecoilState(loginErrorMessageContext);

  const navigate = useNavigate();

  const handleChange = (value: any, key: string, isRequierd: boolean) => {
    setLoginData((currVal) => ({
      ...currVal,
      [key]: value,
    }));

    if (isRequierd) {
      setErrorMessage((currVal) => ({
        ...currVal,
        [key]: '',
      }));
    }
  };

  return (
    <BasicFlex containerStyles={{ margin: '0 auto', width: '300px', gap: GAP.xxl }}>
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
          value={loginData?.email}
          setValue={(value) => handleChange(value, 'email', true)}
          errorMessage={errorMessage?.email}
          isInvalid={!isEmpty(errorMessage?.email)}
        />
        <LabelPasswordInput
          label={'비밀번호'}
          value={loginData?.password}
          setValue={(value) => handleChange(value, 'password', true)}
          errorMessage={errorMessage?.password}
          isInvalid={!isEmpty(errorMessage?.password)}
        />
      </BasicFlex>
      <LoginButton />
      <Text textAlign={'center'} fontSize={'sm'} fontWeight={''}>
        계정이 없으신가요?
        <span> </span>
        <Link color={'blue.500'} onClick={() => navigate('/create-account')} fontWeight={'bold'}>
          가입하기
        </Link>
      </Text>
    </BasicFlex>
  );
};

export default Login;
