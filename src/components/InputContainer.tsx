import React from 'react';
import styles from './InputContainer.module.scss';
interface Props {
  isReady: boolean;
  word: string;
  borderStates: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  itemRef: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export const InputContainer = ({
  isReady,
  word,
  borderStates,
  handleChange,
  itemRef,
}: Props) => {
  return (
    <div className={styles['input-container']}>
      {isReady &&
        word.split('').map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (itemRef.current) {
                itemRef.current[index] = el;
              }
            }}
            name={`code-${index}`}
            type="text"
            className={styles.item}
            style={{
              borderColor: borderStates[index],
            }}
            maxLength={1}
            onChange={(event) => handleChange(event)}
            autoFocus={index === 0}
          />
        ))}
    </div>
  );
};
