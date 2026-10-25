'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from "@/lib/firebase"; 
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from 'firebase/auth';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // مراقبة حالة تسجيل الدخول في Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}