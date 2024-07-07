import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { pageDirection } from "../lib/types";
import { useJobItemContext } from "../lib/hooks";

export default function PaginationControls() {
  const {
    currentPage,
    totalNumberOfPages,
    handleChangePage: onClick,
  } = useJobItemContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={(e) => {
            onClick("previous");
            e.currentTarget.blur();
          }}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          onClick={(e) => {
            onClick("next");
            e.currentTarget.blur();
          }}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

type paginationButtonProps = {
  direction: pageDirection;
  currentPage: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: paginationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`pagination__button 
    pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
