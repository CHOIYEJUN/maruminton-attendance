import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { fetchSignInMethodsForEmail } from 'firebase/auth';

import { Button, useToast } from '@chakra-ui/react';

import { isEmailAvailableState, signUpDataErrorMessageContext } from '@context/auth/authState';

import { auth } from '@utils/fireBase';
import { isEmpty } from '@utils/validationUtil';

interface ICheckDuplicateEmailButtonProps {
  email: string;
}

const CheckDuplicateEmailButton = ({ email }: ICheckDuplicateEmailButtonProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useRecoilState(isEmailAvailableState);
  const setErrorMessages = useSetRecoilState(signUpDataErrorMessageContext);
  const toast = useToast();

  const checkEmailDuplication = async () => {
    if (isEmpty(email)) {
      setErrorMessages((prev) => ({
        ...prev,
        email: '이메일은 필수값 입니다.',
      }));
      return;
    }

    try {
      setIsChecking(true);
      const methods = await fetchSignInMethodsForEmail(auth, email);

      // 이메일 중복 여부에 따라 처리
      if (methods.length > 0) {
        setIsAvailable(false);
        setErrorMessages((prev) => ({
          ...prev,
          email: '이미 사용 중인 이메일입니다.',
        }));
        toast({
          status: 'warning',
          title: '이미 사용 중인 이메일입니다.',
        });
      } else {
        setIsAvailable(true);
        setErrorMessages((prev) => ({
          ...prev,
          email: '',
        }));
        toast({
          status: 'success',
          title: '사용 가능한 이메일입니다.',
        });
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        email: '오류가 발생했습니다',
      }));
      toast({
        status: 'error',
        title: '오류가 발생했습니다.',
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    setIsAvailable(false);
  }, [email]);

  return (
    <Button
      size={'md'}
      marginTop={'8px'}
      fontSize={'2xs'}
      onClick={checkEmailDuplication}
      isLoading={isChecking} // 중복 체크 시 로딩 표시
      colorScheme={isAvailable ? 'green' : 'gray'}
    >
      {isAvailable ? '체크 완료' : '중복 체크'}
    </Button>
  );
};

export default CheckDuplicateEmailButton;
