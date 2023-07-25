import { useEffect, useState } from 'react';

const useMapData = (url: string, width: number, height: number, options: object) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    let imgWidth;
    let imgHeight;
    let aspectRatio;
    const img = new Image();
    img.onload = () => {
      imgWidth = img.width;
      imgHeight = img.height;
      let adjustedWidth = 0;
      let adjustedHeight = 0;
      if (imgWidth >= imgHeight) {
        aspectRatio = imgWidth / imgHeight;
        adjustedWidth = width;
        adjustedHeight = adjustedWidth / aspectRatio;
        if (adjustedHeight > height) {
          adjustedHeight = height;
          adjustedWidth = adjustedHeight * aspectRatio;
        }
      } else if (imgHeight > imgWidth) {
        aspectRatio = imgHeight / imgWidth;
        adjustedHeight = height;
        adjustedWidth = adjustedHeight / aspectRatio;
        if (adjustedWidth > width) {
          adjustedWidth = width;
          adjustedHeight = adjustedWidth * aspectRatio;
        }
      }
      setImgWidth(adjustedWidth);
      setImgHeight(adjustedHeight);
    };
    img.src = url;
  }, [width, height, url]);

  const states = {
    imgWidth,
    imgHeight,
  };

  return {
    states,
  };
};

export default useMapData;
