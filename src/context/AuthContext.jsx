import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserProfile = async (user) => {
      if (user) {
        let { data } = await supabase.from('users').select('*').eq('id', user.id).single();
        setUserDetails(data);
      }
    };

    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) await getUserProfile(session.user);
      setLoading(false);
    };
    
    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) getUserProfile(session.user);
    });
    
    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userDetails, loading, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);