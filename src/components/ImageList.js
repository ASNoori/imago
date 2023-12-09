// ImageGallery.js
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardHeader,
} from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { saveAs } from "file-saver";

const ImageGallery = ({ searchResults,favorites,toggleFavorite}) => {
  console.log(searchResults);
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await api.get('/image');
  //       console.log(response.data)
  //       setImages(response.data);
  //     } catch (error) {
  //       console.error('Error fetching images:', error);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  // Filter images based on searchResults
  // const filteredImages = Array.isArray(searchResults) && searchResults.length > 0
  //     ? images.filter(image =>
  //         searchResults.some(result =>
  //           result.title.toLowerCase().includes(image.title.toLowerCase())
  //         )
  //       )
  //     : images;
  // console.log('filterimages:',filteredImages);
  // console.log('searchreslt',searchResults);
  // console.log('Image Titles:', images.map(image => image.title));
  // console.log(searchResults);

  const handleDownload = (image) => {
    try {
      if (!image || !image.image) {
        console.error("Invalid image object:", image);
        return;
      }

      console.log("Downloading image:", image);

      // Remove the data URI prefix
      const base64String = image.image.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      // Create a Blob from the base64 string
      const blob = b64toBlob(base64String, "image/jpeg");

      // Use file-saver to save the Blob as a file
      saveAs(blob, `${image.title} by ${image.name}.jpeg`);

      console.log("Image downloaded successfully");
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // Function to convert base64 to Blob
  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };
  return (
    
    <Box id="imagegallery">
      <Grid container spacing={3} p={6}>
      {/* {!searchResults.length && (
          <p style={{ textAlign: 'center'}}>Loading...</p>
        )} */}
        {searchResults.map((image, index) => (
          <Grid item key={index}>
            <Card style={{ maxWidth: 400 }}>
              <CardHeader
                action={
                  <Button onClick={() => handleDownload(image)}>
                    <DownloadForOfflineIcon />{" "}
                  </Button>
                }
              />
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
  );
};

export default ImageGallery;
