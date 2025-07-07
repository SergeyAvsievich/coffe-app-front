import { getCoffees, type CoffeeParams } from '@/api/coffee.api';
import { type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { create } from '../halpers/create';

interface Coffee {
	id: number;
	name: string;
	description: string;
	rating: number;
	size: string;
	price: number;
	image: string;
}

interface CoffeeState {
	coffees: Coffee[];
	isLoading: boolean;
	error: string | null;
	isError: boolean;
}

interface CoffeeActions {
	getCoffees: (params?: CoffeeParams) => Promise<Coffee[]>;
}

// создаем стор для кофе
const coffeeSlice: StateCreator<
	CoffeeState & CoffeeActions,
	[['zustand/devtools', never], ['zustand/persist', unknown]]
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

// создаем хук для использования стора
export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
	devtools(
		persist(coffeeSlice, {
			name: 'coffeeStore',
			partialize: (state) => state.coffees,
		}),
	),
);

// получаем список кофе
export const getCoffeeList = (params?: CoffeeParams): Promise<Coffee[]> =>
	useCoffeeStore.getState().getCoffees(params);
