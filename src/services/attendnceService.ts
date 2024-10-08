import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { getNowData } from '@utils/dateUtil';
import { DBservice, auth } from '@utils/fireBase';

export const insertStemp = async (questImgUrl: string, questImgPath: string) => {
  try {
    let userID;
    const steampQuery = query(
      collection(DBservice, 'stemp'),
      where('uid', '==', userID),
      where('attendData', '==', getNowData),
    );

    const querySnapshot = await getDocs(steampQuery);

    if (querySnapshot.docs.length > 0) {
      return 'already';
    }
    // 새 문서 추가
    await addDoc(collection(DBservice, 'stemp'), {
      uid: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      attendData: getNowData,
      attendImgUrl: questImgUrl,
      attendImgPath: questImgPath,
    });
    return 'success';
  } catch (error) {
    console.log(error);
    return 'fail';
  }
};
