import * as React from 'react';
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Pressable, 
  Text, 
  Alert 
} from 'react-native';

import { 
  simpleRequest,
  secureRequest,
  secureRequestContent,
} from '../../security/Api';

import FormInput from '../../components/input/FormInput';
import BlackPressable from '../../components/button/BlackPressable';
import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';

import styles from '../../style/style';
import { AuthState } from '../../security/Context';
import socket from '../../utils/socket';


export default function ChannelSettings({ route, navigation }) {
  const { id } = route.params;
  const { name } = route.params;

  const { user } = React.useContext(AuthState);

  const [status, setStatus] = React.useState(null);
  const [channelInfo, setChannelInfo] = React.useState(null);
  const [channelName, onChangeName] = React.useState('');
  const [channelDate, setChannelDate] = React.useState(null);

  const getChannelInformations = async () => {
    await simpleRequest(
      `channel/${id}/info`, 
      'GET',
    )
    .then((res) => {
      setStatus(res.status);
      if(res.status != 'Error') {
        setChannelInfo(res.data);
        setChannelDate(formatDate(res.data.channel.created_at))
      }
    });
  }

  const updateChannelName = async () => {
    if(user != 0 && channelName != '') {
      let newName = {
        name: channelName,
      }

      await secureRequestContent(
        `user/${user}/channel/${id}`,
        'PUT',
        newName,
      )
      .then((res) => {
        setStatus(res.status);
      });
    }
  }

  const deleteChannel = async () => {
    if(user != 0) {
      await secureRequest(
        `user/${user}/channel/${id}`,
        'DELETE',
      )
      .then((res) => {
        if(res.status == 'Success') {
          socket.emit("get-public-channel");
          socket.emit("get-user-channel", user);

          navigation.navigate('Channels')
        } else {
          Alert.alert(res.message)
        }
      });
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }


  React.useEffect(() => {
    getChannelInformations();

    const handleFocus = navigation.addListener('focus', () => {
      getChannelInformations();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />
      <ScrollView>
      {channelInfo != null &&
        <View style={styles.whiteCard}>
          <Text>Le groupe "{channelInfo.channel.name}" à été créée par {channelInfo.creator.firstname} {channelInfo.creator.lastname} le {channelDate}.</Text>
        </View>
      }

      {channelInfo != null &&
        <View style={styles.whiteCard}>
          <Text>Changer le nom du groupe</Text>
          <FormInput
            onChangeText={onChangeName}
            value={channelName != '' ? channelName : channelInfo.channel.name}
            placeholder={channelInfo.channel.name}
            keyboardType="default"
          />
          <BlackPressable 
            title={'Enregistrer'}
            onPress={updateChannelName}
            text={'Enregistrer'}
          />
        </View>
      }

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarning}>Vous pouvez consulter la liste des membres présents dans votre groupe. Vous pourrez ainsi en ajouter et/ou en supprimer.</Text>
        <Pressable
          style={styles.getPressable}
          onPress={() => navigation.navigate('ChannelUsers', {
            id: id,
            name: name,
        })}>
          <Text style={styles.deletePressableText}>Voir les membres</Text>
        </Pressable>
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.pressableWarningBold}>Attention, cette action est irréversible.</Text> 
        <Text style={styles.pressableWarning}>Le groupe sera définitivement supprimé, tout comme les messages échangés par ses membres...</Text>
        <Pressable 
          style={styles.deletePressable}
          onPress={() => deleteChannel()}
        >
          <Text style={styles.deletePressableText}>Supprimer le groupe</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}