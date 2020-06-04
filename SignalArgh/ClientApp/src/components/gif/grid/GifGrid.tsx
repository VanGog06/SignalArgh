import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { Grid } from '@giphy/react-components';

import {
    NotificationActions, triggerError
} from '../../../store/notifications/NotificationActions';
import styles from './GifGrid.module.scss';
import { IGifGridProps } from './IGifGridProps';

export const GifGrid: React.FC<IGifGridProps> = ({
  onGifClick,
  hideGifGrid,
}: IGifGridProps): JSX.Element => {
  const dispatch = useDispatch<Dispatch<NotificationActions>>();

  const giphyFetch: React.MutableRefObject<GiphyFetch | undefined> = useRef<
    GiphyFetch
  >();
  const gifGridRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const response: Response = await fetch("/api/giphy/key");
        const apiKey: string = await response.text();
        giphyFetch.current = new GiphyFetch(apiKey);
      } catch (err) {
        dispatch(triggerError(err.message));
      }
    })();
  });

  const fetchGifs = useCallback(
    (offset: number): Promise<GifsResult> => {
      if (giphyFetch.current) {
        return giphyFetch.current.trending({ offset, limit: 10 });
      }

      return new Promise((resolve) => {
        const emptyResult: GifsResult = {
          data: [] as IGif[],
        } as GifsResult;
        resolve(emptyResult);
      });
    },
    [giphyFetch]
  );

  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      const node: HTMLDivElement | null = gifGridRef.current;
      if (node && event.target) {
        if (!node.contains(event.target as Element)) {
          hideGifGrid();
        }
      }
    },
    [hideGifGrid]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick, false);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick, false);
    };
  }, [handleDocumentClick]);

  return (
    <div ref={gifGridRef} className={styles.gifGrid}>
      <Grid
        onGifClick={onGifClick}
        fetchGifs={fetchGifs}
        width={1200}
        columns={6}
        gutter={6}
      />
    </div>
  );
};
