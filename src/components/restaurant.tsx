import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantQuery_restaurants_results } from '../__generated__/restaurantQuery';

interface IRestaurantProps {
  restaurant: restaurantQuery_restaurants_results;
}

export const Restaurant: React.FC<IRestaurantProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="flex flex-col">
        <div
          className="bg-gray-300 py-32 bg-center bg-cover"
          style={{ backgroundImage: `url(${restaurant.coverImage})` }}
        ></div>
        <h3 className="text-xl py-3">{restaurant.name}</h3>
        <span className="border-t border-gray-300 opacity-50">
          {restaurant.category.name}
        </span>
      </div>
    </Link>
  );
};
