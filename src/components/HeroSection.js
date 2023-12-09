import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import sunset from "../assets/sunset.jpg";
import { Link as ScrollLink } from "react-scroll";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section Using Bootstrap and Material UI */}
      {/* <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Your Content Here</h1>
          <p>Some text content.</p>
          <Button variant="contained" color="primary">
            Material-UI Button
          </Button>
        </div>
        <div className="col-md-6">
          <img src="your-image.jpg" alt="Your Image" className="img-fluid" />
        </div>
      </div>
    </div> */}

      <Box
        id="hero-section"
        sx={{
          backgroundColor: "#e2e5de",
          color: "#000",
          paddingTop: 10,
          paddingBottom: 10,
          textAlign: "center",
          height: "40%", //  the height of the hero section
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ marginTop: "3rem" }}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                Stunning Pics In A Single Click...
              </Typography>
              <Typography variant="subtitle1" component="p" gutterBottom>
                We are here to provide you with amazing images.
              </Typography>
              <ScrollLink
                to="imagegallery"
                spy={true}
                smooth={true}
                duration={500}
              >
                <Button variant="contained" color="warning">
                  Get Started
                </Button>
              </ScrollLink>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/*content for the second part */}
              <img
                src={sunset}
                alt="Heroimage description"
                style={{ width: "100%", height: "450px" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
