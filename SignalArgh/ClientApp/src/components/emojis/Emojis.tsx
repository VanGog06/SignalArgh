import { BaseEmoji, EmojiData, Picker } from 'emoji-mart';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import smiley from '../../smiley.svg';
import styles from './Emojis.module.scss';
import { IEmojisProps } from './IEmojisProps';

export const Emojis: React.FC<IEmojisProps> = ({
  changeEmoji,
}: IEmojisProps): JSX.Element => {
  const emojiWindowRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      const node: HTMLDivElement | null = emojiWindowRef.current;
      if (node && event.target) {
        if (!node.contains(event.target as Element)) {
          setShowEmojiPicker(false);
        }
      }
    },
    [setShowEmojiPicker]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick, false);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick, false);
    };
  }, [handleDocumentClick]);

  const handleEmojiSelect = useCallback(
    (emojiData: EmojiData) => {
      const emoji: string = (emojiData as BaseEmoji)?.native;
      changeEmoji(emoji);
    },
    [changeEmoji]
  );

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((pv: boolean) => !pv);
  }, [setShowEmojiPicker]);

  return (
    <div className={styles.emojis}>
      <img
        className={styles.emojis__img}
        width={15}
        height={15}
        src={smiley}
        alt="Emoji picker icon"
        onClick={toggleEmojiPicker}
      />
      {showEmojiPicker && (
        <div ref={emojiWindowRef} className={styles.emojis__picker}>
          <Picker onSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};
