import { IAttendDetailDatas } from '@/types/attend/attendType.ts';

const Table = (props: { data: IAttendDetailDatas[] }) => {
  const { data } = props;

  console.log(data);
  return <>테이블 영역</>;
};

export default Table;
