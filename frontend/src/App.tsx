import { useState } from 'react';
import { PinLoader } from './components/common/PinLoader';
import { ToastProvider } from './components/common/toast/Toaster';
import type { AuthResponse } from './features/auth/services/authApi';
import { LoginPage } from './features/auth/components/LoginPage';
import { useSession } from './features/auth/hooks/useSession';
import { DashboardPage } from './features/cases_map/components/DashboardPage';

const TRANSITION_MS = 850;

function App() {
  const { user, signIn, signOut } = useSession();
  const [transitionLabel, setTransitionLabel] = useState<string | null>(null);

  function runWithTransition(action: () => void, label: string) {
    setTransitionLabel(label);
    window.setTimeout(() => {
      action();
      setTransitionLabel(null);
    }, TRANSITION_MS);
  }

  function handleSignIn(authenticated: AuthResponse) {
    runWithTransition(() => signIn(authenticated), 'Entrando al mapa…');
  }

  function handleSignOut() {
    runWithTransition(signOut, 'Cerrando sesión…');
  }

  return (
    <ToastProvider>
      <div key={user ? 'dashboard' : 'login'} className="min-h-screen animate-fade-in">
        {!user ? (
          <LoginPage onAuthenticated={handleSignIn} />
        ) : (
          <DashboardPage userEmail={user.email} onSignOut={handleSignOut} />
        )}
      </div>
      {transitionLabel && (
        <PinLoader
          overlay
          variant="pulse"
          pinColor="var(--color-active-pin)"
          label={transitionLabel}
        />
      )}
    </ToastProvider>
  );
}

export default App;
