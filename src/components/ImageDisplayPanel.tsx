import { PanelProps } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from '@emotion/css';
import React, { useState } from 'react';
import { SimpleOptions } from 'types';

import useMapData from './GetMaps';

interface Props extends PanelProps<SimpleOptions> { }

const isValidUrl = (url: string) => /^(http|https):\/\/[^ "]+$/.test(url);

export const ImageDisplayPanel: React.FC<Props> = ({
  options, data, width, height,
}) => {
  const styles = getStyles();

  const parsedData = JSON.parse(data.series[0].fields[0].values.get(0));
  const displayUrl = parsedData.layers.cleaning;
  const downloadUrl = parsedData.mapBundle ?? displayUrl;

  const { states } = useMapData(displayUrl, width, height, options);
  const [displayDownload, setDisplayDownload] = useState(false);

  if (!isValidUrl(displayUrl) || !isValidUrl(downloadUrl)) {
    return (
      <div className={styles.panel}>
        <div className={styles.wrapper}>
          ERROR: Data source must return a valid image URL, like `https://grafana.com/media/images/logos/grafana-logo-footer.svg`
        </div>
      </div>
    );
  }

  const { imgWidth, imgHeight } = states;
  const displayWidth = imgWidth;
  const displayHeight = imgHeight;


  const DownloadFile = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadUrl.substr(downloadUrl.lastIndexOf('/') + 1);
    link.click();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.wrapper}>
        <img
          src={displayUrl || ''}
          onError={() => {
            setDisplayDownload(false);
            throw new Error('No map image available!');
          }}
          onLoad={() => setDisplayDownload(true)}
          className={cx(
            css`
              width: ${displayWidth}px;
              height: ${displayHeight}px;
            `,
          )}
        />
        {displayDownload && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={displayUrl}
            download
            className={styles.downloadButton}
            onClick={(e) => DownloadFile()}
          >
            <i className="fa fa-download" />
          </a>
        )}
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => ({
  panel: css`
      display: flex;
      justify-content: center;
      align-items: flex-end;
    `,
  wrapper: css`
      padding: 10px;
      position: relative;
    `,
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
