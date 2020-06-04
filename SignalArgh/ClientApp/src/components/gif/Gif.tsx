import React, { useCallback, useState } from 'react';

import { IGif } from '@giphy/js-types';
import { Gif as GifComponent } from '@giphy/react-components';

import gif from '../../gif.svg';
import styles from './Gif.module.scss';
import { GifGrid } from './grid/GifGrid';

export const Gif: React.FC = (): JSX.Element => {
  const [showGifGrid, setShowGifGrid] = useState<boolean>(false);
  const [selectedGif, setSelectedGid] = useState<IGif | undefined>();

  const handleGifClick = useCallback(
    (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => {
      e.preventDefault();
      setSelectedGid(gif);
    },
    [setSelectedGid]
  );

  const handleShowGifGrid = useCallback(() => {
    setShowGifGrid((pv: boolean) => !pv);
  }, [setShowGifGrid]);

  return (
    <div className={styles.gifs}>
      <img
        className={styles.gifs__img}
        width={15}
        height={15}
        src={gif}
        alt="Gif picker icon"
        onClick={handleShowGifGrid}
      />
      {showGifGrid && <GifGrid onGifClick={handleGifClick} />}
      {/* {selectedGif && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, .8)",
          }}
          onClick={(e) => {
            e.preventDefault();
            setSelectedGid(undefined);
          }}
        >
          <GifComponent gif={selectedGif} width={200} />
        </div>
      )} */}
    </div>
  );
};
