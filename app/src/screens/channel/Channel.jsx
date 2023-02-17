import * as React from 'react';
import { 
  SafeAreaView, 
  View,
  FlatList,
} from 'react-native';

import { 
  secureRequest,
  secureRequestContent,
} from '../../security/Api';

import HeaderChat from '../../components/header/HeaderChat';
import KeyboardView from '../../components/keyboard/KeyboardView';
import ChannelMessages from '../../components/flatlist/ChannelMessages'
import FormInput from '../../components/input/FormInput';
import IconButton from '../../components/Iconbutton';

import styles from '../../style/style';
import { AuthState } from '../../security/Context';
import socket from '../../utils/socket';


const Channel = ({ route, navigation }) => {
  const { id } = route.params;
  const { name } = route.params;

  const { user } = React.useContext(AuthState);

  const [status, setStatus] = React.useState(null);
  const [channel, setChannel] = React.useState(null);
  const [message, onChangeMessage] = React.useState('');


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
    if(user != 0 && message != ''){
      let msg = {
        'message': message,
      }

      await secureRequestContent(
        `user/${user}/channel/${id}/message`,
        'POST',
        msg,
      )
      .then((res) => {
        socket.emit("get-channel-msg", id);
        onChangeMessage('');
        getMessages();
      })
    }
  }


  React.useEffect(() => {
    socket.on('channelMsg', (res) => {
      setChannel(res);
    })
  }, [socket]);


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
          renderItem={({item}) => <ChannelMessages channel={item} id={id} onPress={getMessages} />}
          keyExtractor={item => item.id}
          extraData={[id, getMessages]}
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