import { useState } from 'react';

const PAGE_PER_LIMIT = 10;

export const usePagination = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: PAGE_PER_LIMIT,
  });

  return { pagination, setPagination };
};
