import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  Pressable,
  Text,
} from 'react-native';

import { simpleRequestContent } from '../../security/Api';
import { setCredentials } from '../../security/Credential';

import KeyboardView from '../../components/keyboard/KeyboardView';
import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';
import FormInput from '../../components/input/FormInput';
import SecureInput from '../../components/input/SecureInput';

import styles from '../../style/style';

import { AuthState } from '../../security/Context';


export default function Login({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const { setUser } = React.useContext(AuthState);

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
        setUser(res.data.user_id)
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

            <Pressable
              title={'Connexion'}
              onPress={() => userLogin()}
              style={styles.buttonMv2}
            >
              <Text style={styles.blackBtnText}>Connexion</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}
