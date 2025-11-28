// import { MMKV } from 'react-native-mmkv';

// export const storage = new MMKV();

// // -------- Access Token --------

// export const setAccessToken = (token: string) => {
//     storage.set('accessToken', token);
// };

// export const getAccessToken = () => {
//     return storage.getString('accessToken');
// }

// export const removeAccessToken = () => {
//     storage.delete('accessToken');
// }


// // -------- Refresh Token --------

// export const setRefreshToken = (token: string) => {
//     storage.set('refreshToken', token);
// }

// export const getRefreshToken = () => {
//     return storage.getString('refreshToken');
// }

// export const removeRefreshToken = (): void => {
//   storage.delete("refreshToken");
// };

import EncryptedStorage from 'react-native-encrypted-storage';


// -------- Access Token --------
export const setAccessToken = async (token: string) => {
  await EncryptedStorage.setItem('accessToken', token);
};

export const getAccessToken = async () => {
  return await EncryptedStorage.getItem('accessToken');
};

export const removeAccessToken = async () => {
  await EncryptedStorage.removeItem('accessToken');
};


// -------- Refresh Token --------

export const setRefreshToken = async (token: string) => {
  await EncryptedStorage.setItem('refreshToken', token);
};

export const getRefreshToken = async () => {
  return await EncryptedStorage.getItem('refreshToken');
};

export const removeRefreshToken = async () => {
  await EncryptedStorage.removeItem('refreshToken');
};
