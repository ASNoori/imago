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
import MaterialModal from "../contributor components/Modal";

const ImageGallery = ({ searchResults, favorites, toggleFavorite }) => {
  // for image modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [isimageModalOpen, setImageModalOpen] = useState(false);
  // -----------------------

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

  // open image modal
  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };
  // close image modal
  const closeImageModal = () => {
    setImageModalOpen(false);
  };
  // handle share url
  const handleShareUrl=async() =>{
      try{
          const urlToCopy = window.location.href;
          await navigator.clipboard.writeText(urlToCopy);
          alert('URL copied to clipboard!');
      }
      catch(err){
          console.error('Unable to copy url to clipboard',err);
      }
  }
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
                // will open image modal
                onClick={() => openImageModal(image)}
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
            <Box>
              <MaterialModal
                title={selectedImage ? selectedImage.title : ""}
                open={isimageModalOpen}
                onClose={closeImageModal}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    {selectedImage && (
                      <img
                        src={selectedImage.image}
                        alt={selectedImage.title}
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        background: "#000",
                        "&:hover": { background: "#000" },
                      }}
                      onClick={() => handleDownload(selectedImage)}
                    >
                      Download
                    </Button>
                    <Button onClick={() => handleShareUrl()}>
                      Share
                    </Button>
                  </Grid>
                </Grid>
              </MaterialModal>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGallery;
