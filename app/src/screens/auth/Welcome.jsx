import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  Pressable,
  Text, 
  Image,
} from 'react-native';

import styles from '../../style/style';


export default function Welcome({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Image source={require('../../images/simplechat.png')}/>
      </View>
      <Text style={{textAlign:'center'}}>  Discutez et partagez tout simplement.</Text>

      <View style={styles.viewAuth}>
        <Pressable
          title={'Connexion'}
          onPress={() => navigation.navigate('Connexion')}
          style={styles.buttonMv2}
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