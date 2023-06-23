"use client";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // IF USE EFFECT RUNNING, THAATS MEAN ALREADY RUNNING ON CLIENT
    // WE DONT TO RENDER MODAL WHEN SERVER SIDE RUNNING
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};
export default ModalProvider;
