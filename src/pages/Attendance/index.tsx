import { ChangeEvent, useEffect, useState } from 'react';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router';

import { Box, Button, Flex, Input, Spinner, Text, useToast } from '@chakra-ui/react';

import { insertStemp } from '@services/attendnceService';

import { auth } from '@utils/fireBase';

const Attendance = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoding, setIsLoding] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    } else {
      setPreviewUrl(null);
    }
  }, [imgFile]);

  const todayCheck = async () => {
    if (!imgFile) {
      toast({
        title: '오류',
        description: '이미지를 먼저 업로드해주세요.',
        status: 'error',
        isClosable: true,
      });
      return;
    }
    setIsLoding(true);

    const callBack = await uploadImage(imgFile);

    if (callBack) {
      const insertStempState = await insertStemp(callBack?.url, callBack?.imgPath);
      setIsLoding(false);
      if (insertStempState === 'success') {
        navigate('/todayDoen');
      } else if (insertStempState === 'fail') {
        toast({
          title: '오류',
          description: '관리자에게 문의바랍니다.',
          status: 'error',
          isClosable: true,
        });
      } else if (insertStempState === 'already') {
        toast({
          title: '오류',
          description: '이미 스탬프를 받았습니다',
          status: 'error',
          isClosable: true,
        });
        navigate('/myState');
      }
    } else {
      toast({
        title: '오류',
        description: '이미지를 먼저 업로드해주세요.',
        status: 'error',
        isClosable: true,
      });
      setIsLoding(false);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) return;

    const storage = getStorage();
    const userId = auth.currentUser?.uid;
    const today = new Date().toISOString().slice(0, 10);
    const imgRef = ref(storage, `attendance/${userId}/${today}/attendList`);

    try {
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      const imgPath = imgRef.fullPath;

      return { url, imgPath };
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: '업로드 실패',
        description: '이미지 업로드에 실패했습니다.',
        status: 'error',
        isClosable: true,
      });
      return null;
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile('' || e.target.files[0]);
    }
  };

  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <Text fontSize={'2xl'} mb={'4'}>
        출석하기
      </Text>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'150px'}
        h={'150px'}
        border={'1px dashed #000'}
        margin={'0 auto'}
        position={'relative'}
      >
        <Input
          type={'file'}
          id={'imgFile'}
          accept={'image/*'}
          onChange={onFileChange}
          opacity={0}
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          cursor={'pointer'}
        />
        {previewUrl ? (
          <Box as={'img'} src={previewUrl} alt={'Image preview'} maxWidth={'100%'} maxHeight={'100%'} />
        ) : (
          <Box textAlign={'center'}>
            <svg
              style={{ width: '50px', height: '50px', margin: '0 auto' }}
              xmlns={'http://www.w3.org/2000/svg'}
              viewBox={'0 0 24 24'}
              fill={'none'}
              stroke={'currentColor'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
            >
              <line x1={'12'} y1={'5'} x2={'12'} y2={'19'}></line>
              <line x1={'5'} y1={'12'} x2={'19'} y2={'12'}></line>
            </svg>
            <div className={'file-upload-text'}>Click upload Image</div>
          </Box>
        )}
      </Box>
      <Button colorScheme={'blue'} mt={'4'} onClick={todayCheck}>
        출석하기
      </Button>

      {isLoding && <Spinner thickness={'4px'} speed={'0.65s'} emptyColor={'gray.200'} color={'blue.500'} size={'xl'} />}
    </Flex>
  );
};

export default Attendance;
