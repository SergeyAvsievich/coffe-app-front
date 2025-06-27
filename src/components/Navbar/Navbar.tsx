import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import styles from './Navbar.module.css';
import type { NavbarProps } from './Navbar.props';

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onFilter, onSort }) => {
	const [searchValue, setSearchValue] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('all');
	const [sortOrder, setSortOrder] = useState('none');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setSearchValue(value);
		onSearch(value);
	};

	const handleFilter = (value: string): void => {
		setSelectedFilter(value);
		onFilter(value);
	};

	const handleSort = (value: string): void => {
		setSortOrder(value);
		onSort(value);
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.searchContainer}>
				<Input
					placeholder="Поиск кофе..."
					value={searchValue}
					onChange={handleSearch}
					prefix={<SearchOutlined />}
					className={styles.searchInput}
				/>
			</div>

			<div className={styles.filterContainer}>
				<Select
					value={selectedFilter}
					onChange={handleFilter}
					placeholder="Фильтр"
					className={styles.filterSelect}
				>
					<Select.Option value="all">Все</Select.Option>
					<Select.Option value="arabica">Арабика</Select.Option>
					<Select.Option value="robusta">Робуста</Select.Option>
					<Select.Option value="blend">Бленд</Select.Option>
				</Select>
			</div>

			<div className={styles.sortContainer}>
				<Button
					type="default"
					icon={<SortAscendingOutlined />}
					onClick={() => handleSort('asc')}
					className={sortOrder === 'asc' ? styles.activeSort : ''}
				>
					По возрастанию
				</Button>
				<Button
					type="default"
					icon={<SortDescendingOutlined />}
					onClick={() => handleSort('desc')}
					className={sortOrder === 'desc' ? styles.activeSort : ''}
				>
					По убыванию
				</Button>
			</div>
		</div>
	);
};
