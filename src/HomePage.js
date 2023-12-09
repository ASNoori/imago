import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import Drawer from './components/Drawer';
import { Box } from '@mui/material'
import ImageGallery from './components/ImageList'
import Footer from './Footer';
import useSearch from './components/useSearch';
import { useFavoriteContext } from "./components/FavoritesContext";

function HomePage() {
  const { search, searchResults, handleSearchChange } = useSearch();
  const { favorites, toggleFavorite } = useFavoriteContext();
  return (
    <Box>
    <NavBar handleSearchChange={handleSearchChange} search={search}/>
    <HeroSection/>
    <Drawer/>
    <ImageGallery searchResults={searchResults} favorites={favorites} toggleFavorite={toggleFavorite}/>
    <Footer/>
    </Box>

  )
}

export default HomePage