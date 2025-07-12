import { useQuery } from '@tanstack/react-query';
import { getCoffees } from '../coffee/coffee.store';

export const useCustomQuery = () => {
	return useQuery({
		queryKey: ['fetch coffee list'],
		queryFn: () => getCoffees(),
	});
};
