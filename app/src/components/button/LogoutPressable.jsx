import * as React from 'react';
import { 
  Text, 
  Pressable, 
} from 'react-native';

import { AuthState } from '../../security/Context';
import { resetCredentials } from '../../security/Credential';

import styles from '../../style/style';


function LogoutPressable() {
  const { setUser } = React.useContext(AuthState);

  const disconnect = async () => {
    await resetCredentials()
    .then((res) => {
      console.log('user disconnected');
      return setUser(0);
    })
  };

  return (
    <Pressable 
      style={styles.deletePressable}
      onPress={disconnect}
    >
      <Text style={styles.deletePressableText}>Deconnexion</Text>
    </Pressable>
  )
}

export default LogoutPressable