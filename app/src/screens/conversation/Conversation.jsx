import * as React from 'react';
import { 
  SafeAreaView, 
  View,
  FlatList,
  Alert,
} from 'react-native';

import { 
  secureRequest,
  secureRequestContent,
} from '../../security/Api';

import HeaderChat from '../../components/header/HeaderChat';
import KeyboardView from '../../components/keyboard/KeyboardView';
import ConversationMessages from '../../components/flatlist/ConversationMessages';
import FormInput from '../../components/input/FormInput';
import IconButton from '../../components/Iconbutton';

import styles from '../../style/style';
import { AuthState } from '../../security/Context';


const Conversation = ({ route, navigation })  => {
  const { id } = route.params;
  const { name } = route.params;

  const { user } = React.useContext(AuthState);
  const [status, setStatus] = React.useState(null)
  const [conversation, setConversation] = React.useState(null);

  const [message, onChangeMessage] = React.useState('');


  const getMessages = async () => {
    await secureRequest(
      `user/${user}/conversation/${id}/message`,
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setConversation(res.data.messages);
    });
  }

  const postMessage = async () => {
    if(user != 0 && message != ''){
      let msg = {
        'message': message,
      }
      
      await secureRequestContent(
        `user/${user}/conversation/${id}/message`,
        'POST',
        msg,
      )
      .then((res) => {
        if(res.status == 'Blocked') {
          Alert.alert('Votre conversation est bloqué, vous ne pouvez plus rédiger de message.')
        }
        
        onChangeMessage('');
        getMessages();
      })
    }
  }

  React.useEffect(() => {
    getMessages();

    const handleFocus = navigation.addListener('focus', () => {
      getMessages();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <HeaderChat
        iconName={'settings-outline'}
        title={name}
        navigateTo={() => {
          navigation.navigate('ConversationSettings', {
            id: id,
            name: name,
            user_id: user,
          })
        }}
        goBack={() => navigation.goBack()}
      />

      <KeyboardView>
        <FlatList
          data={conversation}
          renderItem={({item}) => <ConversationMessages conversation={item} id={id} onPress={getMessages} />}
          keyExtractor={item => item.id}
          extraData={[id, getMessages]}
          contentContainerStyle={styles.flatlistWrapper}
        />

        <View style={styles.keyboardWrapper}>
          <FormInput 
            style={styles.keyboardInput}
            onChangeText={onChangeMessage}
            value={message}
            placeholder="Saisir quelque chose .."
            keyboardType="default"
            lines={3}
          />
          <IconButton 
            title={'Envoyer'}
            onPress={postMessage}
            iconName={'send'}
          />
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}


export default Conversation