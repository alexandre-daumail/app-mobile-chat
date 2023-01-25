
import './assets/css/App.css';
import LoginForm from "./components/LoginForm";
import SCLogo from "./assets/images/simplechat.png";

function App() {
  return (
    <div className="App-header">
  <div className="Login-Card">
    <img src={SCLogo} width={'20%'}  alt='SimpleChat'/>
    <h4> PANEL ADMIN</h4>
<LoginForm/>
  </div>
    </div>
  );
}

export default App;
