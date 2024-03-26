import { useState } from 'react';
import Card from './components/Card';
import { useEffect } from 'react';

function App() {
  const [arrayNumbers, setArrayNnumbers] = useState([]);
  const [countShowCard, setCountShowCard] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [initGame, setInitGame] = useState(true);
  const [winner,  setWinner] = useState(false);

  const numbers = [
    { number: 1, isHidden: true, pair: 1, isMatch: false},
    { number: 1, isHidden: true, pair: 1, isMatch: false},
    { number: 2, isHidden: true, pair: 2, isMatch: false},
    { number: 2, isHidden: true, pair: 2, isMatch: false},
    { number: 3, isHidden: true, pair: 3, isMatch: false},
    { number: 3, isHidden: true, pair: 3, isMatch: false},
    { number: 4, isHidden: true, pair: 4, isMatch: false},
    { number: 4, isHidden: true, pair: 4, isMatch: false},
    { number: 5, isHidden: true, pair: 5, isMatch: false},
    { number: 5, isHidden: true, pair: 5, isMatch: false},
    { number: 6, isHidden: true, pair: 6, isMatch: false},
    { number: 6, isHidden: true, pair: 6, isMatch: false},
  ];

  function shuffleArray(array) {
    const newArray = [...array];
    newArray.forEach((item, i) => {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[randomNum]] = [newArray[randomNum], newArray[i]];
    });
    setArrayNnumbers(newArray);
    if (initGame) {
      setTimeout(() => setInitGame(false), 2000);
    }
  };

  const showCard = (indexCard, number) => {
    if (countShowCard <= 1) {
      setCountShowCard(countShowCard + 1);
      const newArray =  arrayNumbers.map((card, index) => {
        if (index === indexCard) {
          setSelectedCard(countShowCard < 1 ? {...card, index: index} : selectedCard);
          return {...card, isHidden: false, isMatch: card.number === selectedCard?.number};
        } else if (index === selectedCard?.index && number === selectedCard?.number) {
          return {...card, isHidden: false, isMatch: true};
        }
        return card;
      });
      setArrayNnumbers(newArray);
    }
  };
  useEffect(() => {
    if (countShowCard === 2) {
      setTimeout(() => {
        const newArray =  arrayNumbers.map((card, index) => {
          if (card.isMatch) {
            return {...card, isHidden: false};
          }
          return {...card, isHidden: true};
        });
        setCountShowCard(0)
        setArrayNnumbers(newArray);
        setSelectedCard(null);
        const notWinner = newArray.some((item) => !item.isMatch);
        setWinner(!notWinner);
      }, 1000);
    }
  }, [countShowCard]);

  return (
    <>
    <div className='cards-container'>
      {
        arrayNumbers.map(((card, index) => <Card key={index} showCard={showCard} index={index} isHidden={initGame ? false : card.isHidden} number={card.number} isMatch={card.isMatch}/>))
      }
    </div>
      <button onClick={() => shuffleArray(numbers)}>Click</button>
      {
        winner &&
        <h1>Muy Bien ¡Ganaste!</h1>
      }
    </>
  )
}

export default App
