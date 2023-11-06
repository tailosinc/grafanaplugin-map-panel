import { css } from '@emotion/css';

import { PanelProps } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';
import React from 'react';
import { SimpleOptions } from 'types';

import useMapData from './GetMaps';
import { ImageDisplayPanel } from './ImageDisplayPanel';
import { VideoDisplayPanel } from './VideoDisplayPanel';


interface Props extends PanelProps<SimpleOptions> { }

const isImageFile = (url: string) => /\.(gif|jpe?g|tiff?|png|webp|bmp)(\?|$)/i.test(url);
const isVideoFile = (url: string) => /\.(mp4|webm|ogg|mkv)(\?|$)/i.test(url);

const renderSwitch = (props: any) => {
  const { videoUrl, imageUrl, downloadUrl, mediaWidth, mediaHeight } = props;
  if (!isImageFile(imageUrl) && !isVideoFile(videoUrl)) {
    return <>
      ERROR: Data source must return a valid image or video URL, like `https://grafana.com/media/images/logos/grafana-logo-footer.svg`
    </>;
  }

  if (isVideoFile(videoUrl)) {
    return <VideoDisplayPanel
      videoUrl={videoUrl}
      imageUrl={imageUrl}
      downloadUrl={downloadUrl}
      width={mediaWidth}
      height={mediaHeight}
    />;
  }

  return <ImageDisplayPanel
    imageUrl={imageUrl}
    downloadUrl={downloadUrl}
    width={mediaWidth}
    height={mediaHeight}
  />;
}

export const MapDisplayPanel: React.FC<Props> = ({
  options, data, width, height,
}) => {
  const styles = getStyles();

  const parsedData = JSON.parse(data.series[0].fields[0].values.get(0));
  let imageUrl = parsedData.layers?.cleaning;
  const videoUrl = parsedData.video?.cleaning;
  const downloadUrl = parsedData.mapBundle || videoUrl || imageUrl;

  const { width: mediaWidth, height: mediaHeight } = useMapData(imageUrl, width, height, options);

  const props = { videoUrl, imageUrl, downloadUrl, mediaWidth, mediaHeight }
  return (
    <div className={styles.panel}>
      <div className={styles.wrapper}>
        {renderSwitch(props)}
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
