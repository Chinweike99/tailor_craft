// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// // import { User } from '@/types';
// // import { getCurrentUser } from '@/api/auth';

// type AuthContextType = {
//   user: User | null;
//   isLoading: boolean;
//   setUser: (user: User | null) => void;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isLoading: true,
//   setUser: () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const user = await getCurrentUser();
//         setUser(user);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isLoading, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);