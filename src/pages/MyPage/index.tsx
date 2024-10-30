import { useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

import { Box, Flex, Img, List, ListItem, Select, Text } from '@chakra-ui/react';

const MyPage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [attendanceDates, setAttendanceDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const startOfMonth = new Date(Date.UTC(new Date().getFullYear(), selectedMonth - 1, 1));
      const endOfMonth = new Date(Date.UTC(new Date().getFullYear(), selectedMonth, 0));

      const q = query(
        collection(db, 'attend'),
        where('attendData', '>=', startOfMonth.toISOString().split('T')[0]),
        where('attendData', '<=', endOfMonth.toISOString().split('T')[0]),
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        console.log(doc.data()); // 각 문서의 데이터를 출력하여 구조 확인
        return doc.data().attendData;
      });
      setAttendanceDates(data);
    };

    fetchAttendanceData();
  }, [selectedMonth, db]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  return (
    <Box>
      {/* Profile Section */}
      <Flex alignItems={'center'} mb={4}>
        <Img
          borderRadius={'full'}
          boxSize={'50px'}
          src={user?.photoURL || 'https://via.placeholder.com/50'}
          alt={'Profile Picture'}
        />
        <Text ml={4}>{user?.displayName || 'Anonymous'}</Text>
      </Flex>

      {/* Month Filter */}
      <Box mb={4}>
        <Select value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month}월
            </option>
          ))}
        </Select>
        <Text mt={2}>총 {attendanceDates.length} 회</Text>
      </Box>

      {/* Attendance List */}
      <List spacing={2}>
        {attendanceDates.map((date) => (
          <ListItem key={date}>{date}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyPage;
