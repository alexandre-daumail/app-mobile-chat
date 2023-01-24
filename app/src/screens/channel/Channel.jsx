import * as React from 'react';
import { 
  SafeAreaView, 
  View,
  FlatList,
} from 'react-native';

import { 
  secureGetRequest, 
  securePostRequest,
  secureRequest,
  secureRequestContent,
} from '../../security/Api';

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';

import HeaderChat from '../../components/header/HeaderChat';
import KeyboardView from '../../components/keyboard/KeyboardView';
import ChannelMessages from '../../components/flatlist/ChannelMessages'
import FormInput from '../../components/input/FormInput';
import IconButton from '../../components/Iconbutton';

import styles from '../../style/style';


const Channel = ({ route, navigation }) => {
  const { id } = route.params;
  const { name } = route.params;

  const [user, setUser] = React.useState(0);

  const [status, setStatus] = React.useState(null);
  const [channel, setChannel] = React.useState(null);
  const [message, onChangeMessage] = React.useState('');

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  const getMessages = async () => {
    await secureRequest(
      `channel/${id}`, 
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setChannel(res.data.messages);
    });
  }

  const postMessage = async () => {
    if(message != ''){
      let msg = {
        'message': message,
      }

      await secureRequestContent(
        `user/${user}/channel/${id}/message`,
        'POST',
        msg,
      )
      .then((res) => {
        onChangeMessage('');
        getMessages();
      })
    }
  }

  React.useEffect(() => {
    userCredential();

    if(status == 'Error') {
      regenerateToken();
    } else if(status != 'Error') {
      getMessages();
    }

    /**
    * CLEAN STATE
    */
    const handleFocus = navigation.addListener('focus', () => {
      userCredential();
      getMessages();
    });

    return handleFocus;
  }, [status, user])
  

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderChat 
        iconName={'settings-outline'}
        title={name}
        navigateTo={() => {
          navigation.navigate('ChannelSettings', {
            id: id,
            name: name,
          })
        }}
        goBack={() => navigation.navigate('Channels')}
      />

      <KeyboardView>
        <FlatList
          data={channel}
          renderItem={({item}) => <ChannelMessages channel={item} user={user} id={id} onPress={getMessages} />}
          keyExtractor={item => item.id}
          extraData={[user, id, getMessages]}
          scrollToEnd
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


export default Channel