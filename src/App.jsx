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
	const [disabled, setDisabled] = useState(false);

	// Compare 2 selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
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
				resetTurn();
			} else {
				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card) => {
							if (card.id === choiceOne.id || card.id === choiceTwo.id) {
								return { ...card, flipped: false };
							} else {
								return card;
							}
						})
					);
					resetTurn();
				}, 1200);
			}
		}
	}, [choiceOne, choiceTwo]);

	const shuffleCards = useCallback(() => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card, idx) => ({ ...card, id: idx + 1 }));

		setCards(shuffledCards);
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(0);
	}, []);

	const resetTurn = () => {
		setDisabled(false);
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
			<Board
				cards={cards}
				disabled={disabled}
				onClickCard={handleClickCard}
			/>
			{cards.length > 0 && <Title>Turns: {turns}</Title>}
		</div>
	);
}

export default App;
