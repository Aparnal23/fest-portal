import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("fp_user")) || null;
  } catch {
    return null;
  }
}

export function SessionProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("fp_token"));
  const [user, setUser] = useState(readUser);

  function signIn(newToken, newUser) {
    localStorage.setItem("fp_token", newToken);
    localStorage.setItem("fp_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  function signOut() {
    localStorage.removeItem("fp_token");
    localStorage.removeItem("fp_user");
    setToken(null);
    setUser(null);
  }

  return (
    <SessionContext.Provider value={{ token, user, isAuthed: Boolean(token), signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
