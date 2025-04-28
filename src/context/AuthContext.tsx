import React, { createContext, ReactNode, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserMetadata,
} from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

type ProviderInfo = {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
};

type User = {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderInfo[];
  metadata: UserMetadata;
  tenantId: string | null;
  getIdToken(forceRefresh?: boolean): Promise<string>;
  reload(): Promise<void>;
  toJSON(): object;
};

type AuthContextType = {
  contactMessage: string;
  passwordMessage: string;
  setContactMessage: React.Dispatch<React.SetStateAction<string>>;
  setPasswordMessage: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  signin: (contact: string, password: string) => Promise<void>;
  signup: (contact: string, password: string) => Promise<void>;
  isSigning: boolean;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contactMessage, setContactMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const signin = async (contact: string, password: string) => {
    try {
      setIsSigning(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        contact,
        password
      );
      console.log("User signed in:", userCredential.user);

      setUser(userCredential.user);

      toast.success("Sign In successful!", {
        theme: "dark",
        position: "bottom-right",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            console.error("No user found with this email.");
            setContactMessage("No user found with this email");
            break;
          case "auth/wrong-password":
            console.error("Incorrect password.");
            setPasswordMessage("Incorrect password");
            break;
          default:
            console.error("Firebase Auth Error:", error.message);
        }
      } else {
        console.error("Unknown Error:", error);
      }
    } finally {
      setIsSigning(false);
    }
  };

  const signup = async (contact: string, password: string) => {
    try {
      setIsSigning(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        contact,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        contact,
        createdAt: new Date(),
      });

      setUser(user);

      toast.success("Sign Up successful!", {
        theme: "dark",
        position: "bottom-right",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            console.error("This email is already registered");
            setContactMessage("This email is already registered");
            break;
          default:
            console.error("Firebase Auth Error:", error.message);
        }
      } else {
        console.error("Unknown Error:", error);
      }
    } finally {
      setIsSigning(false);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");

      setUser(null);

      toast.success("Sign Out successful!", {
        theme: "dark",
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!authReady) return null;

  return (
    <AuthContext.Provider
      value={{
        contactMessage,
        passwordMessage,
        user,
        signin,
        signup,
        setContactMessage,
        setPasswordMessage,
        isSigning,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
