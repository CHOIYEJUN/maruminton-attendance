import { getAuth } from 'firebase/auth';

import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

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
                <Th sx={SIZE.TD_STYLE}>프로필 사진</Th>
                <Th sx={SIZE.TD_STYLE}>이름(생년월일)</Th>
                <Th sx={SIZE.TD_STYLE}>콕 제출 여부</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr key={myAttendance.uid}>
                <Td>
                  <img src={''} alt={'Profile'} width={'50'} height={'50'} />
                </Td>
                <Td>{`${myAttendance.userName}`}</Td>
                <Td>
                  <Button colorScheme={'red'} size={'sm'} onClick={() => handleCancel(myAttendance.uid)}>
                    출석 취소하기
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
            <Th>프로필 사진</Th>
            <Th>이름(생년월일)</Th>
            <Th>콕 제출 여부</Th>
          </Tr>
        </Thead>
        <Tbody>
          {otherAttendance.map((item) => (
            <Tr key={item.uid}>
              <Td>
                <img src={''} alt={'Profile'} width={'50'} height={'50'} />
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
