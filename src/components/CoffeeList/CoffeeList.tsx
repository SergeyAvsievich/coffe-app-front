import { getCoffees, setUrlParams, useCoffeeStore } from '@/store/coffee/coffee.store';
import { useUrlStorage } from '@/store/halpers/useUrlStorage';
import { CoffeeOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { Counter } from '../Counter/Counter';
import { Navbar } from '../Navbar/Navbar';
import styles from './CoffeeList.module.css';

export const CoffeeList: React.FC = () => {
	const { coffees, isLoading, isError, error, urlParams } = useCoffeeStore(
		useShallow((state) => ({
			coffees: state.coffees,
			isLoading: state.isLoading,
			isError: state.isError,
			error: state.error,
			urlParams: state.urlParams,
		})),
	);

	useUrlStorage(urlParams, setUrlParams);

	useEffect(() => {
		getCoffees(urlParams);
	}, []);

	return (
		<div>
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
		</div>
	);
};
