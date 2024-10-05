export interface ICreateUserFieldProps {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
  birth: string;
}

export interface ICreateUserErrorMessagesDatas {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
  birth: string;
}

export interface ICreateFieldProps {
  uid: string;
  email: string;
  username: string;
  birth: string;
}
