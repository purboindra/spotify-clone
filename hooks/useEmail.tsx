"use client";

import getSongsByUserId from "@/actions/getSongsByUserId";
import { useUser } from "@/hooks/useUser";
import { useEffect, useMemo } from "react";
export const WelcomeEmail = () => {
  const { user } = useUser();

  const email = useMemo(() => {
    return user?.email ?? "";
  }, [user?.email]);

  return <div>{`Welcome Back, ${email}`}</div>;
};
