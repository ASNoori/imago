// import './App.css';
import HomePage from "./HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ContributorPage from './ContributorPage';
import { Route,Routes } from "react-router-dom";
import { FavoriteProvider} from "./components/FavoritesContext";
import FavoritesPage from "./components/FavoritesPage";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark" for dark mode
    primary: {
      main: "#000000", // primary color
    },
    secondary: {
      main: "#FF4081", // secondary color
    },
    background: {
      default: "#fff", // default background color
      paper: "#fff", //  paper background color
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <FavoriteProvider>
   <Routes>
    <Route path="/" element = {<HomePage/>}/> 
    <Route path="/contributor" element = {<ContributorPage/>}/>
    <Route path="/favorites" element={<FavoritesPage/>} />
   </Routes>
   </FavoriteProvider>
   </ThemeProvider>

  );
}

export default App;


 

