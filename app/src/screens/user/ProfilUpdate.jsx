import * as React from 'react';
import { 
  SafeAreaView,
  View,
} from 'react-native';

import {  
  secureRequest,
  secureRequestContent,
} from '../../security/Api';

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';

import KeyboardView from '../../components/keyboard/KeyboardView';
import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';
import BlackPressable from '../../components/button/BlackPressable';
import FormInput from '../../components/input/FormInput';

import styles from '../../style/style';


export default function ProfilUpdate({ route, navigation }) {
  const { user_id } = route.params;

  const [status, setStatus] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState({});

  const [username, onChangeUsername] = React.useState('');
  const [firstname, onChangeFirstname] = React.useState('');
  const [lastname, onChangeLastname] = React.useState('');
  const [email, onChangeEmail] = React.useState('');

  const userInformations = async () => {
    await secureRequest(
      `user/${user_id}`,
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') {
        setUserInfo({
          username: res.data.username,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
        })
      }
    })
  }

  const userChanges = async () => {
    let informations = {}

    if(username != '' && username != userInfo.username) {
      informations.username = username;
    }

    if(firstname != '' && firstname != userInfo.firstname) {
      informations.firstname = firstname;
    }

    if(lastname != '' && lastname != userInfo.lastname) {
      informations.lastname = lastname;
    }

    if(email != '' && email != userInfo.email) {
      informations.email = email;
    }

    return informations
  }

  const putUserInformations = async () => {
    await userChanges()
    .then((body) => {
      console.log(body)
      secureRequestContent(
        `user/${user_id}`,
        'PUT',
        body,
      )
      .then((res) => {
        setStatus(res.status);
        
        if(res.status = 'Success') return navigation.navigate('Profil');
      })
    })
  }

  React.useEffect(() => {
    userInformations();
  }, [status])
  

  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />

      <KeyboardView>
        <View style={styles.viewAuth}>
          <View style={styles.whiteCard}>
            <FormInput
              onChangeText={onChangeUsername}
              value={username != '' ? username : userInfo.username}
              placeholder={userInfo.username}
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeFirstname}
              value={firstname != '' ? firstname : userInfo.firstname}
              placeholder={userInfo.firstname}
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeLastname}
              value={lastname != '' ? lastname : userInfo.lastname}
              placeholder={userInfo.lastname}
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeEmail}
              value={email != '' ? email : userInfo.email}
              placeholder={userInfo.email}
              keyboardType="email-address"
            />

            <BlackPressable 
              title={'Enregister'}
              onPress={putUserInformations}
              text={'Enregister'}
            />
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}
