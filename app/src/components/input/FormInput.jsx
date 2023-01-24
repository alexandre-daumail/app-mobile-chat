import * as React from 'react';
import { TextInput } from 'react-native';

import styles from '../../style/style';


/**
 * @param {*} style CSS (default = styles.input) 
 * @param {*} onChangeText TextInput tag onChangeText method
 * @param {*} value TextInput tag value
 * @param {*} placeholder TextInput tag placeholder
 * @param {*} keyboardType TextInput tag keyboardType
 * @param {*} lines TextInput tag numberOfLines (default = 1)
 */
export default function FormInput(props) {
  return (
    <TextInput
      style={props.style ? props.style : styles.input}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      autoCapitalize="none"
      placeholderTextColor="#aaa"
      multiline={props.lines ? true : false}
      numberOfLines={props.lines ? props.lines : 1}
    />
  )
}