import * as React from 'react';
import { 
  View, 
  Pressable, 
  Text, 
} from 'react-native';

import { secureRequest } from '../../security/Api';
import { AuthState } from '../../security/Context';

import styles from '../../style/style';
import socket from '../../utils/socket';


/**
 * @param {*} channel List of public channels returned by request
 * @param {*} navigation Usefull for navigate method
 */
export default function PublicChannel({ channel, navigation }) {

  const { user } = React.useContext(AuthState);

  const postJoinChannel = async (id) => {
    await secureRequest(
      `user/${user}/channel/${id}`, 
      'POST',
    )
    .then((res) => {
      navigation.navigate('Channel', {
        id: id,
      })
    })
  }

  return (
    <View key={channel.id}>
      <Pressable 
        style={styles.horizontalItemGroupe}
        title={channel.id} 
        onPress={() =>  postJoinChannel(channel.id)}
      > 
        <Text style={styles.horizontalItemTextGroupe}>
        {channel.name}
        </Text>
      </Pressable>
    </View>
  )
}