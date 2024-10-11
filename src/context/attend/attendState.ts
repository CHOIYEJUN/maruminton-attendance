import { atom } from 'recoil';

import { IAttendDetailDatas } from '@/types/attend/attendType';

export const attendListState = atom<IAttendDetailDatas[]>({
  key: 'attendListState',
  default: [],
});
