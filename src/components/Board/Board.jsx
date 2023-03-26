import classNames from "classnames/bind";
import styles from "./Board.module.scss";
import Card from "../Card";

const cx = classNames.bind(styles);

function Board({ cards, onClickCard }) {
	return (
		<div className={cx("board")}>
			{cards &&
				cards.map((card) => (
					<Card
						key={card.id}
						card={card}
						onClick={onClickCard}
					/>
				))}
		</div>
	);
}

export default Board;
