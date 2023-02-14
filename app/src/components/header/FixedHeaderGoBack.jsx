import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import styles from '../../style/style';


export default function FixedHeaderGoBack(props) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.headerCta} onPress={props.goBack}>
        <Text>
          <Ionicons
            name={'arrow-back'}
            color={'gray'} 
            size={25}
          />
        </Text>
      </Pressable>
    </View>
  )
}
