import { LoginPage } from './features/auth/components/LoginPage';

function App() {
  return <LoginPage onAuthenticated={(user) => console.log(user)} />;
}

export default App;
