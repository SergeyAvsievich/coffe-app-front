export interface NavbarProps {
	/**
	 * Callback function for search input changes
	 */
	onSearch: (value: string) => void;

	/**
	 * Callback function for filter selection changes
	 */
	onFilter: (value: string) => void;

	/**
	 * Callback function for sort order changes
	 */
	onSort: (value: string) => void;
}
