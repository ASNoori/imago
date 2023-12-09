import React from 'react'
import { useFavoriteContext } from './FavoritesContext'
import Favorites from './Favorites';

function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavoriteContext();
    return (
    <div>      
        <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  )
}

export default FavoritesPage