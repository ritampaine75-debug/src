import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, get, set } from "firebase/database";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        setUserData(snapshot.val());
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password, name) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // Create user in DB
    await set(ref(db, `users/${res.user.uid}`), {
      email,
      displayName: name,
      role: 'user', // Default role
      createdAt: new Date().toISOString()
    });
    return res;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, userData, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
