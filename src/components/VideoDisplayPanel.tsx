import { stylesFactory } from '@grafana/ui';
import { css, cx } from '@emotion/css';
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
  const styles = getStyles();

  const DownloadFile = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadUrl.substr(downloadUrl.lastIndexOf('/') + 1);
    link.click();
  };

  return (
    <>
      <video 
        src={videoUrl} 
        controls={true}
        width={width}
        height={height}
        poster={imageUrl}
        loop={false}
        muted={true}
        preload='auto'
        onError={(e) => console.log('Error playing video', e)}
        className={cx(
          css`
              width: ${width}px;
              height: ${height}px;
            `,
        )}
      />
              <a
          target="_blank"
          rel="noopener noreferrer"
          href={imageUrl}
          download
          className={styles.downloadButton}
          onClick={(e) => DownloadFile()}
        >
          <i className="fa fa-download" />
        </a>
    </>
  );
};

const getStyles = stylesFactory(() => ({
  downloadButton: css`
      height: 2rem;
      width: 2rem;
      font-size: 1.5rem;

      position: absolute;
      left: 20px;
      top: 20px;
      text-shadow: 0 0 3px #000;

      color: #ffffff;
      text-align: center;
    `,
}));
