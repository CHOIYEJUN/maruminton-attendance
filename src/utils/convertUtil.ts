import decamelizeKeys from 'decamelize-keys';

export const converseYN = (value: 'Y' | 'N' | boolean): string | boolean => {
  if (typeof value === 'boolean') {
    return value ? 'Y' : 'N';
  } else {
    const upperInput = value.toUpperCase();
    if (upperInput === 'Y') {
      return true;
    } else if (upperInput === 'N') {
      return false;
    }

    throw new Error('Invalid input: expected "Y", "N", true, or false');
  }
};

export const toBoolean = (value: string | boolean): boolean => {
  return typeof value === 'boolean' ? value : value === 'Y';
};

export const toYn = (value: boolean): string => {
  return value ? 'Y' : 'N';
};

export const convertHttpData = (data: any) => {
  const exceptRequestData = ['updateCount'];

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      return;
    }

    if (data[key] instanceof File) {
      return;
    }

    if (exceptRequestData.includes(key) || data[key] === '' || data[key] === null) {
      delete data[key];
    } else if (key.endsWith('Date') || key.endsWith('Dt')) {
      data[key] = data[key]?.replaceAll('-', '');
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      convertHttpData(data[key]);
    }
  }

  return data;
};

export const convertJsonToFormData = (data: any) => {
  return new Blob([JSON.stringify(decamelizeKeys(convertHttpData(data), { deep: true }))], {
    type: 'application/json',
  });
};

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k)); // 어떤 단위로 변환할지 결정하는 지수 계산
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2)); // 값을 적당한 자리수까지 반올림

  return `${value} ${sizes[i]}`;
};
