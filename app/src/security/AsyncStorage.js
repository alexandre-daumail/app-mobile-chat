import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * 
 * @param {*} value 
 */
const setAccessToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('access_token', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * 
 * @returns access_token
 */
const getAccessToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('access_token')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

/**
 * 
 * @param {*} value 
 */
const setRefreshToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('refresh_token', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * 
 * @returns refresh_token
 */
const getRefreshToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('refresh_token')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

/**
 * 
 * @param {*} value 
 */
const setUserId = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user_id', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * 
 * @returns user_id
 */
const getUserId = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_id')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

/**
 * 
 * @param {*} key 
 * @param {*} value 
 */
const setStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * 
 * @param {*} key 
 * @returns 
 */
const getStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

/**
 * 
 * @param {*} key 
 */
const removeStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log(e);
  }
}


export {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setUserId,
  getUserId,
  setStorage,
  getStorage,
  removeStorage,
}