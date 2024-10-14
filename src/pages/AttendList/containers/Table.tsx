import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { IAttendDetailDatas } from '@/types/attend/attendType';

const AttendListTable = (props: { data: IAttendDetailDatas[] }) => {
  const { data } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>프로필 사진</Th>
          <Th>이름(생년월일)</Th>
          <Th>콕 제출 여부</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.uid}>
            <Td>
              <img src={''} alt={'Profile'} width={'50'} height={'50'} />
            </Td>
            <Td>{`${item.userName}`}</Td>
            <Td></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AttendListTable;
