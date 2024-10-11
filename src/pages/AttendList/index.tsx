import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Flex } from '@chakra-ui/react';

import Table from '@pages/AttendList/containers/Table';

import { attendListState } from '@context/attend/attendState';

import { getAttendList } from '@services/attendnceService';

import { IAttendDetailDatas } from '@/types/attend/attendType';

const AttendList = () => {
  const [data, setData] = useRecoilState(attendListState);
  useEffect(() => {
    const getAttendListState = async () => {
      const attendList: IAttendDetailDatas[] = await getAttendList();
      setData(attendList);
    };
    getAttendListState();
  }, []);

  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <Table data={data} />
    </Flex>
  );
};

export default AttendList;
