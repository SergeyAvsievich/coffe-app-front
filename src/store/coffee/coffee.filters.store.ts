import type { StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from '../halpers/create';
import { getCoffeeList } from './coffee.store';
import { hashStorage } from '../halpers/hashStorage';

interface CoffeeFilters {
	urlParams: {
		filterType: string;
		search: string;
		sortOrder: string;
	};
}

interface CoffeeFiltersWithUrl extends CoffeeFilters {
	urlParams: {
		filterType: string;
		search: string;
		sortOrder: string;
	};
}

interface CoffeeFiltersActions {
	setUrlParams: (params: CoffeeFilters['urlParams']) => void;
}

const initialState: CoffeeFiltersWithUrl = {
	urlParams: {
		filterType: '',
		search: '',
		sortOrder: '',
	},
};

// создаем стор для фильтров
const coffeeFiltersSlice: StateCreator<
	CoffeeFilters & CoffeeFiltersActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
	...initialState,
	setUrlParams: (params: CoffeeFilters['urlParams']) =>
		set({
			urlParams: {
				filterType: params.filterType,
				search: params.search,
				sortOrder: params.sortOrder,
			},
		}),
});

export const useCoffeeFiltersStore = create<CoffeeFilters & CoffeeFiltersActions>()(
	devtools(
		persist(coffeeFiltersSlice, {
			name: 'coffeeFiltersStore',
			partialize: (state) => ({
				search: state.urlParams.search,
				filterType: state.urlParams.filterType,
				sortOrder: state.urlParams.sortOrder,
			}),
		}),
	),
);

// подписка на изменения
useCoffeeFiltersStore.subscribe((state) => {
	if (state.urlParams.search || state.urlParams.filterType || state.urlParams.sortOrder) {
		getCoffeeList({
			search: state.urlParams.search,
			filterType: state.urlParams.filterType,
			sortOrder: state.urlParams.filterType,
		});
	}

	return state;
});
