import { devtools, persist } from 'zustand/middleware';
import type { CoffeeFilters, CoffeeFiltersActions } from './coffee-filters.interface';
import { coffeeFiltersSlice } from './coffee-filters.slice';
import type { Coffee, CoffeeActions, CoffeeState } from './coffee-list.interface';
import { coffeeListSlice } from './coffee-list.slice';
import { create } from 'zustand';
import type { CoffeeParams } from '@/api/coffee.api';

// создаем хук для использования стора
export const useCoffeeStore = create<
	CoffeeState & CoffeeActions & CoffeeFilters & CoffeeFiltersActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
>(
	devtools(
		persist((...arg) => ({ ...coffeeListSlice(...arg), ...coffeeFiltersSlice(...arg) }), {
			name: 'coffeeStore',
			partialize: (state) => state.coffees,
		}),
	),
);

// подписка на изменения
useCoffeeStore.subscribe((state, prevState) => {
	if (JSON.stringify(state.urlParams) !== JSON.stringify(prevState.urlParams)) {
		state.getCoffees({
			search: state.urlParams.search,
			filterType: state.urlParams.filterType,
			sortOrder: state.urlParams.filterType,
		});
	}
	return state;
});

export const setUrlParams = (params: CoffeeFilters['urlParams']) => {
	useCoffeeStore.getState().setUrlParams(params);
};

export const getCoffees = (params?: CoffeeParams): Promise<Coffee[]> => {
	return useCoffeeStore.getState().getCoffees(params);
};
