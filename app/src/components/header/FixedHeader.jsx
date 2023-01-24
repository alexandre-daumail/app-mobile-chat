import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, Pressable, Text, View } from 'react-native';

import styles from '../../style/style';


export default function FixedHeader(props) {
  const [icon, setIcon] = React.useState(null);
  const [iconColor, setIconColor] = React.useState('gray');
  const [focused, setFocused] = React.useState(false);

  const iconHandler = async () => {
    setFocused((elem) => !elem);

    if (focused) {
      setIconColor('tomato');
      setIcon(`${icon}-outline`)
    } else {
      setIconColor('gray');
      setIcon(icon)
    }
  };

  React.useEffect(() => {
    setIcon(props.iconName);
  })

  return (
    <View style={styles.header}>
      <TextInput
        style={props.iconName ? styles.headerInput : styles.headerInput100}
        autoCapitalize="none"
        placeholder={props.placeholder}
        placeholderTextColor="#aaa"
        onSubmitEditing={() => console.log('key pressed')}
      />
      {props.iconName && 
        <Pressable style={styles.headerCta} onPress={props.navigateTo}>
          <Text>
            <Ionicons
              name={icon}
              color={iconColor} 
              size={25}
            />
          </Text>
        </Pressable>
      }
    </View>
  )
}
