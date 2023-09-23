import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */


const fetchColors = async ({ name, hex, compName, compHex }) => {
  let colors = '';
  let filteredColors = '';

  // Fetch colors data
  const response = await fetch(COLORS)
    // Convert api response to json
    .then((response) => {
      colors = response.json();
      return colors;
    })
    // Filter colors data according to the filter that was passed to fetchColors
    .then((colors) => {
      if (name) {
        filteredColors = colors.filter((color) => color.name.toLowerCase().includes(name.toLowerCase()));
      }
      if (hex) {
        filteredColors = colors.filter((color) => color.hex === hex);
 
      }
      if (compName) {
        // Check comp for each color to see if it contains the compName that was passed to fetchColors
        function containsCompName(color){
          return color.name.toLowerCase().includes(compName.toLowerCase());  
        }
        filteredColors = colors.filter((color) => color.comp.find(containsCompName));
      }
      if (compHex){
        // Check comp for each color to see if it contains the compHex that was passed to fetchColors
        function containsCompHex(color) {
          return color.hex === compHex;
        }
        filteredColors = colors.filter((color) => color.comp.find(containsCompHex));
      } 

      });
    
  return filteredColors;

};



// Leave this here
export default fetchColors;
