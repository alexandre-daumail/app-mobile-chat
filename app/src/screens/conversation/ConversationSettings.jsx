import * as React from 'react';
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Pressable, 
  Text, 
} from 'react-native';

import { 
  secureRequest,
  secureRequestContent,
} from '../../security/Api';

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';

import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';

import styles from '../../style/style';


const ConversationSettings = ({ route, navigation }) => {
  const { id } = route.params;
  const { name } = route.params;
  const { user_id } = route.params;

  const [status, setStatus] = React.useState(null)
  const [blockedValue, setBlockedValue] = React.useState(null);

  const getBlockedStatus = async () => {
    await secureRequest(
      `user/${user_id}/conversation/${id}/blocked`,
      'GET',
    )
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setBlockedValue(res.data)
      }
    });
  }

  const updateBlockedStatus = async (value) => {
    let blocked = {
      blocked : value
    }

    await secureRequestContent(
      `user/${user_id}/conversation/${id}`,
      'PUT',
      blocked,
    )
    .then((res) => {
      if(res.status != 'Error') {
        console.log(res.data.blocked)
      }
    });
  }

  const handleBlocked = async () => {
    if(blockedValue) {
      setBlockedValue(false)
      await updateBlockedStatus(false); 
    } else {
      setBlockedValue(true)
      await updateBlockedStatus(true); 
    }
  }

  const deleteConversation = async () => {
    await secureRequestContent(
      `user/${user_id}/conversation/${id}`,
      'DELETE',
    )
    .then((res) => {
      if(res.status == 'Success') {
        navigation.navigate('Conversations')
      }
    });
  }

  React.useEffect(() => {
    if(status == 'Error') {
      regenerateToken();
    } else if(status != 'Error') {
      getBlockedStatus();
    }

    /**
    * CLEAN STATE
    */
    const handleFocus = navigation.addListener('focus', () => {
      getBlockedStatus();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarning}>Cochez cette case si vous souhaitez bloquer l'utilisateur.</Text> 
        <Text style={styles.pressableWarning}>Vous pourrez consulter les messages envoyés mais ni vous, ni l'utilisateur bloqué ne pourra écrire de nouveau message.</Text>
        <Text style={styles.pressableWarning}>Vous pouvez à tout moment débloquer l'utilisateur et échanger à nouveau des messages.</Text>

        {blockedValue != null && 
          <View style={styles.toggleCheckoxWrapper}>
            <Pressable 
              style={blockedValue ? styles.checkboxChecked : styles.checkbox}
              onPress={() => handleBlocked()}
            />
            <Text style={blockedValue ? styles.toggleCheckboxTextBold : styles.toggleCheckboxText}>
            {blockedValue ? 'Bloqué' : 'Non bloqué'}
            </Text>
          </View>
        }
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarningBold}>Attention, cette action est irréversible.</Text> 
        <Text style={styles.pressableWarning}>Votre conversation sera définitivement supprimée, tout comme les messages échangés par entre vous et l'utilisateur.</Text>
        <Pressable 
          style={styles.deletePressable}
          onPress={() => deleteConversation()}
        >
          <Text style={styles.deletePressableText}>Supprimer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default ConversationSettings