
import React from 'react'
//these are our possible images
import image0 from "../images/jpg/image0.jpg";
import image1 from "../images/jpg/image1.jpg";
import image2 from "../images/jpg/image2.jpg";
import image3 from "../images/jpg/image3.jpg";
import image4 from "../images/jpg/image4.jpg";
import image5 from "../images/jpg/image5.jpg";
import image6 from "../images/jpg/image6.jpg";



//this component needs the state of the number of incorrect guesses
const Image = (props) => {
    const incorrectGuesses = props.incorrectGuesses;
    //We create an array with all the images
    const images = [image0, image1, image2, image3, image4, image5, image6, image6]
    //The right image will be our array with the number of incorrect guesses as index
    let rightImage = images[incorrectGuesses]

  //We return simply the image
  return (
        <img src={rightImage} alt="hangman" />
  )

}
export default Image;
