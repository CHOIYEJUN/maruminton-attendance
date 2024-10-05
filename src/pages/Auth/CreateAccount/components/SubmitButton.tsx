import { useRecoilValue } from 'recoil';

import * as authService from 'firebase/auth';
import { useNavigate } from 'react-router';

import { Button, useToast } from '@chakra-ui/react';

import { signUpDataContext } from '@context/auth/authState';

import { CreateUserFieldApi } from '@services/CreateUserField';

import { ICreateFieldProps } from '@/types/auth/createAccount';

import { auth } from '@utils/fireBase';

const SubmitButton = () => {
  const data = useRecoilValue(signUpDataContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // 회원가입 API 호출
      const signUpData = await authService.createUserWithEmailAndPassword(auth, data?.email, data?.password);
      await authService.updateProfile(signUpData.user, {
        displayName: data?.username,
      });
      const fieldData: ICreateFieldProps = {
        uid: signUpData?.user?.uid,
        email: data?.email,
        username: data?.username,
        birth: data?.birth,
      };

      await CreateUserFieldApi(fieldData);
      toast({
        title: 'Registration successful.',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registration failed.',
        description: 'An error occurred during registration.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button type={'submit'} onClick={handleSubmit}>
      회원가입
    </Button>
  );
};

export default SubmitButton;
