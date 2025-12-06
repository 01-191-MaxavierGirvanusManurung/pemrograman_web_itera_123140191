import { useMemo } from 'react';

const useBookStats = (books) => {
  const stats = useMemo(() => {
    const total = books.length;
    const owned = books.filter(b => b.status === 'milik').length;
    const reading = books.filter(b => b.status === 'baca').length;
    const wishlist = books.filter(b => b.status === 'beli').length;

    return { total, owned, reading, wishlist };
  }, [books]);

  return stats;
};

export default useBookStats;