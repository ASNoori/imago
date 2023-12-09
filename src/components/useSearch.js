import React, { useEffect, useState } from 'react'
import {fetchdata } from '../api/fetchData';
const useSearch = () => {
    const [search,setSearch] = useState('');
    const [searchResults,setSearchResults] = useState([]);
    const handleSearchChange = (event) => {
        console.log('Search value:', event.target.value);
        setSearch(event.target.value);
      };
 console.log(search)
    // Fetch data from the API using the fetchPosts function
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchdata();
        console.log(fetchedPosts)
          // setSearchResults(fetchedPosts);
        const filteredResults = fetchedPosts.filter(
          (post) =>{
          if(search===''){
             return true;
          }
          // //   post.body.toLowerCase().includes(search.toLowerCase()) ||
           else if( post.title.toLowerCase().includes(search.toLowerCase())){
            return true;
           }
           else {
            return false; // Explicitly return false when conditions are not met
          }
         } );
        console.log('fr fromusesearch',filteredResults);
      //   // Pass the data to the useSearch hook
      // //  to display recent content first, we use reverse
        setSearchResults(filteredResults); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(()=>{
      fetchData();
    },[search])

    console.log('Search:', search);
    console.log('sr from usesearch',searchResults);
  return { search, searchResults, handleSearchChange };
}

export default useSearch