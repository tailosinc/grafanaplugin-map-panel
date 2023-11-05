import { stylesFactory } from '@grafana/ui';
import { css, cx } from '@emotion/css';
import React, { useState } from 'react';

interface Props {
  imageUrl: string;
  downloadUrl: string;
  width: number;
  height: number;
}

export const ImageDisplayPanel: React.FC<Props> = ({
  imageUrl, downloadUrl, width, height,
}) => {
  const styles = getStyles();
  const [displayDownload, setDisplayDownload] = useState(false);

  const DownloadFile = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadUrl.substr(downloadUrl.lastIndexOf('/') + 1);
    link.click();
  };

  return (
    <>
      <img
        src={imageUrl || ''}
        onError={() => {
          setDisplayDownload(false);
          throw new Error('No map image available!');
        }}
        onLoad={() => setDisplayDownload(true)}
        className={cx(
          css`
              width: ${width}px;
              height: ${height}px;
            `,
        )}
      />
      {displayDownload && (
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
      )}
    </>
  );
};

const getStyles = stylesFactory(() => ({
  downloadButton: css`
      height: 2rem;
      width: 2rem;
      font-size: 1.5rem;

      position: absolute;
      right: 20px;
      bottom: 20px;
      border-radius: 50%;

      background-color: #6f00df;
      color: #ffffff;
      text-align: center;
    `,
}));
