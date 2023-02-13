import * as React from 'react';


const AuthState = React.createContext({
  user: 0,
  setUser: (u) => {}
});

export {
  AuthState,
}