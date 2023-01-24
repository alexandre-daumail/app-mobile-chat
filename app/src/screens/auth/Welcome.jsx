import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  Pressable,
  Text, 
} from 'react-native';

import styles from '../../style/style';


export default function Welcome({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.viewAuth}>
        <Pressable
          title={'Connexion'}
          onPress={() => navigation.navigate('Connexion')}
          style={styles.buttonMv}
        >
          <Text style={styles.blackBtnText}>Connexion</Text>
        </Pressable>

        <Pressable
          title={'Inscription'}
          onPress={() => navigation.navigate('Inscription')}
          style={styles.buttonMv}
        >
          <Text style={styles.blackBtnText}>Inscription</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}