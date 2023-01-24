import * as React from 'react';


const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

const AuthState = React.createContext();

// const [state, dispatch] = React.useReducer(AuthReducer, AUTH_STATE);
// const authContext = {
//   ...state,
//   login: () => dispatch({ type: "LOGIN" }),
//   logout: () => dispatch({ type: "LOGOUT" }),
// };

export {
  AuthReducer,
  AuthState,
}