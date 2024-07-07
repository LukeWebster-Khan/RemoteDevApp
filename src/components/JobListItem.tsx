import BookmarkIcon from "./BookmarkIcon";

import { TJobItem } from "../lib/types";

type jobListItemProps = {
  jobItem: TJobItem;
  activeId: number | null;
};

export default function JobListItem({ jobItem, activeId }: jobListItemProps) {
  const isCurrentJob = activeId === jobItem.id;
  return (
    <li className={`job-item ${isCurrentJob ? "job-item--active" : ""}`}>
      <a className="job-item__link" href={`#${jobItem.id}`}>
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>
        <div className="job-item__right">
          <BookmarkIcon id={jobItem.id} />
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
