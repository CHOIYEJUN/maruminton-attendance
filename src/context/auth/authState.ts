import { atom } from 'recoil';

import { ICreateUserErrorMessagesDatas, ICreateUserFieldProps } from '@/types/auth/createAccount';
import { ILoginDatas, ILoginErrorMessage } from '@/types/auth/login';

export const loginDataContext = atom<ILoginDatas>({
  key: 'loginDataContext',
  default: {
    email: '',
    password: '',
  },
});

export const loginErrorMessageContext = atom<ILoginErrorMessage>({
  key: 'loginErrorMessageContext',
  default: {
    email: '',
    password: '',
  },
});

export const signUpDataContext = atom<ICreateUserFieldProps>({
  key: 'signUpDataContext',
  default: {
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
    birth: '',
  },
});

export const signUpDataErrorMessageContext = atom<ICreateUserErrorMessagesDatas>({
  key: 'signUpDataErrorMessageContext',
  default: {
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
    birth: '',
  },
});

export const isEmailAvailableState = atom<boolean>({
  key: 'isEmailAvailableState',
  default: false,
});
