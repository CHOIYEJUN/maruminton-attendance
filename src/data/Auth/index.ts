export const loginMataData = {
  email: {
    label: '이메일',
    isRequired: true,
    validaType: 'email',
  },
  password: {
    label: '비밀번호',
    isRequired: true,
    validaType: 'password',
  },
};

export const firebaseErrorMessages: { [key: string]: string } = {
  'auth/invalid-email': '잘못된 이메일 형식입니다.',
  'auth/user-disabled': '해당 사용자는 비활성화되었습니다.',
  'auth/user-not-found': '해당 이메일로 등록된 사용자가 없습니다.',
  'auth/invalid-credential ': '해당 사용자가 없습니다.',
  'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
  'auth/too-many-requests': '너무 많은 시도가 발생했습니다. 잠시 후 다시 시도하세요.',
  'auth/email-already-in-use': '이미 사용 중인 이메일 주소입니다.',
  'auth/weak-password': '비밀번호가 너무 약합니다. 강력한 비밀번호를 설정하세요.',
  'auth/network-request-failed': '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.',
};
