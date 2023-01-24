import * as React from 'react'
import { 
  SafeAreaView,
  View, 
  Pressable, 
  Text, 
} from 'react-native';

import { secureRequestContent } from '../../security/Api';

import { getUserId } from '../../security/AsyncStorage';
import { regenerateToken } from '../../security/Credential';

import FixedHeaderGoBack from '../../components/header/FixedHeaderGoBack';
import BlackPressable from '../../components/button/BlackPressable';
import FormInput from '../../components/input/FormInput';

import styles from '../../style/style';


const ChannelCreate = ({ navigation }) => {
  const [user, setUser] = React.useState(0);
  
  const [status, setStatus] = React.useState(null);
  const [name, setName] = React.useState('');
  const [privacy, setPrivacy] = React.useState(false);

  const userCredential = async () => {
    await getUserId()
    .then((res) => setUser(res))
  }

  const handlePrivacy = async () => {
    setPrivacy(!privacy);
  }

  const createChannel = async () => {
    if(name != ''){
      let newChannel = {
        'name': name,
        'private': privacy,
      }

      await secureRequestContent(
        `user/${user}/channel`, 
        'POST',
        newChannel,
      )
      .then((res) => {
        setStatus(res.status)
        if(res.status != 'Error') {
          navigation.navigate('ChannelUsers', {
            id: res.data.id,
            name: res.data.name,
          })
        }
      });
    }
  }

  React.useEffect(() => {
    userCredential();

    if(status == 'Error') {
      regenerateToken();
    } 
  })


  return (
    <SafeAreaView style={styles.screen}>
      <FixedHeaderGoBack 
        goBack={() => navigation.goBack()}
      />

      <View style={styles.view90paddingVertical}>
        <Text style={styles.title}>Vous pouvez créer un groupe depuis cette page.</Text>
        <Text style={styles.title}>1. Veuillez renseigner le nom que portera votre groupe. Celui-ci sera ensuite éditable si besoin.</Text>
        <Text style={styles.title}>2. Veuillez indiquer si votre groupe est visible par tous les utilisateurs ou non.</Text>
      </View>
      <View style={styles.whiteCard}>
        <Text style={styles.selfAlignItem}>Nom de votre groupe :</Text>
        <FormInput
          onChangeText={setName}
          value={name}
          placeholder={'Saisir ici ...'}
          keyboardType="default"
        />

        <View style={styles.flexRowBetween}>
          <Text>Cochez cette case si vous souhaitez que votre groupe soit en privé :</Text>
          <Pressable 
            style={privacy ? styles.checkboxChecked : styles.checkbox}
            onPress={() => handlePrivacy()}
          />
        </View>

        <BlackPressable 
          title={'Enregistrer'}
          onPress={createChannel}
          text={'Enregistrer'}
        />
      </View>
    </SafeAreaView>
  )
}

export default ChannelCreate