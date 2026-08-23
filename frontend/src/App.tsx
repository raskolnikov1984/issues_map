import { LoginPage } from './features/auth/components/LoginPage';
import { useSession } from './features/auth/hooks/useSession';
import { SplitScreenLayout } from './layout/SplitScreenLayout';

function App() {
  const { user, signIn, signOut } = useSession();

  if (!user) {
    return <LoginPage onAuthenticated={signIn} />;
  }

  return (
    <SplitScreenLayout userEmail={user.email} onSignOut={signOut}>
      <div className="grid h-full place-items-center">
        <p className="text-sm text-neutral-400">
          El dashboard llegará en los próximos commits
        </p>
      </div>
    </SplitScreenLayout>
  );
}

export default App;
