import { useToast } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const Prompt = (description, name) => {
  const toast = useToast();
  const toastIdRef = useRef();
  function addToast() {
    toastIdRef.current = toast({
      title: "Note",
      description: description,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  }

  useState(() => {
    const prompt = localStorage.getItem(name);
    if (prompt === "1") return;
    else {
      console.log(name);
      addToast();
      localStorage.setItem(`${name}`, "1");
    }
  });
};

export default Prompt;
