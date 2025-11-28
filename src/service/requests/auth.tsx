import axios from 'axios';
import { resetAndNavigate } from '../../utils/NavigationUtils';
import apiClient from '../apiClient';
import { BASE_URL } from '../config';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../storage';

export const loginWithGoogle = async (idToken: string) => {
  const { data } = await apiClient.post('/api/v1/user/login', {
    id_token: idToken,
  });
  console.log('this is data', data)
  await setAccessToken(data?.accessToken);
  await setRefreshToken(data?.refreshToken);
  return data?.user;
};

export const logout = async () => {
  await removeAccessToken();
  await removeRefreshToken();
  await resetAndNavigate('LoginScreen');
};

export const refresh_tokens = async (): Promise<boolean> => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/user/refresh-accesstoken`,
      {
        refreshToken,
      },
    );
    if (data?.accessToken) {
      await setAccessToken(data?.accessToken);
      return true;
    } else {
      throw new Error('Invalid Refresh response');
    }
  } catch (error) {
    console.log('Token refresh failed:', error);
    logout();
    return false;
  }
};
