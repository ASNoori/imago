import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography,Button} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

const Favorites = ({ favorites,toggleFavorite }) => {
  return (
    <Box id='favorites'>
    <Box style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
    }}>
    <Typography variant="h4" component="h4" sx={{ marginBottom: 1,padding:4, marginLeft:2 }}>
      Favorite Images
    </Typography>
    <Link to='/'>
    <Button variant="contained" color='primary' style={{height:'2rem',margin:4}}>Go to home</Button>
    </Link>
    </Box>
    <Box>
      <Grid container spacing={3} p={6}>
        {favorites.map((image, index) => (
          <Grid item key={index}>
            <Card style={{ maxWidth: 400 }}>
              <CardMedia
                component="img"
                alt={image.title}
                src={image.image}
                style={{ width: "100%" }}
                onLoad={(e) => {
                    // const aspectRatio = e.target.width / e.target.height;
                    // const calculatedHeight = 400 / aspectRatio; // Adjust 400 as needed
                    // e.target.style.height = `${calculatedHeight}px`;
                    e.target.style.height = "500px";
                  }}
              />
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle1" component="div">
                  {image.title}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Added By {image.name}
                </Typography>
                <FavoriteIcon
                  onClick={() => toggleFavorite(image)}
                  style={{
                    color: favorites.some((fav) => fav.title === image.title)
                      ? "red"
                      : "gray",
                    cursor: "pointer",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default Favorites;
