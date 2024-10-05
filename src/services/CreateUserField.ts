import { collection, doc, setDoc } from 'firebase/firestore';

import { ICreateFieldProps } from '@/types/auth/createAccount';

import { getNowData } from '@utils/dateUtil';
import { DBservice } from '@utils/fireBase';

export const CreateUserFieldApi = async (props: ICreateFieldProps) => {
  const { uid, email, username, birth } = props;
  const userDocRef = doc(collection(DBservice, 'users'), uid);
  await setDoc(userDocRef, {
    uid: uid,
    email: email,
    username: username,
    birth: birth,
    createdAt: getNowData(),
  });
};
