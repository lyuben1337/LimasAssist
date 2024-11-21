import React, { createContext, useState } from "react";

type LoadingContextType = {
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

export const LoadingContext = createContext<LoadingContextType>({
  setIsLoading: () => {},
  isLoading: false,
});

export const LoadingProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
