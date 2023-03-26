import { useState, useEffect, useCallback } from "react";
import Title from "./components/Title";
import Button from "./components/Button";
import Board from "./components/Board";

const cardImages = [
	{ src: "/images/helmet-1.png", value: 1, flipped: false, matched: false },
	{ src: "/images/potion-1.png", value: 2, flipped: false, matched: false },
	{ src: "/images/ring-1.png", value: 3, flipped: false, matched: false },
	{ src: "/images/scroll-1.png", value: 4, flipped: false, matched: false },
	{ src: "/images/shield-1.png", value: 5, flipped: false, matched: false },
	{ src: "/images/sword-1.png", value: 6, flipped: false, matched: false },
];

function App() {
	console.log("render");
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);

	// Compare 2 selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.value === choiceTwo.value) {
				setCards((prevCards) =>
					prevCards.map((card) => {
						if (card.value === choiceOne.value) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					})
				);
			} else {
				console.log("not match");
			}

			resetTurn();
		}
	}, [choiceOne, choiceTwo]);

	const shuffleCards = useCallback(() => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card, idx) => ({ ...card, id: idx + 1 }));

		setCards(shuffledCards);
		setTurns(0);
	}, []);

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurn) => prevTurn + 1);
	};

	const handleClickCard = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
		setCards((prevCards) =>
			prevCards.map((c) => ({
				...c,
				flipped:
					c.id === card.id ||
					c.id === choiceOne?.id ||
					c.id === choiceTwo?.id ||
					c.matched,
			}))
		);
	};
	return (
		<div className="App">
			<Title>MAGIC MEMORY</Title>
			<Button onClick={shuffleCards}>New game</Button>
			<Board cards={cards} onClickCard={handleClickCard} />
		</div>
	);
}

export default App;
