import * as React from 'react';
import { 
  SafeAreaView,
  View, 
} from 'react-native';

import { simpleRequestContent } from '../../security/Api';

import KeyboardView from '../../components/keyboard/KeyboardView';
import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';
import BlackPressable from '../../components/button/BlackPressable';
import FormInput from '../../components/input/FormInput';
import SecureInput from '../../components/input/SecureInput';

import styles from '../../style/style';


export default function Register({ navigation }) {
  const [username, onChangeUsername] = React.useState('');
  const [firstname, onChangeFirstname] = React.useState('');
  const [lastname, onChangeLastname] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const userRegister = async () => {
    if(username !='' && firstname !='' && lastname !='' && email != '' && password != ''){
      let user = {
        'username': username,
        'firstname': firstname,
        'lastname': lastname,
        'email': email,
        'password': password,
      }

      await simpleRequestContent('register', 'POST', user)
      .then((res) => {
        navigation.navigate('Connexion')
      })
    }
  }

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
              value={username}
              placeholder="Nom d'utilisateur"
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeFirstname}
              value={firstname}
              placeholder="Prénom"
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeLastname}
              value={lastname}
              placeholder="Nom"
              keyboardType="default"
            />

            <FormInput
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />

            <SecureInput 
              onChangeText={onChangePassword}
              value={password}
            />

            <BlackPressable 
              title={'Enregistrer'}
              onPress={userRegister}
              text={'Enregistrer'}
            />
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}
