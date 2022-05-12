import { Button, Slider, Box, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { themeOptions } from './themeOptions';
import GameDialog from './GameDialog';
import LetterButton from './LetterButton';

const hangmanImg = [
    require('./img/0.jpg'),
    require('./img/1.jpg'),
    require('./img/2.jpg'),
    require('./img/3.jpg'),
    require('./img/4.jpg'),
    require('./img/5.jpg'),
    require('./img/6.jpg'),
    require('./img/7.jpg'),
    require('./img/8.jpg'),
    require('./img/9.jpg'),
    require('./img/10.jpg'),
    require('./img/hang-gif.gif'),
]



function App() {

  const defaultTries = 6;

  const [guesses, setGuesses] = useState([]);
  const [word, setWord] = useState('LOADING WORD'); //Needs to be uppercase else you won't be able to win
  const [tries, setTries] = useState(defaultTries);
  const [dialogOpen, setdialogOpen] = useState(false);
  const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  const [image, setImage] = useState(hangmanImg[0]);
  const [dialogText, setdialogText] = useState(['title', 'text']);
  const [lostGame, setLostGame] = useState(false);
  const [triesLeft, setTriesLeft] = useState(defaultTries);

  // Function to add characters to the guesses array
  const addCharacter = (char) => {
    if(lostGame) return;
    if (!alphabet.includes(char)) return;
    if (guesses.includes(char)) return;
    setGuesses([...guesses, char]);
  }


  // Win game functiion
  const winGame = async (mistakes) => {
    setdialogText(['You won!', 'You guessed the word in ' + mistakes + ' mistakes.']);
    setdialogOpen(true)
  }

  //Lose game function
  const loseGame = async () => {
    setLostGame(true);
    setdialogText(['You lost!', 'The word was ' + word]);
    setdialogOpen(true)
  }

  // Check game state
  useEffect(() => {
    let wrongGuesses = 0;
    let hasWon = true;
    // Win cheking
    for (let i = 0; i < word.length; i++) {
      if (word[i] === ' ') continue;
      if (!guesses.includes(word[i])) {
        hasWon = false;
      }
    }
    // Lose checking
    for (let i = 0; i < guesses.length; i++) {
      if (!word.includes(guesses[i])) wrongGuesses++;
    }
    if (hasWon) {
      winGame(wrongGuesses)
    } else if (wrongGuesses >= tries) {
      loseGame()
    }
    setTriesLeft(tries - wrongGuesses);
    // Set hangman image
    const loseProcentage = wrongGuesses / tries;
    setImage(hangmanImg[parseInt(loseProcentage * (hangmanImg.length - 1))]);


  }, [guesses, word]);

  // Get a random word from the API
  const generateWord = async () => {
    const res = await axios.get('https://random-words-api.vercel.app/word')
    return res.data[0].word.toUpperCase();
  }

  //Resets the game
  const resetGame = async () => {
    setLostGame(false);
    setdialogOpen(false);
    setGuesses([]);
    setWord(await generateWord());
  }

  // Ran on first render
  useEffect(() => {
    resetGame();
  }, []);

  // Register keypresses
  window.onkeyup = (e) => {
    addCharacter(e.key.toUpperCase());
  }


  return (
    <ThemeProvider theme={themeOptions}>
      <Box className='app' m={'10%'} >

        <GameDialog dialogOpen={dialogOpen} resetGame={resetGame} dialogText={dialogText} img={hangmanImg[hangmanImg.length - 1]} />

        <h2>Hangman by Alve</h2>
        <div>
          <img src={image} />
        </div>
        {`Tries Left ${triesLeft}`}

        <div className='word'>
          {
            word.split('').map((char, i) => {
              // If the character is in the guesses array, show it
              if (char === ' ') {
                return (<span id='hidden' key={i}>&nbsp;&nbsp;&nbsp;</span>)
              } else if (guesses.includes(char)) {
                return (<span id='shown' key={i}>{char}</span>)
              } else {
                return (<span id='hidden' key={i}>_&nbsp;</span>)
              }
            })
          }
        </div>

        <div className='guesses'>
          {
            alphabet.split('').map((letter, index) => {
              // QWERTY keyboard
              if (index === 10 || index === 19) {
                return [<br key={`br-${index}`}/>, <LetterButton key={index} letter={letter} index={index} addCharacter={addCharacter} word={word} guesses={guesses} />]
              } else {
                return <LetterButton key={index} letter={letter} index={index} addCharacter={addCharacter} word={word} guesses={guesses} />
              }
            })
          }
        </div>
        
        <div className='tries'>
          <Slider
            key={'slider'}
            defaultValue={defaultTries}
            step={1}
            marks={[{ value: 1, label: '1 Try' },  { value: 20, label: '20 Tries' }]}
            valueLabelDisplay="auto"
            disabled={guesses.length > 0}
            min={1}
            max={20}
            style={{ width: '15%' }}
            onChange={(e, value) => {
              setTries(value)
              setTriesLeft(value)
            }}
          />
        </div>

        <div className='reset'>
          <Button
            key={'reset'}
            variant="contained"
            color="secondary"
            onClick={resetGame}
            disabled={guesses.length <= 0}
          >
            Reset
          </Button>
        </div>

      </Box>
    </ThemeProvider>
  );
}

export default App;
