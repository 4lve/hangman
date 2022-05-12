# Hangman By Alve

### This project was made at SVT during my work experience (PRAO in swedish)

### Running the project

* Clone this reop or download the zip file
* Use `npm install` to install all dependencies
* `npm start` will start a devlopment server
* `npm build` to build the project

### The code is made to be very customizible, some examples:

All images can be changed and the code will adapt, even if you use less or more images.
```javascript
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
```

Customiable default tries
```javascript
const [triesLeft, setTriesLeft] = useState(6);
```

Customizable Button Colors in `themeOptions.js` using Material UI (mui)


Customizable word generator, The return should be a uppercased word
```javascript
// Get a random word from the API
const generateWord = async () => {
    console.log('Generating word...');
    const res = await axios.get('https://random-words-api.vercel.app/word')
    return res.data[0].word.toUpperCase();
}
```

Keyboard Buttons and accepted characters can be changed in:
```javascript
const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
```
Note: Order matters

Keyboard seperation: (This will separate the keyboard at key 10 and 19)
```javascript
if (index === 10 || index === 19)
```