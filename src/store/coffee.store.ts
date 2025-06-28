import { getCoffees } from '@/api/coffee.api';
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

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
	getCoffees: () => Promise<Coffee[]>;
}

const coffeeSlice: StateCreator<CoffeeState & CoffeeActions, [['zustand/devtools', never]]> = (
	set,
) => ({
	coffees: [],
	isLoading: false,
	error: null,
	isError: false,
	getCoffees: async (): Promise<Coffee[]> => {
		try {
			set({ isLoading: true });
			const response = await getCoffees();
			set({ coffees: response.data, isLoading: false, isError: false, error: null });
			return response.data;
		} catch (error) {
			console.error('Failed to fetch coffees:', error);
			set({ coffees: [], isLoading: false, isError: true, error: error as string });
			return [];
		}
	},
});

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(devtools(coffeeSlice));
