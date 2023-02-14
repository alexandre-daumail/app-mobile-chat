import { 
  getAccessToken, 
  getRefreshToken, 
  getUserId, 
  setAccessToken, 
  setRefreshToken, 
  setUserId,
  removeStorage,
} from './AsyncStorage';


/**
 * SET AsyncStorage values
 * @param {*} access 
 * @param {*} refresh 
 * @param {*} user 
 */
const setCredentials = async (access, refresh, user) => {
  await setAccessToken(access);
  await setRefreshToken(refresh);
  await setUserId(user);
}

/**
 * GET AsyncStorage values
 * @returns array { access, refresh, user }
 */
const getCredentials = async () => {
  const access = await getAccessToken();
  const refresh = await getRefreshToken();
  const user = await getUserId();

  return {
    access: access,
    refresh: refresh,
    user: user,
  }
}

/**
 * DELETE AsyncStorage values
 */
const resetCredentials = async () => {
  await removeStorage('access_token');
  await removeStorage('refresh_token');
  await removeStorage('user_id');
}

/**
 * POST
 * regenerateToken and add new values in AsyncStorage
 */
const regenerateToken = async () => {  
  const refresh = await getRefreshToken();

  await fetch("http://127.0.0.1:3001/api/refreshtoken", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refresh}`,
    }
  })
  .then(response => response.json())
  .then((data) => {
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
  });
};


export {
  setCredentials,
  getCredentials,
  resetCredentials,
  regenerateToken,
} 

