import { ListingFeed } from './ListingFeed';
import { mockListings } from './mock-listings';
// @ts-ignore
import './styles.css';

export function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>EcoShare</h1>
        <p>Сервіс взаємодопомоги та шерингу для мешканців гуртожитків</p>
        <small className="notice">Джерело: тестові дані клієнта</small>
      </header>
      <main>
        <ListingFeed items={mockListings} />
      </main>
    </div>
  );
}

export default App;
