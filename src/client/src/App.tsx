import { useState, useEffect, type FormEvent } from 'react';
import { getListings } from './api';
import { ListingFeed } from './ListingFeed';
import type { ListingView } from './types';
// @ts-ignore
import './styles.css';

export function App() {
  const [items, setItems] = useState<ListingView[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(query = '') {
    try {
      setLoading(true);
      setError(null);
      const data = await getListings(query);
      setItems(data);
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    void load(search);
  }

  return (
    <div className="container">
      <h1>EcoShare</h1>
      <p className="subtitle">Сервіс взаємодопомоги та шерингу для мешканців гуртожитків</p>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук оголошень..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Знайти</button>
      </form>

      <small className="notice">Джерело: тестові дані клієнта (NestJS API)</small>

      {loading && <p className="status-message">Завантаження...</p>}
      {error && <p className="error-message">Помилка: {error}</p>}
      
      {!loading && !error && <ListingFeed items={items} />}
    </div>
  );
}

export default App;
