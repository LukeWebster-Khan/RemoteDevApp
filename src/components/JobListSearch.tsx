import { useJobItemContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemContext();
  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
