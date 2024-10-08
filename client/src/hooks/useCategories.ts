import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/functions/functions';
import { Category } from '@/types/category';

export default function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
}
