/*
import React,{ useContext} from "react";
import login from "services/auth/login";
import logout from "services/auth/logout";
import signin from "services/auth/register";
import newAddUser from "services/users/new-add-user";
import type { ApiContext, User } from "src/libs/types/data";
//import { fetcher2 } from "utils";

const authUser = {
      id: 1,
      username: "taketo",
      password: "100",
      profileImageUrl: "/users/1.png",
      numberOfStars: 20,
      dream: "医者"
};

type AuthContextType = {
  authUser? : User
  isLoading: boolean
  signin: (username: string, password: string) => Promise<void>
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  mutate: ( data?: User | Promise<User>, shouldRevalidate?: boolean ) => Promise<User | undefined> 
}
//shouldRevalidate⇒データ取得とデータキャッシュ化の実行有無
type AuthContextProviderProps = {
  context: ApiContext
  authUser?: User
}

const AuthContext = React.createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
})

export const useAuthContext = (): AuthContextType => useContext<AuthContextType>(AuthContext)

export const AuthContextProvider = ({
  context,
  authUser,
  children,
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  const { data, error, mutate } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/me`
  )
  const isLoading = !data && !error
  
  const loginInternal = async (username: string, password: string) => {
    await login(context, { username, password})
    await mutate()
  }

  const signinInternal = async (username: string, password: string) => {
    const user = await signin(context, { username, password})
    const user2 = await newAddUser(context, {user})
    await mutate(user2)
  }

  const logoutInternal = async () => {
    await logout(context)
    await mutate()
  }

  return (
    <AuthContext.Provider
    value={{
      authUser: data ?? authUser,
      isLoading,
      signin: signinInternal,
      login: loginInternal,
      logout: logoutInternal,
      mutate,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
*/