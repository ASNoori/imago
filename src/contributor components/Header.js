import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Fab from "@mui/material/Fab";
import Divider from "@mui/material/Divider";
import {Box,Typography} from "@mui/material";

const BasicHeader = (props) => {
  return (
    <Box>
         <Box>
            <Box>
            <Box sx={{display:'flex',justifyContent:'flex-start'}}>
            <Fab
              variant="extended"
              type="button"
              // color="warning"
              aria-label="add"
              onClick={props.handleClick}
              disableFocusRipple
            //   sx={{ background: "#ed6c02",m:5}}
              sx={{ background: "#000",
              m:5,
              color:'white', 
              '&:hover': {
                background: "black", // Change background color on hover
                color: 'white', // Change text color on hover
              },}}
            >
              <AddCircleOutlineIcon sx={{ mr: 1,color:'white'}} />
              Add Image{props.title}
            </Fab>
          </Box>
          {/* <Typography variant="h4" sx={{ color: "var(--text-secondary)" }}>
            {props.title}
          </Typography>{" "} */}
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "black",marginBottom:'32px' }} />
      </Box>
  );
};

export default BasicHeader;
