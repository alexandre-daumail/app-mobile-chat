import { getAccessToken } from "./AsyncStorage";


/**
 * Request without access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 */
const simpleRequest = async (path, method) => {  
  let result = null;

  await fetch("http://127.0.0.1:3001/api/" + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};

/**
 * Request without access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 * @param {*} content object value
 */
const simpleRequestContent = async (path, method, content) => {  
  let result = null;

  await fetch("http://127.0.0.1:3001/api/" + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};

/**
 * Request with access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 */
const secureRequest = async (path, method) => {  
  const access = await getAccessToken()
  let result = null;

  await fetch("http://127.0.0.1:3001/api/" + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
    }
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};

/**
 * Request with access token
 * @param {*} path endpoint URL
 * @param {*} method GET, POST, PUT or DELETE
 * @param {*} content object value
 */
const secureRequestContent = async (path, method, content) => {  
  const access = await getAccessToken()
  let result = null;

  await fetch("http://127.0.0.1:3001/api/" + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
    },
    body: JSON.stringify(content),
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};


export {
  simpleRequest,
  simpleRequestContent,
  secureRequest,
  secureRequestContent,
}