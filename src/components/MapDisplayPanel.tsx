import { css } from '@emotion/css';

import { PanelProps } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import React from 'react';
import { SimpleOptions } from 'types';

import useMapData from './GetMaps';
import { ImageDisplayPanel } from './ImageDisplayPanel';


interface Props extends PanelProps<SimpleOptions> { }

const isValidUrl = (url: string) => /^(http|https):\/\/[^ "]+$/.test(url);

export const MapDisplayPanel: React.FC<Props> = ({
  options, data, width, height,
}) => {
  const styles = getStyles();

  const parsedData = JSON.parse(data.series[0].fields[0].values.get(0));
  const displayUrl = parsedData.layers.cleaning;
  const downloadUrl = parsedData.mapBundle ?? displayUrl;

  const { width: mediaWidth, height: mediaHeight } = useMapData(displayUrl, width, height, options);

  if (!isValidUrl(displayUrl) || !isValidUrl(downloadUrl)) {
    return (
      <div className={styles.panel}>
        <div className={styles.wrapper}>
          ERROR: Data source must return a valid image or video URL, like `https://grafana.com/media/images/logos/grafana-logo-footer.svg`
        </div>
      </div>
    );
  }


  return (
    <div className={styles.panel}>
      <div className={styles.wrapper}>
       <ImageDisplayPanel 
       imageUrl={displayUrl} 
       downloadUrl={downloadUrl} 
       width={mediaWidth} 
       height={mediaHeight} />
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
}));
