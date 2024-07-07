import { useJobItemContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfResults } = useJobItemContext();
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfResults}</span> results
    </p>
  );
}
