// import { stylesFactory } from '@grafana/ui';
import { css, cx } from '@emotion/css';
import ReactPlayer from 'react-player'
// import React, { useState } from 'react';
import React from 'react';


interface Props {
  videoUrl: string;
  imageUrl: string;
  downloadUrl: string;
  width: number;
  height: number;
}

export const VideoDisplayPanel: React.FC<Props> = ({
  videoUrl, imageUrl, downloadUrl, width, height,
}) => {
  // const styles = getStyles();
  console.log(width, height)

  return (
    <>
      <ReactPlayer 
        url={videoUrl} 
        width={width}
        height={height}
        light={imageUrl}
        loop={true}
        volume={0}
        muted={true}
        playing={true}
        previewTabIndex={20}
        controls={true}
        className={cx(
          css`
              width: ${width}px;
              height: ${height}px;
            `,
        )}
        
      />
    </>
  );
};

// const getStyles = stylesFactory(() => ({
//   downloadButton: css`
//       height: 2rem;
//       width: 2rem;
//       font-size: 1.5rem;

//       position: absolute;
//       right: 20px;
//       bottom: 20px;
//       border-radius: 50%;

//       background-color: #6f00df;
//       color: #ffffff;
//       text-align: center;
//     `,
// }));
