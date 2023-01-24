import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

import styles from '../../style/style';


export default function HeaderChat(props) {
  const [icon, setIcon] = React.useState(null);
  const [iconColor, setIconColor] = React.useState('gray');

  React.useEffect(() => {
    setIcon(props.iconName);
  })

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

    <Text>{props.title}</Text>

    <Pressable style={styles.headerCta} onPress={props.navigateTo}>
      <Text>
        <Ionicons
          name={icon}
          color={iconColor} 
          size={25}
        />
      </Text>
    </Pressable>
  </View>
  )
}