import { getCoffees, type CoffeeParams } from '@/api/coffee.api';
import { type StateCreator } from 'zustand';
import type { CoffeeFilters, CoffeeFiltersActions } from './coffee-filters.interface';
import type { Coffee, CoffeeActions, CoffeeState } from './coffee-list.interface';

// создаем стор для кофе
export const coffeeListSlice: StateCreator<
	CoffeeState & CoffeeActions & CoffeeFilters & CoffeeFiltersActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	CoffeeState & CoffeeActions
> = (set) => ({
	coffees: [],
	isLoading: false,
	error: null,
	isError: false,

	// получаем кофе
	getCoffees: async (params?: CoffeeParams): Promise<Coffee[]> => {
		try {
			set({ isLoading: true });
			const response = await getCoffees(params);
			set({ coffees: response.data, isLoading: false, isError: false, error: null });
			return response.data;
		} catch (error) {
			console.error('Failed to fetch coffees:', error);
			set({ coffees: [], isLoading: false, isError: true, error: error as string });
			return [];
		}
	},
});
