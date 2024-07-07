import { createContext, useState, useMemo, useCallback } from "react";

import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { pageDirection, sortBy, TJobItem } from "../lib/types";

type JobItemsContextType = {
  jobItems: TJobItem[];
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: sortBy;
  isLoading: boolean;
  jobItemsSortedAndSliced: TJobItem[];
  handleChangePage: (direction: pageDirection) => void;
  handleChangeSortBy: (sort: sortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedValue } = useSearchTextContext();

  const { jobItems, isLoading } = useSearchQuery(debouncedValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<sortBy>("relevant");

  const totalNumberOfResults = jobItems.length;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  const jobItemsSorted = useMemo(
    () =>
      [...jobItems]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ) || [],
    [jobItemsSorted, currentPage]
  );

  const handleChangePage = useCallback(
    () => (direction: pageDirection) => {
      if (direction === "next") {
        setCurrentPage((prev) => prev + 1);
      } else if (direction === "previous") {
        setCurrentPage((prev) => prev - 1);
      }
    },
    []
  );

  const handleChangeSortBy = useCallback(
    () => (sort: sortBy) => {
      setSortBy(sort);
      setCurrentPage(1);
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      isLoading,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      isLoading,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
