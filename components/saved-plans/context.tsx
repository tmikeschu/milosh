import React from "react";
import { useDisclosure } from "@chakra-ui/react";

type SavedPlansContext = {
  modalDisclosure: ReturnType<typeof useDisclosure>;
};

export const SavedPlansContext = React.createContext<
  SavedPlansContext | undefined
>(undefined);

export const useSavedPlansContext = (): SavedPlansContext => {
  const context = React.useContext(SavedPlansContext);
  if (!context) {
    throw new Error(
      "useSavedPlansContext must be used within a SavedPlansContextProvider"
    );
  }
  return context;
};

export const SavedPlansProvider: React.FC<
  React.PropsWithChildren<{ disclosure: ReturnType<typeof useDisclosure> }>
> = ({ disclosure, children }) => {
  return (
    <SavedPlansContext.Provider value={{ modalDisclosure: disclosure }}>
      {children}
    </SavedPlansContext.Provider>
  );
};
