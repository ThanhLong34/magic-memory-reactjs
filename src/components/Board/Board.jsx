import classNames from "classnames/bind";
import styles from "./Board.module.scss";
import Card from "../Card";

const cx = classNames.bind(styles);

function Board({ cards, disabled, onClickCard }) {
	const handleClickCard = (card) => {
		!disabled && onClickCard(card);
	}

	return (
		<div className={ cx("board", {
			disabled,
		})}>
			{cards &&
				cards.map((card) => (
					<Card
						key={card.id}
						card={card}
						onClick={handleClickCard}
					/>
				))}
		</div>
	);
}

export default Board;
