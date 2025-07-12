import { type CoffeeParams } from '@/api/coffee.api';

export interface Coffee {
	id: number;
	name: string;
	description: string;
	rating: number;
	size: string;
	price: number;
	image: string;
}

export interface CoffeeState {
	coffees: Coffee[];
	isLoading: boolean;
	error: string | null;
	isError: boolean;
}

export interface CoffeeActions {
	getCoffees: (params?: CoffeeParams) => Promise<Coffee[]>;
}
