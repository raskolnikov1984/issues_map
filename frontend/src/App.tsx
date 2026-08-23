import { LoginPage } from './features/auth/components/LoginPage';
import { useSession } from './features/auth/hooks/useSession';
import { DashboardPage } from './features/cases_map/components/DashboardPage';

function App() {
  const { user, signIn, signOut } = useSession();

  if (!user) {
    return <LoginPage onAuthenticated={signIn} />;
  }

  return <DashboardPage userEmail={user.email} onSignOut={signOut} />;
}

export default App;
