import { useContext } from 'react';
import { AuthUserContext } from './AuthUser';

const useAuthUser = () => {
  return useContext(AuthUserContext);
};

export default useAuthUser;
