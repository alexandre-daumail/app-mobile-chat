import * as React from 'react';
import { 
  Pressable, 
  Text, 
  Alert, 
  View 
} from 'react-native';

import { secureRequest } from '../../security/Api';
import { AuthState } from '../../security/Context';

import styles from '../../style/style';
import socket from '../../utils/socket';


/**
 * @param {*} channel List of channel messages returned by request
 * @param {*} id Channel ID
 * @param {*} onPress Function for re-render
 */
export default function ChannelMessages({ channel, id, onPress }) {

  const { user } = React.useContext(AuthState);

  const deleteMessage = async (msg_id) => {
    await secureRequest(
      `user/${user}/channel/${id}/message/${msg_id}`,
      'DELETE',
    )
    .then((res) => {
      socket.emit("get-channel-msg", id);
      Alert.alert('Message supprimé');

      if(res.status == 'Success') onPress();
    })
  }

  return (
    <View key={channel.id} style={styles.viewMessages}>
      <View style={styles.chatFromWrapper}>
        {channel.user_id != user && 
          <View style={styles.chatBubble}>
            <Text style={styles.whiteText}>{channel.User.firstname[0]}{channel.User.lastname[0]}</Text>
          </View>
        }
        <Pressable 
          style={channel.user_id == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
          title={channel.id} 
          onLongPress={() => { Alert.alert(
            "",
            "Souhaitez vous supprimer ce message ?",
            [
              { text: "Annuler", onPress: () => console.log("Annuler Pressed")},
              { text: "Supprimer", onPress: () => deleteMessage(channel.id)}
            ]
          )}}>
          <Text style={styles.chatBubbletext}>{channel.message}</Text>
        </Pressable>
      </View>
    </View>
  )
}