import { UUID_PREFIX } from '../data/common';

interface ValidationRule {
  isRequired?: boolean;
  validaType?: string;
  label: string;
}

interface MetaData {
  [key: string]: ValidationRule;
}

export const isEmpty = (value: string | number | object | null | undefined | boolean): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Set || value instanceof Map) {
    return value.size === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};

// 숫자로 변환하는 함수
export const toNumber = (value: string, defaultValue: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

// 어떤 값이든 문자열로 변환하는 함수
export const toString = (value: number | undefined | null): string => {
  return value !== null && value !== undefined ? String(value) : '';
};

// 객체나 배열을 깊은 복사하는 함수
export const deepCopy = (obj: object | Array<string | number>) => {
  return JSON.parse(JSON.stringify(obj));
};

// 배열에서 중복 요소 제거하는 함수
export const removeDuplicates = (array: Array<string | number>) => {
  return [...new Set(array)];
};

// 휴대전화번호 포맷변경 함수
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
  }
  return phoneNumber;
};

// 국가코드 뽑아오는 함수
export const getCountryCode = (phoneNumber: string): string => {
  if (isEmpty(phoneNumber)) {
    return '';
  }
  const match = phoneNumber.match(/^\+(\d{1,3})/);
  return match ? match[1] : '';
};

// 임의의 키값 가져오는 함수
export const generateUniqueKey = () => {
  return Math.random() - Math.floor(Math.random());
};

export const isUUID = (value: string | null) => {
  return value?.toString()?.startsWith(UUID_PREFIX);
};

export const validateValue = (value: string, rule: ValidationRule): string | null => {
  // 필수 값 검증
  if (rule.isRequired && !value) {
    return `${rule.label} 필수 입력입니다.`;
  }

  // 형식 검증
  if (value && rule.validaType) {
    switch (rule.validaType) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return `${rule.label} 형식이 다릅니다. (ex@domain.co.kr 등 이메일 형식`;
        }
        break;
      }
      case 'phone': {
        const phoneRegex = /^\d{10,11}$/;
        if (!phoneRegex.test(value)) {
          return `${rule.label} 형식이 다릅니다. (10~16 자리 숫자)`;
        }
        break;
      }
      case 'password': {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        if (!passwordRegex.test(value)) {
          return `${rule.label} 형식이 다릅니다. (문자, 숫자, 특수문자를 포함한 8~15 자)`;
        }
        break;
      }
      // 필요한 경우 다른 검증 로직 추가 가능
      default:
        break;
    }
  }

  return null; // 검증에 통과한 경우 null 반환
};

export const validateForm = (
  data: { [key: string]: any }, // 검증할 데이터
  metaData: MetaData, // 검증 규칙
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  // 각 필드를 순회하며 검증
  Object.keys(metaData).forEach((field) => {
    const value = data[field];
    const rule = metaData[field];

    const error = validateValue(value, rule); // 필드 검증

    if (error) {
      errors[field] = error; // 에러가 있으면 해당 필드에 대한 에러 메시지 설정
    } else {
      errors[field] = ''; // 에러가 없으면 빈 문자열 설정
    }
  });

  return errors; // 에러 메시지 객체 반환
};

export const isFormValid = (errors: { [key: string]: string }): boolean => {
  return Object.values(errors).every((msg) => msg === '');
};
