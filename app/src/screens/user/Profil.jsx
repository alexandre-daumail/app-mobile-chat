import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  Text, 
  Pressable, 
} from 'react-native';

import { secureRequest } from '../../security/Api';
import { getUserId } from '../../security/AsyncStorage';

import {  
  resetCredentials, 
  regenerateToken 
} from '../../security/Credential';

import styles from '../../style/style';

import { AuthState } from '../../security/Context';


const Profil = ({ navigation }) => {
  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null)
  const [createdAt, setCreatedAt] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);

  const { logout } = React.useContext(AuthState);

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  const userInformations = async () => {
    await secureRequest(
      `user/${user}`,
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') {
        setUserInfo(res.data);
        setCreatedAt(formatDate(res.data.created_at))
      }
    })
  }

  const disconnect = async () => {
    await resetCredentials()
    .then((res) => {
      console.log('user disconnected');
      return logout();
    })
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  React.useEffect(() => {
    userCredential();

    if(status == 'Error') {
      regenerateToken();
    } else if(status != 'Error') {
      userInformations();
    }

    /**
    * CLEAN STATE
    */
    const handleFocus = navigation.addListener('focus', () => {
      userInformations();
    });

    return handleFocus;
  }, [status, user])


  return (
    <SafeAreaView style={styles.screen}>
      {userInfo != null && 
        <View style={styles.whiteCard}>
          <Text style={styles.pressableWarning}>VOS INFORMATIONS</Text>
          <Text>Pseudo : {userInfo.username}</Text>
          <Text style={styles.pressableWarning}>Email : {userInfo.email}</Text>
          <Text>Inscription : le {createdAt}</Text> 
        </View>
      }

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarning}>Vous pouvez modifier votre nom d'utilisateur, prénom, nom et/ou email sous réserve que l'email ne soit pas déjà utilisée.</Text>
        <Pressable 
          style={styles.getPressable}
          onPress={() => navigation.navigate('ProfilUpdate', {
            name: 'Modifier vots informations',
            user_id: user,
          })}
        >
          <Text style={styles.deletePressableText}>Modifier vos informations</Text>
        </Pressable>
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarning}>Vous devrez vous reconnecter pour accéder à nouveau à vos conversations et groupes.</Text>
        <Pressable 
          style={styles.deletePressable}
          onPress={disconnect}
        >
          <Text style={styles.deletePressableText}>Deconnexion</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Profil