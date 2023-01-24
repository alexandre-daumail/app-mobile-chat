import * as React from 'react';
import { 
  Pressable, 
  Text, 
  Alert, 
  View 
} from 'react-native';

import { secureRequest } from '../../security/Api';

import styles from '../../style/style';


/**
 * @param {*} conversation List of conversation messages returned by request
 * @param {*} user Connected user ID 
 * @param {*} id Conversation ID
 * @param {*} onPress Function for re-render
 */
export default function ConversationMessages({ conversation, user, id, onPress }) {

  const deleteMessage = async (msg_id) => {
    await secureRequest(
      `user/${user}/conversation/${JSON.stringify(id)}/message/${msg_id}`,
      'DELETE',
    )
    .then((res) => {
      Alert.alert('Message supprimé')

      if(res.status == 'Success') onPress();
    })
  }

  return (
    <View key={conversation.id} style={styles.viewMessages}>
      <View style={styles.chatFromWrapper}>
        {conversation.user_id_from != user &&
          <View style={styles.chatBubble}>
            <Text style={styles.whiteText}>{conversation.id_from.firstname[0]}{conversation.id_from.lastname[0]}</Text>
          </View>
        }
        <Pressable 
          style={conversation.user_id_from == user ? styles.chatBubbleFrom : styles.chatBubbleTo}
          title={id} 
          onLongPress={() => { Alert.alert(
            "",
            "Souhaitez vous supprimer ce message ?",
            [
              { text: "Annuler", onPress: () => console.log("Annuler Pressed" + conversation.id)},
              { text: "Supprimer", onPress: () => deleteMessage(conversation.id)}
            ]
          )}}
        >
          <Text style={styles.chatBubbletext}>{conversation.message}</Text>
        </Pressable>
      </View>
    </View>
  )
}
