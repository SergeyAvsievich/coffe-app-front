import { Card, Row, Col } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import styles from './CoffeeList.module.css';
import { Navbar } from '../Navbar/Navbar';
import arabica from '@/assets/coffee/arabica.jpg';
import robusta from '@/assets/coffee/robusta.jpg';
import colombia from '@/assets/coffee/colombia.jpg';
import ethiopia from '@/assets/coffee/ethiopia.jpg';
import cappuccino from '@/assets/coffee/capuchino.jpg';
import { useCoffeeStore } from '@/store/coffee.store';
import { getCoffees } from '@/api/coffee.api';

interface Coffee {
	name: string;
	price: string;
	image: string;
	description: string;
	type?: string;
}

const coffeeData: Coffee[] = [
	{
		name: 'Арабика',
		price: '1500 ₽',
		image: arabica,
		description: 'Классический сорт кофе с мягким вкусом',
	},
	{
		name: 'Робуста',
		price: '1200 ₽',
		image: robusta,
		description: 'Крепкий кофе с насыщенным вкусом',
	},
	{
		name: 'Колумбия',
		price: '1800 ₽',
		image: colombia,
		description: 'Кофе с нотками шоколада и ореха',
	},
	{
		name: 'Эфиопия',
		price: '2000 ₽',
		image: ethiopia,
		description: 'Кофе с яркими фруктовыми нотками',
	},
	{
		name: 'Капучино',
		price: '300 ₽',
		image: cappuccino,
		description: 'Классический итальянский напиток из эспрессо и молочной пены',
	},
];

export const CoffeeList: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filterType, setFilterType] = useState('all');
	const [sortOrder, setSortOrder] = useState('none');

	const { coffees, isLoading, isError, error } = useCoffeeStore();

	useEffect(() => {
		getCoffees();
	}, []);

	const filteredCoffees = coffeeData
		.filter(
			(coffee) =>
				coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
				(filterType === 'all' || coffee.type === filterType),
		)
		.sort((a, b) => {
			if (sortOrder === 'none') return 0;
			const priceA = parseInt(a.price);
			const priceB = parseInt(b.price);
			if (sortOrder === 'asc') return priceA - priceB;
			return priceB - priceA;
		});

	return (
		<div>
			<Navbar onSearch={setSearchQuery} onFilter={setFilterType} onSort={setSortOrder} />
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
