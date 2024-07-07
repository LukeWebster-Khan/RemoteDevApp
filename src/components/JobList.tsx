import JobListItem from "./JobListItem";

import { TJobItem } from "../lib/types";
import Spinner from "./Spinner";
import { useActiveIdContext } from "../lib/hooks";

type JobListProps = {
  jobItems: TJobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeId } = useActiveIdContext();

  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem: TJobItem) => (
          <JobListItem activeId={activeId} key={jobItem.id} jobItem={jobItem} />
        ))
      )}
    </ul>
  );
}

export default JobList;
