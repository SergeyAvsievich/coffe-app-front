import { axiosInstance } from '@/config/axios.config';

export interface CoffeeParams {
	filterType: string;
	sortOrder: string;
	search: string;
}

export const getCoffees = (params?: CoffeeParams) => {
	const { filterType, sortOrder, search } = params || {};
	const newSearchParams = new URLSearchParams();
	if (filterType) newSearchParams.set('filterType', filterType);
	if (sortOrder) newSearchParams.set('sortOrder', sortOrder);
	if (search) newSearchParams.set('search', search);
	return axiosInstance.get('/coffee', { params: newSearchParams });
};
