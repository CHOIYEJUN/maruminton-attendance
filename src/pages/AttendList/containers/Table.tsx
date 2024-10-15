import { getAuth } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';

import { Box, Button, Icon, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { IAttendDetailDatas } from '@/types/attend/attendType';

import { SIZE } from '@data/common';

const AttendListTable = (props: { data: IAttendDetailDatas[] }) => {
  const { data } = props;

  // uid 를 가져와야해
  const auth = getAuth();
  const loggedInUid = auth.currentUser ? auth.currentUser.uid : null;

  const myAttendance = data.find((item) => item.uid === loggedInUid);
  const otherAttendance = data.filter((item) => item.uid !== loggedInUid);

  const handleCancel = (uid: string) => {
    console.log(uid);
  };
  return (
    <Box>
      {/* 본인 출석 정보 표시 */}
      {myAttendance && (
        <Box mb={4}>
          <Table>
            <Thead>
              <Tr>
                <Th sx={SIZE.TD_STYLE}></Th>
                <Th sx={SIZE.TD_STYLE}>이름</Th>
                <Th sx={SIZE.TD_STYLE}>취소</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr key={myAttendance.uid}>
                <Td sx={SIZE.TD_STYLE}>
                  <Icon as={FaUser} />
                </Td>
                <Td sx={SIZE.TD_STYLE}>{`${myAttendance.userName}`}</Td>
                <Td sx={SIZE.TD_STYLE}>
                  <Button colorScheme={'red'} size={'xs'} onClick={() => handleCancel(myAttendance.uid)}>
                    출석 취소
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}

      {/* 나머지 출석 정보 표시 */}
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>이름</Th>
            <Th>제출 여부</Th>
          </Tr>
        </Thead>
        <Tbody>
          {otherAttendance.map((item) => (
            <Tr key={item.uid}>
              <Td>
                <Icon as={FaUser} />
              </Td>
              <Td>{`${item.userName}`}</Td>
              <Td>
                <span>콕 제출 완료</span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AttendListTable;
