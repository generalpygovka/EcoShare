import type { ListingView } from './types';

interface ListingFeedProps {
  items: ListingView[];
}

const statusLabels: Record<ListingView['status'], string> = {
  available: 'Доступно',
  reserved: 'Заброньовано',
};

export function ListingFeed({ items }: ListingFeedProps) {
  if (items.length === 0) {
    return (
      <p role="status">
        За вашим запитом оголошень не знайдено.
      </p>
    );
  }

  return (
    <div className="listing-feed">
      {items.map((item) => (
        <article key={item.id} className="listing-card">
          <div className="card-header">
            <span className="category">
              {item.category}
            </span>

            <span className={`status status-${item.status}`}>
              {statusLabels[item.status]}
            </span>
          </div>

          <h2>{item.title}</h2>

          <p className="dormitory">
            {item.dormitory}
          </p>

          <p className="description">
            {item.description}
          </p>

          <p className="owner">
            Автор: {item.ownerName}
          </p>
        </article>
      ))}
    </div>
  );
}