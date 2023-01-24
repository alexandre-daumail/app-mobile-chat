import * as React from 'react';
import { 
  View, 
  Pressable, 
  Text, 
} from 'react-native';

import { secureRequest } from '../../security/Api';

import styles from '../../style/style';


/**
 * @param {*} channel List of public channels returned by request
 * @param {*} user Connected user ID 
 * @param {*} navigation Usefull for navigate method
 */
export default function PublicChannel({ channel, user, navigation }) {

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