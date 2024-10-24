import { useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

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

import { IAttendDetailDatas } from '@/types/attend/attendType';
import { ICreateUserFieldProps } from '@/types/auth/createAccount';

import { getNowData } from '@utils/dateUtil';

const Admin = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const [selectedDate, setSelectedDate] = useState(getNowData());
  const [attendanceList, setAttendanceList] = useState<IAttendDetailDatas[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProfile, setSelectedProfile] = useState<ICreateUserFieldProps>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const q = query(collection(db, 'attendance'), where('date', '==', selectedDate));
      const querySnapshot = await getDocs(q);
      const data: IAttendDetailDatas[] = querySnapshot.docs.map((doc) => doc.data());
      setAttendanceList(data);
    };

    fetchAttendanceData();
  }, [selectedDate, db]);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleProfileClick = (profile: ICreateUserFieldProps) => {
    setSelectedProfile(profile);
    onOpen();
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, 'attendance'), { date: selectedDate, data: attendanceList });
      console.log('Attendance list saved');
    } catch (error) {
      console.error('Error saving attendance list: ', error);
    }
  };

  return (
    <Box>
      <Flex alignItems={'center'} mb={4}>
        <Image
          borderRadius={'full'}
          boxSize={'50px'}
          src={user?.photoURL || 'https://via.placeholder.com/50'}
          alt={'Profile Picture'}
        />
        <Text ml={4}>{user?.displayName || 'Anonymous'}</Text>
      </Flex>

      <Box mb={4}>
        <Select value={selectedDate} onChange={handleDateChange}>
          <option value={getNowData()}>{getNowData()}</option>
        </Select>
      </Box>

      <List spacing={2}>
        {attendanceList.map((attendee: IAttendDetailDatas) => (
          <ListItem key={attendee.uid}>
            <Flex alignItems={'center'}>
              <input type={'checkbox'} checked={attendee.submissionStatus} readOnly />
              <Text ml={2}>{`${attendee.userName}`}</Text>
              <Button ml={2} onClick={() => handleProfileClick(attendee)}>
                View Profile
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>

      <Button mt={4} colorScheme={'blue'} onClick={handleSave}>
        Save
      </Button>

      {selectedProfile && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image borderRadius={'full'} boxSize={'100px'} src={''} alt={'Profile Picture'} />
              <Text mt={4}>{`${selectedProfile.username} (${selectedProfile.birth})`}</Text>
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
