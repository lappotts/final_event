"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { auth, db } from '../config/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Define the context data types
interface AuthContextType {
	user: UserType | null;
	signUp: (email: string, password: string, fName: string, lName: string) => Promise<any>;
	logIn: (email: string, password: string) => Promise<any>;
	logOut: () => Promise<void>;
}

// User data type interface
interface UserType {
	email: string | null;
	uid: string | null;
	isAdmin: boolean;
	isStaff: boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Make auth context available across the app by exporting it
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

// Create the auth context provider
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserType | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				// Fetch additional user info from Firestore
				const userDoc = await getDoc(doc(db, "users", authUser.uid));
				const userData = userDoc.exists() ? userDoc.data() : {};
	
				// Set user state with Firestore data
				setUser({
					email: authUser.email,
					uid: authUser.uid,
					isAdmin: userData?.isAdmin || false, // Default to false if isAdmin is undefined
					isStaff: userData?.isStaff || false, // Default to false is isStaff is undefined
				});
			} else {
				setUser(null);
			}
		});
	
		return () => unsubscribe();
	}, []);

	const signUp = async(email: string, password: string, fName: string, lName: string) => {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const userId = userCredential.user.uid;
		// Store additional user data in Firestore (or Realtime Database)
		await setDoc(doc(db, "users", userId), {
			firstName: fName,
			lastName: lName,
			email: email,
			isAdmin: false, 
			isStaff: false
		});
	};

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = async () => {
		await signOut(auth);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};
