import { useJobItemContext } from "../lib/hooks";

type sortButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
};

export default function SortingControls() {
  const { sortBy, handleChangeSortBy: onClick } = useJobItemContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
      >
        relevant
      </SortingButton>
      <SortingButton
        onClick={() => onClick("recent")}
        isActive={sortBy === "recent"}
      >
        recent
      </SortingButton>
    </section>
  );
}

function SortingButton({ onClick, children, isActive }: sortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--${children}
      ${isActive ? "sorting__button--active" : ""} 
      `}
    >
      {children}
    </button>
  );
}
