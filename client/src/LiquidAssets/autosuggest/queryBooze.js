
import axios from 'axios';

const getBoozeSuggestions = (query) => {
  // This constructor function returns a promise containing a function that returns our data once the axios call has been resolved so that data can be passed into other areas such as in line 169 above.  "resolved" and then maps over the response.data.     
  return new Promise((resolve, reject) => {
      axios.get(`/api/alcohol?=${query}`)
          .then((response) => {
              // We set gottenBoozeSuggestions equal to a  map that maps over the data from the api call which we will return from the function.  Map takes one argument that can be named whatever you want.  We are next setting the value of brandstyle from the response to the 'label:' key because this is the format that we need our data in for the IntegrationAutosuggest component to handle it correctly.
              let gottenBoozeSuggestions = response.data.map( (boozeData) => {
                  // We are returning the data in exactly the format that we need it in for the suggestions array in our state above, so that it plugs in nicely to the component.
                  return { label: boozeData.brandstyle }
              })
            //   console.log(gottenBoozeSuggestions)
              // this resolve method is where we are passing 
              resolve(gottenBoozeSuggestions)

          })
          .catch((error) => {
              console.log(error);
              reject(error);
          });
  })
}

export const getImageAndNotes = (query) => {
  // This constructor function returns a promise containing a function that returns our data once the axios call has been resolved so that data can be passed into other areas such as in line 169 above.  "resolved" and then maps over the response.data.     
  return new Promise((resolve, reject) => {
      axios.get(`/api/alcohol/brandStyle?${query}`)
          .then((response) => {
              // We set gottenBoozeSuggestions equal to a  map that maps over the data from the api call which we will return from the function.  Map takes one argument that can be named whatever you want.  We are next setting the value of brandstyle from the response to the 'label:' key because this is the format that we need our data in for the IntegrationAutosuggest component to handle it correctly.
              let imagesAndNotes = response.data.map( (boozeData) => {
                  // We are returning the data in exactly the format that we need it in for the suggestions array in our state above, so that it plugs in nicely to the component.
                  return { 
                    image: boozeData.image,
                    tastingNotes: boozeData.tastingNotes
                          }
              })
            //   console.log(gottenBoozeSuggestions)
              // this resolve method is where we are passing 
              resolve(imagesAndNotes)

          })
          .catch((error) => {
              console.log(error);
              reject([]);
          });
  })
}

export const getBoozeSizeSuggestions = (query) => {
  // This constructor function returns a promise containing a function that returns our data once the axios call has been resolved so that data can be passed into other areas such as in line 169 above.  "resolved" and then maps over the response.data.     
  return new Promise((resolve, reject) => {
      axios.get(`/api/alcohol/brandStyle?${query}`)
          .then((response) => {
              // We set gottenBoozeSuggestions equal to a  map that maps over the data from the api call which we will return from the function.  Map takes one argument that can be named whatever you want.  We are next setting the value of brandstyle from the response to the 'label:' key because this is the format that we need our data in for the IntegrationAutosuggest component to handle it correctly.
              let items = response.data.map(item => item.sizeML);

              if (!items || items.length === 0) {
                console.log("No matching sizeML");
                resolve("");
              }
              items = Array.from(new Set(items).values());
              items = items.map(boozeData => {
                // We are returning the data in exactly the format that we need it in for the suggestions array in our state above, so that it plugs in nicely to the component.
                return { label: boozeData }
              })
            //   console.log(gottenBoozeSuggestions)
              // this resolve method is where we are passing 
              resolve(items)
          })
          .catch((error) => {
              console.log(error);
              reject(error);
          });
  })
}

export default getBoozeSuggestions;