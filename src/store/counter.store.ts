import type { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { create } from './halpers/create';

interface CounterState {
	count: number;
}

interface CounterActions {
	increment: () => void;
	decrement: () => void;
}

const counterSlice: StateCreator<CounterState & CounterActions> = (set) => ({
	count: 0,
	increment: () => set((state) => ({ count: state.count + 1 })),
	decrement: () => set((state) => ({ count: state.count - 1 })),
});

export const useCounterStore = create<CounterState & CounterActions>()(
	devtools(
		persist(counterSlice, {
			name: 'counter',
		}),
	),
);
