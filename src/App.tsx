import './App.css';
import { CoffeeList } from './components/CoffeeList/CoffeeList';
import { Counter } from './components/Counter/Counter';
import { Navbar } from './components/Navbar/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<CoffeeList />
			<Counter />
		</>
	);
}

export default App;
