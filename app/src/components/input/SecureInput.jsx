import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, Pressable, Text, View } from 'react-native';

import styles from '../../style/style';


/**
 * SecureInput is used for password entry only.
 * On click on the icon, toggle visibility (show / hidden)
 * @param {*} onChangeText TextInput tag onChangeText method
 * @param {*} value TextInput tag value
 */
export default function SecureInput(props) {
  const [isPasswordSecure, setIsPasswordSecure] = React.useState(true);

  return (
    <View style={styles.passwordInput}>
      <TextInput
        style={styles.passwordText}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder="Mot de passe"
        keyboardType="default"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        secureTextEntry={isPasswordSecure}
      />
      <Pressable 
        style={styles.passwordEye}
        onPress={() => { 
          isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) 
        }}
      >
        <Text>
          <Ionicons 
            name={isPasswordSecure ? 'eye-outline' : 'eye-off-outline'} 
            size={20} 
            color={'black'} 
          />
        </Text>
      </Pressable>
    </View>
  )
}