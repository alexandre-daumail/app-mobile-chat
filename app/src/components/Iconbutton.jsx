import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';

import styles from '../style/style';


/**
 * @param iconName Ionicon icon name
 * @param title Pressable title
 * @param onPress Pressable onPress
 */
export default function IconButton(props) {
  const [icon, setIcon] = React.useState(null);

  React.useEffect(() => {
    setIcon(props.iconName);
  })

  return (
    <Pressable
      style={styles.keyboardBtn}
      title={props.title}
      onPress={props.onPress}
    >
      <Ionicons
        name={icon}
        color={'white'} 
        size={20}
      />
    </Pressable>
  )
}