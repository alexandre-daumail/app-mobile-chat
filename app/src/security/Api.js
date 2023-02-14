import { getAccessToken } from "./AsyncStorage";

const api = "http://10.10.24.16:3001/api/"
/**
 * Request without access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 */
const simpleRequest = async (path, method) => {  
  return fetch(api + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((data) => {
    return data
  });
};

/**
 * Request without access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 * @param {*} content object value
 */
const simpleRequestContent = async (path, method, content) => {
  try {
    const response = await fetch(api + path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
/**
 * Request with access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 */
const secureRequest = async (path, method) => {
  try {
    const access = await getAccessToken();
    const response = await fetch(api + path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // handle the error
    console.error(error);
  }
};
/**
 * Request with access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 * @param {*} content object value
 */
const secureRequestContent = async (path, method, content) => {  
try {
    const access = await getAccessToken();
  
    fetch(api + path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`,
      },
      body: JSON.stringify(content),
    })
    const data = await response.json();
    return data;
} catch (error) {
  console.error(error);

}};


export {
  simpleRequest,
  simpleRequestContent,
  secureRequest,
  secureRequestContent,
}