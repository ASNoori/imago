import React,{useState,useEffect} from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Link as ScrollLink } from "react-scroll";
import { Button } from '@mui/material';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    // Show or hide the icon based on the scroll position
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Add a scroll event listener to handle scroll position changes
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount


  const handleClick = () => {
    // Scroll to the top of the page when the icon is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* <ArrowCircleUpIcon onClick={handleClick} /> */}
      <ScrollLink to="navbar" spy={true} smooth={true} duration={500}>
          <ArrowCircleUpIcon/>
        </ScrollLink>
    </div>
  );
};

export default Footer;
