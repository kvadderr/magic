'use client';
import React, { useEffect, useState } from 'react';
import getArrayFromDigit from '@/shared/hooks/getArrayFromDigit';

const buttonWithPoints = (
  page: number,
  currentPage: number,
  setCurrentPage: (num: number) => void,
  position: string,
  i: number,
  isHavePoints: boolean,
) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
      {position === 'top' && isHavePoints && <div className="paginationP" />}
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`mx-2 btn paginationBtn ${page === currentPage ? 'blackBtn blackBtnPagination' : 'blackBtn'}`}
      >
        {page}
      </button>
      {position === 'bottom' && isHavePoints && <div className="paginationP" />}
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  pagesAmount: number;
  setCurrentPage: (num: number) => void;
  perPage?: number;
}

const Pagination = ({
  currentPage,
  pagesAmount,
  setCurrentPage,
  perPage = 10,
}: PaginationProps) => {
  const [valueInPage, setValueInPage] = useState(perPage);
  const [dimensions, setDimensions] = useState({
    width: 1920,
    height: 1080,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <button
        key={-1}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="mx-2 btn paginationBtn blackBtn blackBtnPagination"
      >
        &#8592;
      </button>
      <div className="paginationWrap">
        {getArrayFromDigit(
          pagesAmount,
          currentPage,
          valueInPage,
          'pagination',
        )?.map((page, i) => {
          if (i === 1 && page - 1 != 1) {
            return buttonWithPoints(
              page,
              currentPage,
              setCurrentPage,
              'top',
              i,
              dimensions.width >= 1280,
            );
          } else if (i == valueInPage - 2 && page + 1 != pagesAmount) {
            return buttonWithPoints(
              page,
              currentPage,
              setCurrentPage,
              'bottom',
              i,
              dimensions.width >= 1280,
            );
          }
          return (
            <button
              key={i}
              onClick={() => setCurrentPage(page)}
              className={`mx-2 btn paginationBtn ${page === currentPage ? 'blackBtn blackBtnPagination' : 'blackBtn'}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        key={-2}
        disabled={currentPage === pagesAmount}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="mx-2 btn paginationBtn blackBtn blackBtnPagination"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
