import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import { Grid } from '@giphy/react-components';

import {
    NotificationActions, triggerError
} from '../../../store/notifications/NotificationActions';

export const GifGrid: React.FC<any> = ({ onGifClick }: any): JSX.Element => {
  const dispatch = useDispatch<Dispatch<NotificationActions>>();

  const giphyFetch: React.MutableRefObject<GiphyFetch | undefined> = useRef<
    GiphyFetch
  >();

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

  return (
    <Grid
      onGifClick={onGifClick}
      fetchGifs={fetchGifs}
      width={800}
      columns={3}
      gutter={6}
    />
  );
};
