import { useDisclosure } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react';

interface AuthContextType {
  openAuthModal: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LazyAuthUnlockFeaturesModal = dynamic(
  () =>
    import('../components/AuthUnlockFeaturesModal').then(
      (mod) => mod.AuthUnlockFeaturesModal
    ),
  { ssr: false }
);

const AuthProvider: FC<PropsWithChildren<{ user: User | null }>> = ({
  children,
  user,
}) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    router.events.on('routeChangeComplete', onClose);

    return () => {
      router.events.off('routeChangeComplete', onClose);
    };
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        openAuthModal: onOpen,
        user,
      }}
    >
      {children}
      {isOpen && (
        <LazyAuthUnlockFeaturesModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
