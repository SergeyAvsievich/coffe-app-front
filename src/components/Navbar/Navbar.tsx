import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import styles from './Navbar.module.css';
import type { NavbarProps } from './Navbar.props';
import { resetAllStores } from '@/store/halpers/create';
import { useCoffeeFiltersStore } from '@/store/coffee/coffee.filters.store';

export const Navbar: React.FC<NavbarProps> = () => {
	const { setUrlParams, urlParams } = useCoffeeFiltersStore();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setUrlParams({
			search: value,
			filterType: urlParams.filterType,
			sortOrder: urlParams.sortOrder,
		});
	};

	const handleFilter = (value: string): void => {
		setUrlParams({
			search: urlParams.search,
			filterType: value,
			sortOrder: urlParams.sortOrder,
		});
	};

	const handleSort = (value: string): void => {
		setUrlParams({
			search: urlParams.search,
			filterType: urlParams.filterType,
			sortOrder: value,
		});
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.searchContainer}>
				<Input
					placeholder="Поиск кофе..."
					value={urlParams.search}
					onChange={handleSearch}
					prefix={<SearchOutlined />}
					className={styles.searchInput}
				/>
			</div>

			<div className={styles.filterContainer}>
				<Select
					value={urlParams.filterType}
					onChange={handleFilter}
					placeholder="Фильтр"
					className={styles.filterSelect}
				>
					<Select.Option value="">Все</Select.Option>
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
					className={urlParams.sortOrder === 'asc' ? styles.activeSort : ''}
				>
					По возрастанию
				</Button>
				<Button
					type="default"
					icon={<SortDescendingOutlined />}
					onClick={() => handleSort('desc')}
					className={urlParams.sortOrder === 'desc' ? styles.activeSort : ''}
				>
					По убыванию
				</Button>
			</div>
			<Button onClick={() => resetAllStores()}>Сбросить</Button>
		</div>
	);
};
