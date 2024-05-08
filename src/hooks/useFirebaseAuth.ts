import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { useAppDispatch } from '../app/store/hooks';
import { removeUser, setUser } from '../app/store/user/slice';
import { auth } from '../firebase';

const useFirebaseAuth = (): {
  isCheckAuth: boolean;
} => {
  const [isCheckAuth, setIsCheckAuth] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        dispatch(setUser({ email, id: uid }));
        setIsCheckAuth(false);
      } else {
        dispatch(removeUser());
        setIsCheckAuth(false);
      }
    });
    return () => {
      listen();
    };
  }, [dispatch]);

  return { isCheckAuth };
};

export { useFirebaseAuth };
