import { BaseEmoji, EmojiData, Picker } from 'emoji-mart';
import React, { useCallback, useState } from 'react';

import smiley from '../../smiley.svg';
import styles from './Emojis.module.scss';
import { IEmojisProps } from './IEmojisProps';

export const Emojis: React.FC<IEmojisProps> = ({
  changeEmoji,
}: IEmojisProps): JSX.Element => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleEmojiSelect = (emojiData: EmojiData) => {
    const emoji: string = (emojiData as BaseEmoji)?.native;
    changeEmoji(emoji);
  };

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
        <Picker
          style={{ position: "absolute", top: "1.5rem", right: "0" }}
          native
          emojiTooltip
          onSelect={handleEmojiSelect}
        />
      )}
    </div>
  );
};
