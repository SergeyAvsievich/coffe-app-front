import React from 'react';
import { decrement, increment, useCounterStore } from '@/store/counter.store';
import { Button } from 'antd';
import { useShallow } from 'zustand/shallow';

export const Counter: React.FC = () => {
	const count = useCounterStore(useShallow((state) => state.count));

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
			<Button onClick={decrement}>-</Button>
			<span>{count}</span>
			<Button onClick={increment}>+</Button>
		</div>
	);
};
