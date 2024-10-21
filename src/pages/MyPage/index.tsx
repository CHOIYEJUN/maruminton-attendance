import { useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';

import { Box, Flex, Img, List, ListItem, Select, Text } from '@chakra-ui/react';

const MyPage = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [attendanceDates, setAttendanceDates] = useState<string[]>([]);

  useEffect(() => {
    // Fetch attendance data for the selected month
    // This is a placeholder, replace with actual data fetching logic
    const fetchAttendanceData = async () => {
      // Example data
      const data = ['2023-10-01', '2023-10-05', '2023-10-12'];
      setAttendanceDates(data);
    };

    fetchAttendanceData();
  }, [selectedMonth]);

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
