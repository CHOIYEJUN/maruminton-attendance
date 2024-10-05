import { useEffect } from 'react';
import { ReactElement } from 'react';

import { useToast } from '@chakra-ui/react';

import { auth } from '@utils/fireBase';

interface PrivateRouteProps {
  element: ReactElement;
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user === null) {
        window.location.replace('/login');
        toast({
          title: '인증 실패',
          description: '로그인이 해제되었습니다. 다시 로그인 해 주세요',
          status: 'error',
        });
      }
    });
    return () => unsubscribe(); // cleanup 함수를 이용하여 구독 취소
  }, []);

  return element;
}
