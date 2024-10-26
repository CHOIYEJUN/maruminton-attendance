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
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import LabelInput from '@components/input/LabelInput';

import { IAttendDetailDatas } from '@/types/attend/attendType';

import { getNowData } from '@utils/dateUtil';

const Admin = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const [selectedDate, setSelectedDate] = useState(getNowData());
  const [attendanceList, setAttendanceList] = useState<IAttendDetailDatas[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProfile, setSelectedProfile] = useState<IAttendDetailDatas>();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const q = query(collection(db, 'attendance'), where('date', '==', selectedDate));
      const querySnapshot = await getDocs(q);
      const data: IAttendDetailDatas[] = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          attendData: docData.attendData,
          attendImgPath: docData.attendImgPath,
          attendImgUrl: docData.attendImgUrl,
          uid: docData.uid,
          userName: docData.userName,
          submissionStatus: docData.submissionStatus,
        } as IAttendDetailDatas;
      });
      setAttendanceList(data);
    };

    fetchAttendanceData();
  }, [selectedDate, db]);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const handleProfileClick = (profile: IAttendDetailDatas) => {
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
        <LabelInput
          label={'Date'}
          type={'date'}
          value={selectedDate}
          setValue={(value: string) => handleDateChange(value)}
        />
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
              <Image
                borderRadius={'full'}
                boxSize={'100px'}
                src={selectedProfile?.attendImgUrl}
                alt={'Profile Picture'}
              />
              <Text mt={4}>{`${selectedProfile?.userName}`}</Text>
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
