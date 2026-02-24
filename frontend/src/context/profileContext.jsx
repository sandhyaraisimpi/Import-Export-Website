import { createContext, useContext, useEffect, useState } from "react";
import { getService } from "../service/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getService("/customer/profile");
      if (res?.ok) {
        setUser(res.data);
      }
    };

    fetchUser();
  }, []); // 🔥 Runs only once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);