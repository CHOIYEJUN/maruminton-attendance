import { FaCheckCircle, FaListAlt, FaUser, FaUserShield } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { Box, Flex, Text } from '@chakra-ui/react';

import BasicFlex from '@components/layout/BasicFlex';

const BottomMenu = () => {
  return (
    <BasicFlex
      direction={'horizontal'}
      containerStyles={{
        width: '100%',
        height: '80px',
        backgroundColor: 'gray',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <NavLink to={'/attendance'}>
        <Box color={location.pathname === '/attendance' ? 'white' : 'black'}>
          <Flex direction={'column'} align={'center'}>
            <FaCheckCircle size={'24px'} />
            <Text fontSize={'xs'}>출석하기</Text>
          </Flex>
        </Box>
      </NavLink>
      <NavLink to={'/status'}>
        <Box color={location.pathname === '/status' ? 'white' : 'black'}>
          <Flex direction={'column'} align={'center'}>
            <FaListAlt size={'24px'} />
            <Text fontSize={'xs'}>출석현황</Text>
          </Flex>
        </Box>
      </NavLink>
      <NavLink to={'/profile'}>
        <Box color={location.pathname === '/profile' ? 'white' : 'black'}>
          <Flex direction={'column'} align={'center'}>
            <FaUser size={'24px'} />
            <Text fontSize={'xs'}>내정보</Text>
          </Flex>
        </Box>
      </NavLink>
      <NavLink to={'/admin'}>
        <Box color={location.pathname === '/admin' ? 'white' : 'black'}>
          <Flex direction={'column'} align={'center'}>
            <FaUserShield size={'24px'} />
            <Text fontSize={'xs'}>관리자</Text>
          </Flex>
        </Box>
      </NavLink>
    </BasicFlex>
  );
};

export default BottomMenu;
