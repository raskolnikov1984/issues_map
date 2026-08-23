import { LoginPage } from './features/auth/components/LoginPage';
import { useSession } from './features/auth/hooks/useSession';
import { DashboardPage } from './features/cases_map/components/DashboardPage';
import { SplitScreenLayout } from './layout/SplitScreenLayout';

function App() {
  const { user, signIn, signOut } = useSession();

  if (!user) {
    return <LoginPage onAuthenticated={signIn} />;
  }

  return (
    <SplitScreenLayout userEmail={user.email} onSignOut={signOut}>
      <DashboardPage />
    </SplitScreenLayout>
  );
}

export default App;
