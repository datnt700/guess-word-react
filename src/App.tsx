import './App.scss';
import titleImage from './assets/Word-Scramblle.svg';
import { useEffect, useRef, useState } from 'react';
import Toast from './components/Toast';
import { Information } from './components/Information';
import { InputContainer } from './components/InputContainer';

function App() {
  const words = ['react', 'angular', 'javascript', 'bootstrap', 'tailwind'];
  const [word, setWord] = useState(
    () => words[Math.floor(Math.random() * words.length)]
  );

  const [count, setCount] = useState(0);
  const [displayWord, setDisplayWord] = useState('');
  const [mistakes, setMistakes] = useState('');
  const [arrayResult, setArrayResult] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  const [borderStates, setBorderStates] = useState(
    new Array(word.length).fill('#97A3B6')
  );

  const toastRef = useRef<{ showToast: (msg: string) => void } | null>(null);

  const itemRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    initializeGame();
  }, [word]);

  const initializeGame = () => {
    const scrambledWord = shuffleWord(word);
    setDisplayWord(scrambledWord.join(' '));
    setIsReady(true);
    setBorderStates(new Array(word.length).fill('#97A3B6'));
    resetInputFields();
  };

  const resetInputFields = () => {
    itemRef.current?.forEach((input) => {
      if (input) input.value = '';
    });
    setArrayResult([]);
    setCount(0);
    setMistakes('');
  };

  const shuffleWord = (word: string) => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Fisher-Yates
    }
    return arr;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [, codeFieldIndex] = event.target.name.split('-');
    const { value } = event.target;
    const fieldIndex = parseInt(codeFieldIndex, 10);
    const updatedBorders = [...borderStates];

    if (word[fieldIndex] === value) {
      handleCorrectInput(fieldIndex, value, updatedBorders);
    } else {
      handleIncorrectInput(fieldIndex, value, updatedBorders);
    }
  };

  const handleCorrectInput = (
    fieldIndex: number,
    value: string,
    updatedBorders: string[]
  ) => {
    const nextField = itemRef.current[fieldIndex + 1];
    updatedBorders[fieldIndex] = '#7429C6';
    setArrayResult((prev) => [...prev, value]);
    setBorderStates(updatedBorders);

    if (nextField) {
      nextField.focus();
    }

    if (arrayResult.length + 1 === word.length && toastRef.current) {
      toastRef.current.showToast('You Win');
    }
  };

  const handleIncorrectInput = (
    fieldIndex: number,
    value: string,
    updatedBorders: string[]
  ) => {
    updatedBorders[fieldIndex] = 'red';
    setCount((prevCount) => prevCount + 1);
    setMistakes((prev) => (prev ? prev + ', ' + value : value));
    setBorderStates(updatedBorders);

    const currentField = itemRef.current[fieldIndex];
    if (currentField) {
      currentField.value = '';
      currentField.focus();
    }

    if (count >= 4 && toastRef.current) {
      toastRef.current.showToast('You lose');
      handleRandom();
    }
  };

  const handleRandom = () => {
    const newWord = getRandomWord(words);
    setWord(newWord !== word ? newWord : getRandomWord(words));
    itemRef.current[0]?.focus();
  };

  const getRandomWord = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const handleReset = () => {
    setDisplayWord('');
    setArrayResult([]);
    setCount(0);
    setMistakes('');
  };

  return (
    <>
      <div className="container">
        <Toast ref={toastRef} src="" />;
        <div className="card">
          <img className="title" src={titleImage} alt="" />

          <div className="random-word">
            <p className="text">{displayWord}</p>
          </div>

          <Information count={count} mistakes={mistakes} />
          <InputContainer
            isReady={isReady}
            word={word}
            itemRef={itemRef}
            borderStates={borderStates}
            handleChange={handleChange}
          />
          <div className="buttons">
            <button className="btn random" onClick={handleRandom}>
              Random
            </button>
            <button className="btn reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
