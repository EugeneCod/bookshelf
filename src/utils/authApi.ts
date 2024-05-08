import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '../firebase';

import { AUTH_ERROR_MESSAGES } from './constants';

import type { FirebaseError } from 'firebase/app';
import type { SetUserPayload } from '../app/store/user/types';

export const register = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return 'Registration was successful';
  } catch (error) {
    if ((error as FirebaseError).code === 'auth/email-already-in-use') {
      return Promise.reject(AUTH_ERROR_MESSAGES.EMAIL_CONFLICT);
    } else {
      return Promise.reject(AUTH_ERROR_MESSAGES.UNIDENTIFIED);
    }
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<SetUserPayload> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { email: user.email, id: user.uid };
  } catch (error) {
    return Promise.reject(AUTH_ERROR_MESSAGES.UNIDENTIFIED);
  }
};

export const logout = async (): Promise<string> => {
  try {
    await signOut(auth);
    return 'Logged out of the system';
  } catch (error) {
    return Promise.reject(AUTH_ERROR_MESSAGES.LOGOUT_ERROR);
  }
};
