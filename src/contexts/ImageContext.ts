import { createContext, SetStateAction } from "react";

const ImageContext = createContext({
  imageUrl: "/default-image.png",
  setImageUrl: (newvalue: SetStateAction<string>) => {},
});

export default ImageContext;
