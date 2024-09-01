import { AuthProvider, HttpError } from "react-admin";

import store from "./store";

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: async ({ email }) => {
    const request = new window.Request(`${process.env.API || 'http://localhost:3001'}/user/authenticate`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: new window.Headers({
        'Content-Type': 'application/json',
      }),
    });
    const response = await window.fetch(request);
    if (response.status < 200 || response.status >= 300) {
      throw new HttpError('Invalid email', 401);
    }
    const json = await response.json();
    const { token } = json;
    store.setItem('token', token);
  },
  logout: () => {
    store.removeItem("token");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    store.getItem("token") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = store.getItem("token");
    const user = persistedUser ? JSON.parse('User') : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
