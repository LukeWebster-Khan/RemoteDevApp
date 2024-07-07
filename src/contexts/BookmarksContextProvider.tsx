import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { TJobItemFull } from "../lib/types";

type bookmarksContextType = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: TJobItemFull[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<bookmarksContextType | null>(
  null
);

export function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );
  // useJobItems(bookmarkedIds);
  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };
  return (
    <BookmarksContext.Provider
      value={{
        handleToggleBookmark,
        bookmarkedIds,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
