import { useCoffeeFiltersStore } from '@/store/coffee/coffee.filters.store';
import { useCoffeeStore } from '@/store/coffee/coffee.store';
import { useCounterStore } from '@/store/counter.store';
import { useUrlStorage } from '@/store/halpers/useUrlStorage';
import { CoffeeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { useEffect } from 'react';
import { Navbar } from '../Navbar/Navbar';
import styles from './CoffeeList.module.css';

export const CoffeeList: React.FC = () => {
	const { coffees, isLoading, isError, error, getCoffees } = useCoffeeStore();
	const { urlParams, setUrlParams } = useCoffeeFiltersStore();
	useUrlStorage(urlParams, setUrlParams);

	const { count, increment, decrement } = useCounterStore();

	useEffect(() => {
		getCoffees(urlParams);
	}, []);

	return (
		<div>
			<Navbar />
			<Row gutter={[16, 16]}>
				{isLoading && <div>Loading...</div>}
				{isError && <div>Error: {error}</div>}
				{!isLoading &&
					!isError &&
					coffees.map((coffee, index) => (
						<Col key={index} xs={24} sm={12} md={6}>
							<Card
								hoverable
								cover={<img alt={coffee.name} src={coffee.image} className={styles.coffeeImage} />}
								actions={[<CoffeeOutlined key="coffee" />, <span>{coffee.price}</span>]}
							>
								<Card.Meta title={coffee.name} description={coffee.description} />
							</Card>
						</Col>
					))}
			</Row>

			<div>
				<Button onClick={increment}>Increment</Button>
				<Button onClick={decrement}>Decrement</Button>
				<span>{count}</span>
			</div>
		</div>
	);
};
