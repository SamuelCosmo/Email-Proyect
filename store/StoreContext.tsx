import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {EmailProps} from '../src/shared/interfaces';

// Define the type for the user object
type User = {
  id: string;
  token: string;
};

// Define the context type
type GlobalContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  emailList: EmailProps[];
  setEmailList: Dispatch<SetStateAction<EmailProps[]>>;
};

// Create the context with a default value
export const GlobalContext = createContext<GlobalContextType>({
  user: {id: '', token: ''},
  setUser: () => {
    throw new Error('setUser function must be overridden');
  },
  emailList: [],
  setEmailList: () => {
    throw new Error('setUser function must be overridden');
  },
});

// Define the provider component
export const GlobalProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User>({id: '', token: ''});
  const [emailList, setEmailList] = useState<EmailProps[]>([]);

  function resetData() {
    setUser({id: '', token: ''}), setEmailList([]);
  }

  return (
    <GlobalContext.Provider value={{user, setUser, emailList, setEmailList}}>
      {children}
    </GlobalContext.Provider>
  );
};
