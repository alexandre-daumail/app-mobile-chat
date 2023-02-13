import React, { useEffect } from 'react';
import { getUserId } from './AsyncStorage';
import { regenerateToken } from './Credential';

function Firewall({ children }) {
  const [user, setUser] = React.useState(0);

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  useEffect(() => {
    userCredential();

    let interval = setInterval(() => {
        check()
    }, 1000 * 60 * 5); // 5min : 1000ms * 60 = 60s * 5

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


  return (
    <>
      {children}
    </>
  )
}

export default Firewall