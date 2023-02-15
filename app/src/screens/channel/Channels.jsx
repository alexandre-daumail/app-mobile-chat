import * as React from 'react';
import { 
  SafeAreaView,
  View, 
  FlatList,
  TextInput, 
  Pressable, 
  Text,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { 
  simpleRequest,
  secureRequest,
} from '../../security/Api';

import UserChannels from '../../components/flatlist/UserChannels';

import styles from '../../style/style';
import PublicChannel from '../../components/flatlist/PublicChannel';
import { AuthState } from '../../security/Context';
import socket from '../../utils/socket';


const Channels = ({ navigation }) => {
  const { user } = React.useContext(AuthState);

  const [status, setStatus] = React.useState(null)
  const [channelList, setChannelList] = React.useState(null);
  const [channels, setChannels] = React.useState(null);


  const getAllChannels = async () => {
    await simpleRequest(
      'channels', 
      'GET',
    )
    .then((res) => {
      setStatus(res.status);

      if(res.status != 'Error') setChannelList(res.data);
    });
  }

  const getChannels = async () => {
    await secureRequest(
      `user/${user}/channels`, 
      'GET',
    )
    .then((res) => {
      setStatus(res.status);
    
      if(res.status != 'Error') setChannels(res.data);
    });
  }

  // React.useEffect(() => {
  //   let interval = setInterval(() => {
  //     getChannels()
  //   }, 1000 * 10); 

  //   return function cleanUp() {
  //     clearInterval(interval);
  //   }
  // })

  // React.useEffect(() => {
  //   socket.on("userChannelList", (res) => {
  //     setChannels(res);
  //   });

  //   socket.on('updated-channel', (res) => {
  //     setChannels(res);
  //   })
  // });

  React.useEffect(() => {
    getAllChannels();
    getChannels();

    const handleFocus = navigation.addListener('focus', () => {
      getAllChannels();
      getChannels();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TextInput
          style={styles.headerInput}
          autoCapitalize="none"
          placeholder={'Rechercher un groupe..'}
          placeholderTextColor="#aaa"
          onSubmitEditing={() => console.log('key pressed')}
        />
        <Pressable 
          style={styles.headerCta} 
          onPress={() => navigation.navigate('NewChannel')}
        >
          <Text>
            <Ionicons
              name={'pencil'}
              color={'gray'} 
              size={25}
            />
          </Text>
        </Pressable>
      </View>

      <View style={styles.horizontalWrapper}>
        <FlatList
          data={channelList}
          renderItem={({item}) => <PublicChannel channel={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          extraData={[navigation]}
          horizontal={true}
        />
      </View>

      <View style={styles.viewChat}>
        <FlatList
          data={channels}
          renderItem={({item}) => <UserChannels channel={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          extraData={[navigation]}
        />
      </View>
    </SafeAreaView>
  )
}


export default Channels