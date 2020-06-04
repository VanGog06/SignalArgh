import { IGif } from '@giphy/js-types';

export interface IGifGridProps {
  onGifClick(gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>): void;
}
