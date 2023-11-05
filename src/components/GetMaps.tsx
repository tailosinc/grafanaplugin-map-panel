import { useEffect, useState } from 'react';

const useMapData = (url: string, panelWidth: number, panelHeight: number, options: object) => {
  const [width, setImgWidth] = useState(0);
  const [height, setImgHeight] = useState(0);

  useEffect(() => {
    let width;
    let height;
    let aspectRatio;
    const img = new Image();
    img.onload = () => {
      width = img.width;
      height = img.height;
      let adjustedWidth = 0;
      let adjustedHeight = 0;
      if (width >= height) {
        aspectRatio = width / height;
        adjustedWidth = panelWidth;
        adjustedHeight = adjustedWidth / aspectRatio;
        if (adjustedHeight > panelHeight) {
          adjustedHeight = panelHeight;
          adjustedWidth = adjustedHeight * aspectRatio;
        }
      } else if (height > width) {
        aspectRatio = height / width;
        adjustedHeight = panelHeight;
        adjustedWidth = adjustedHeight / aspectRatio;
        if (adjustedWidth > panelWidth) {
          adjustedWidth = panelWidth;
          adjustedHeight = adjustedWidth * aspectRatio;
        }
      }
      setImgWidth(adjustedWidth);
      setImgHeight(adjustedHeight);
    };
    img.src = url;
  }, [panelWidth, panelHeight, url]);

  return {
    width,
    height,
  };
};

export default useMapData;
