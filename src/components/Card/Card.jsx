import classNames from "classnames/bind";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

function Card({ card, onClick }) {
	const handleClick = () => {
		onClick(card);
	};

	return (
		<div
			className={cx("card", {
				flipped: card.flipped,
			})}
		>
			<div>
				<img className={cx("front")} src={card.src} alt="card front" />
				<img
					className={cx("back")}
					src={"/images/cover.png"}
					alt="card front"
					onClick={handleClick}
				/>
			</div>
		</div>
	);
}

export default Card;
