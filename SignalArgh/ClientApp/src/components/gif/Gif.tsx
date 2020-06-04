import React, { useCallback, useState } from 'react';

import { IGif } from '@giphy/js-types';
import { Gif as GifComponent } from '@giphy/react-components';

import { GifGrid } from './grid/GifGrid';

export const Gif: React.FC = (): JSX.Element => {
  const [selectedGif, setSelectedGid] = useState<IGif | undefined>();

  const handleGifClick = useCallback(
    (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => {
      e.preventDefault();
      setSelectedGid(gif);
    },
    [setSelectedGid]
  );

  return (
    <>
      <GifGrid onGifClick={handleGifClick} />
      {selectedGif && (
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
      )}
    </>
  );
};
