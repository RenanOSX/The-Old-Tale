import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from './FirebaseConfig.js';

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

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthServices();