import * as React from 'react';
import socket from '../utils/socket';
import { AuthState } from './Context';
import { regenerateToken } from './Credential';

function Firewall({ children }) {
  const { user } = React.useContext(AuthState);

  React.useEffect(() => {
    if(user != 0) {
      socket.auth = { user };
      socket.connect();
    }

    let interval = setInterval(() => {
      check()
    }, 1000 * 60 * 5); 
    // 1000ms * 60s * 5 = 5min

    return function cleanUp() {
      clearInterval(interval);
    }
  }, [user])

  const check = async () => {
    if(user != 0) {
      regenerateToken();
      console.log('regenerate')
    }
  }


  return <>{children}</>
}

export default Firewall