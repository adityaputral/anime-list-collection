import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, useEffect, ChangeEvent } from 'react';

interface PaginationProps {
  currentActivePageNumberChanged: (value: number) => void;
  page?: number | string | null | undefined;
}

const PaginationWrapper = ({
  currentActivePageNumberChanged,
  page
}: PaginationProps) => {
  const [currentActivePageNumber, setCurrentActivePageNumber]: any = useState(
    page || 1
  );
  useEffect(() => {
    currentActivePageNumberChanged(currentActivePageNumber);
  }, [currentActivePageNumber]);

  useEffect(() => {
    setCurrentActivePageNumber(page);
  }, [page]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentActivePageNumber(value);
  };

  return (
    <>
      <Stack spacing={2}>
        <Pagination count={10} onChange={handleChange} />
      </Stack>
    </>
  );
};

export default PaginationWrapper;
