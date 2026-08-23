import { ToastProvider } from './components/common/toast/Toaster';
import { LoginPage } from './features/auth/components/LoginPage';
import { useSession } from './features/auth/hooks/useSession';
import { DashboardPage } from './features/cases_map/components/DashboardPage';

function App() {
  const { user, signIn, signOut } = useSession();

  return (
    <ToastProvider>
      <div key={user ? 'dashboard' : 'login'} className="min-h-screen animate-fade-in">
        {!user ? (
          <LoginPage onAuthenticated={signIn} />
        ) : (
          <DashboardPage userEmail={user.email} onSignOut={signOut} />
        )}
      </div>
    </ToastProvider>
  );
}

export default App;
