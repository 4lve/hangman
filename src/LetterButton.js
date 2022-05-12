import { Button } from '@mui/material';

export default function LetterButton({ letter, index, addCharacter, guesses, word }) {
    return (
        <Button
          key={`letter-button-${index}`}
          variant="contained"
          color={!guesses.includes(letter) ? 'primary' : word.includes(letter) ? 'success' : 'error'}
          onClick={(e) => addCharacter(e.target.innerText.toUpperCase())}
        //style={{ minWidth: '50px', minHeight: '50px' }} 
        >{letter}</Button>
    )
}