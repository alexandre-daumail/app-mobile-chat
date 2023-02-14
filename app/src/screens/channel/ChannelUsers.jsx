import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
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
} from '../../security/Api';

import styles from '../../style/style';
import HeaderChat from '../../components/header/HeaderChat';
import { AuthState } from '../../security/Context';


const ChannelUsers = ({ route, navigation }) => {
  const { id } = route.params;
  const { name } = route.params;

  const { user } = React.useContext(AuthState);

  const [status, setStatus] = React.useState(null);
  const [userList, setUserList] = React.useState(null);
  const [addedUsers, setAddedUsers] = React.useState(null);


  const getUserInChannel = async () => {
    await simpleRequest(
      `channel/${id}/users`,
      'GET',
    )
    .then((res) => {
      if(res.status != 'Error') {
        setAddedUsers(res.data);
      }
    });
  }

  const getAllUsers = async () => {
    await simpleRequest(
      `channel/${id}/users-not-in`,
      'GET',
    )
    .then((res) => {
      setStatus(res.status)
      if(res.status != 'Error') {
        setUserList(res.data); 
      } 
    });
  }

  const addUser = async (userToAdd) => {
    if(user != 0) {
      await secureRequest(
        `user/${user}/channel/${id}/add/${userToAdd}`,
        'POST'
      )
      .then((res) => {
        getUserInChannel();
        getAllUsers();
      })
    }
  }

  const removeUser = async (userToRemove) => {
    if(user != 0) {
      await secureRequest(
        `user/${user}/channel/${id}/remove/${userToRemove}`,
        'DELETE'
      )
      .then((res) => {
        getUserInChannel();
        getAllUsers();
      })
    }
  }


  React.useEffect(() => {
    getUserInChannel();
    getAllUsers();
    
    const handleFocus = navigation.addListener('focus', () => {
      getUserInChannel();
      getAllUsers();
    });

    return handleFocus;
  }, [status])


  return (
    <SafeAreaView style={styles.screen}>
      <HeaderChat
        iconName={'checkmark-outline'}
        title={'Liste des membres'}
        navigateTo={() => {
          navigation.navigate('Channel', {
            id: id,
            name: name,
          })
        }}
        goBack={() => navigation.goBack()}
      />
    
      <ScrollView style={styles.viewMessages}>
        <View style={{ marginBottom:40 }}>
          {addedUsers != null && 
          <ScrollView style={{flexDirection: 'column'}}>
            <Text style={styles.title}>Membres :</Text>
            {addedUsers.map((u, index) => {
              return (
                <View key={index}>
                  {u.User.id != user &&
                    <View style={styles.chatBtn}>
                      <View style={styles.horizontalItemImg}></View>
                      <Text style={styles.chatText}>
                      {u.User.firstname} {u.User.lastname}</Text>
                      <Pressable 
                        style={styles.addOrRemoveBtn}
                        title={u.User.firstname} 
                        onPress={() => removeUser(u.User.id)}
                      >
                        <Ionicons 
                          name={'close'}
                          color={'gray'} 
                          size={20}
                        />
                      </Pressable>
                    </View>
                  }
                </View>
              )
            })}
          </ScrollView>
          }
        </View>

        {userList != null && 
          <ScrollView style={{flexDirection: 'column'}}>
            <Text style={styles.title}>Utilisateurs qui pourraient rejoindre votre groupe :</Text>
            {userList.map((u, index) => {
              return (
                <View key={index}>
                  {u.id != user && 
                    <View style={styles.chatBtn}>
                      <View style={styles.horizontalItemImg}></View>
                      <Text style={styles.chatText}>{u.firstname} {u.lastname}</Text>
                      <Pressable 
                        style={styles.addOrRemoveBtn}
                        title={u.firstname} 
                        onPress={() => addUser(u.id)}
                      >
                        <Ionicons 
                          name={'add'}
                          color={'gray'} 
                          size={20}
                        />
                      </Pressable>
                    </View>
                  }
                </View>
              )
            })}
          </ScrollView>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChannelUsers
