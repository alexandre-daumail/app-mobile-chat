import * as React from 'react';
import { 
  SafeAreaView,
  View, 
} from 'react-native';

import { simpleRequestContent } from '../../security/Api';
import { setLogged } from '../../security/AsyncStorage';
import { setCredentials } from '../../security/Credential';

import KeyboardView from '../../components/keyboard/KeyboardView';
import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';
import BlackPressable from '../../components/button/BlackPressable';
import FormInput from '../../components/input/FormInput';
import SecureInput from '../../components/input/SecureInput';

import styles from '../../style/style';

import { AuthState } from '../../security/Context';


export default function Login({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const { login } = React.useContext(AuthState);

  const userLogin = async () => {
    if(email != '' && password != ''){
      let user = {
        'email': email,
        'password': password,
      }

      await simpleRequestContent('login', 'POST', user)
      .then((res) => {
        setCredentials(
          res.data.access_token, 
          res.data.refresh_token, 
          res.data.user_id
        )
      })
      .then((res) => {
        return login()
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
              title={'Connexion'}
              onPress={userLogin}
              text={'Connexion'}
            />
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}
