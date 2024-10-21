import { useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';

import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { getNowData } from '@utils/dateUtil';

// Assuming this function returns today's date in 'YYYY-MM-DD' format

const Admin = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [selectedDate, setSelectedDate] = useState(getNowData());
  const [attendanceList, setAttendanceList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Fetch attendance data for the selected date
    // This is a placeholder, replace with actual data fetching logic
    const fetchAttendanceData = async () => {
      // Example data
      const data = [
        {
          uid: '1',
          name: 'John Doe',
          birthdate: '1990-01-01',
          profilePictureUrl: 'https://via.placeholder.com/50',
          submissionStatus: true,
        },
        {
          uid: '2',
          name: 'Jane Smith',
          birthdate: '1992-02-02',
          profilePictureUrl: 'https://via.placeholder.com/50',
          submissionStatus: false,
        },
      ];
      setAttendanceList(data);
    };

    fetchAttendanceData();
  }, [selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    onOpen();
  };

  const handleSave = () => {
    // Save logic here
    console.log('Save attendance list');
  };

  return (
    <Box>
      {/* Profile Section */}
      <Flex alignItems={'center'} mb={4}>
        <Image
          borderRadius={'full'}
          boxSize={'50px'}
          src={user?.photoURL || 'https://via.placeholder.com/50'}
          alt={'Profile Picture'}
        />
        <Text ml={4}>{user?.displayName || 'Anonymous'}</Text>
      </Flex>

      {/* Date Filter */}
      <Box mb={4}>
        <Select value={selectedDate} onChange={handleDateChange}>
          {/* Populate with actual date options */}
          <option value={getNowData()}>{getNowData()}</option>
          {/* Add more options as needed */}
        </Select>
      </Box>

      {/* Attendance List */}
      <List spacing={2}>
        {attendanceList.map((attendee) => (
          <ListItem key={attendee.uid}>
            <Flex alignItems={'center'}>
              <input type={'checkbox'} checked={attendee.submissionStatus} readOnly />
              <Text ml={2}>{`${attendee.name} (${attendee.birthdate})`}</Text>
              <Button ml={2} onClick={() => handleProfileClick(attendee)}>
                View Profile
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>

      {/* Save Button */}
      <Button mt={4} colorScheme={'blue'} onClick={handleSave}>
        Save
      </Button>

      {/* Profile Modal */}
      {selectedProfile && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                borderRadius={'full'}
                boxSize={'100px'}
                src={selectedProfile.profilePictureUrl}
                alt={'Profile Picture'}
              />
              <Text mt={4}>{`${selectedProfile.name} (${selectedProfile.birthdate})`}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={'blue'} mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Admin;
