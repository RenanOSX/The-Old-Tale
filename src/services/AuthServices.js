import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";

import { auth } from './FirebaseConfig.js';

import { getAuth } from "firebase/auth";

import { ref, set, get } from 'firebase/database';

import { db } from "./FirebaseConfig.js";

class AuthServices {
  constructor() {
    this.auth = auth;
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      console.error("Error logging in: ", error);
      return { success: false, error };
    }
  }

  async register(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      localStorage.setItem('user', JSON.stringify({ ...user, displayName: name }));
      return { success: true, user };
    } catch (error) {
      console.error("Error registering: ", error);
      return { success: false, error };
    }
  }

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return { success: true };
    } catch (error) {
      console.error("Error resetting password: ", error);
      return { success: false, error };
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      console.error("Error logging out: ", error);
      return { success: false, error };
    }
  }

  async updateUser(user) {
    const auth = getAuth();
    if (auth.currentUser) {
      // Atualiza os dados do usuário no Realtime Database
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      await set(userRef, {
        theme: user.theme,
        photoURL: user.photoURL || auth.currentUser.photoURL,
      });
    } else {
      throw new Error('Usuário não autenticado');
    }
  }

  async buscarTheme(userId) {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log('Theme-buscar:', userData.theme);
      return userData.theme;
    }
    return '';
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
}

export default new AuthServices();