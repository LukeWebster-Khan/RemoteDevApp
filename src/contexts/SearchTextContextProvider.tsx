import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextType = {
  searchText: string;
  debouncedValue: string;
  handleChangeSearchText: (text: string) => void;
};

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

export function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 750);

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedValue,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
