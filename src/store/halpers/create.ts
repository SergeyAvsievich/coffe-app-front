import { create as _create, type StateCreator } from 'zustand';

// set для хранения функций сброса всех сторов
const resetStoreFnSet = new Set<() => void>();
export const resetAllStores = () => resetStoreFnSet.forEach((fn) => fn());

// вспомогательная функция create с возможностью сброса всех сторов
export const create = (<T>() => {
	return (stateCreator: StateCreator<T>) => {
		const store = _create(stateCreator);
		const initialState = store.getInitialState();
		const resetStore = () => store.setState(initialState);
		resetStoreFnSet.add(resetStore);
		return store;
	};
}) as typeof _create;
