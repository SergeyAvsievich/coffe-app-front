import type { StateCreator } from 'zustand';
import type {
	CoffeeFilters,
	CoffeeFiltersActions,
	CoffeeFiltersWithUrl,
} from './coffee-filters.interface';
import type { CoffeeActions, CoffeeState } from './coffee-list.interface';

const initialState: CoffeeFiltersWithUrl = {
	urlParams: {
		filterType: '',
		search: '',
		sortOrder: '',
	},
};

// создаем стор для фильтров
export const coffeeFiltersSlice: StateCreator<
	CoffeeFilters & CoffeeFiltersActions & CoffeeState & CoffeeActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	[['zustand/devtools', never], ['zustand/persist', unknown]],
	CoffeeFilters & CoffeeFiltersActions
> = (set) => ({
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
