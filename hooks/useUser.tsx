import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetail: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface props {
  [propNames: string]: any;
}

export const MyUserContextProvider = (props: props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetail = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*,prices(*,products(*))")
      .in("status", ["trailing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetail && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetail(), getSubscription()]).then(
        (results) => {
          const userDetailPromise = results[0];
          const subscriptionPromise = results[1];
          if (userDetailPromise.status == "fulfilled") {
            setUserDetail(userDetailPromise.value!.data as UserDetails);
          }
          if (subscriptionPromise.status == "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetail(null);
      setSubscription(null);
    }
  }, [isLoadingUser, user]);

  const value = {
    accessToken,
    user,
    userDetail,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Use user must be use within MyUserContextProvider");
  }
  return context;
};
