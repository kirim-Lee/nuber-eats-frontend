import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export const usePagination = (initalPage: number) => {
  const [page, setPage] = useState(initalPage);

  const onNextPage = () => setPage((current) => current + 1);
  const onPrevPage = () => setPage((current) => current - 1);

  const updatePage = (newPage: number) => setPage(newPage);

  return {
    page,
    onNextPage,
    onPrevPage,
    updatePage,
  };
};

interface IProps {
  page: number;
  totalPages: number;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
}

export const Pagination: React.FC<IProps> = ({
  page,
  totalPages,
  onPrevPageClick,
  onNextPageClick,
}) => {
  return (
    <div className="grid grid-cols-3 text-center max-w-md mt-10 mx-auto items-center">
      <div>
        {page > 1 && (
          <button className="focus:outline-none" onClick={onPrevPageClick}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="font-medium text-xl"
            />
          </button>
        )}
      </div>
      <span className="mx-5">
        page {page} of {totalPages ?? 0}
      </span>
      <div>
        {page < (totalPages ?? 0) && (
          <button className="focus:outline-none" onClick={onNextPageClick}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="font-medium text-xl"
            />
          </button>
        )}
      </div>
    </div>
  );
};
