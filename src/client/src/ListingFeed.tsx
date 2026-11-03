import React from 'react';
import { ListingView } from './types';

interface ListingFeedProps {
  items: ListingView[];
}

export const ListingFeed: React.FC<ListingFeedProps> = ({ items }) => {
  return (
    <div className="listing-feed">
      {items.map((item) => (
        <div key={item.id} className="listing-card">
          <div className="card-header">
            <span className="category">{item.category}</span>
            <span className={`status status-${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
          <h3>{item.title}</h3>
          <p className="dormitory">{item.dormitory}</p>
          <p className="description">{item.description}</p>
          <div className="condition">Стан: {item.condition}</div>
        </div>
      ))}
    </div>
  );
};
