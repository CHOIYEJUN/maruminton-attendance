import { useRecoilValue, useSetRecoilState } from 'recoil';

import { signInWithEmailAndPassword } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useNavigate } from 'react-router';

import { Button, useToast } from '@chakra-ui/react';

import { loginDataContext, loginErrorMessageContext } from '@context/auth/authState';

import { ILoginErrorMessage } from '@/types/auth/login';

import { firebaseErrorMessages, loginMataData } from '@data/Auth';

import { auth } from '@utils/fireBase';
import { isFormValid, validateForm } from '@utils/validationUtil';

const LoginButton = () => {
  const setErrorMessages = useSetRecoilState(loginErrorMessageContext);
  const loginData = useRecoilValue(loginDataContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = async () => {
    let isValidate = true;

    const errors = validateForm(loginData, loginMataData);
    setErrorMessages(errors as unknown as ILoginErrorMessage);

    isValidate = isFormValid(errors);

    if (!isValidate) {
      return;
    }

    // 이메일과 비밀번호로 Firebase 로그인 처리
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const user = userCredential.user;

      // 로그인 성공 시 유저 정보 로컬 스토리지에 저장
      localStorage.setItem('userEmail', user.email || '');
      localStorage.setItem('userName', user.displayName || 'Unknown');
      localStorage.setItem('userDOB', '1990-01-01'); // 생년월일은 추가 정보로 받아서 저장하는 방식 필요

      console.log('로그인 성공:', user.email);
      navigate('/');
    } catch (error) {
      // 로그인 실패 시 예외 처리
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = firebaseErrorMessages[errorCode] || '알 수 없는 오류가 발생했습니다.';

        toast({
          title: '로그인 실패',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        // 에러 메시지를 Recoil 상태로 업데이트
        setErrorMessages({
          email: errorCode === 'auth/invalid-email' ? '잘못된 이메일 형식입니다.' : '',
          password: errorCode === 'auth/wrong-password' ? '비밀번호가 일치하지 않습니다.' : '',
        });
      }
    }
  };

  return <Button onClick={handleClick}>로그인</Button>;
};

export default LoginButton;
