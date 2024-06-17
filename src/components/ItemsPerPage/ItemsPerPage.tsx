import styles from "./ItemsPerPage.module.css";

const ItemsPerPage = ({
	nbMoviesDisplayed,
	setNbMoviesDisplayed,
}: {
	nbMoviesDisplayed: number;
	setNbMoviesDisplayed: (nbMovies: number) => void;
}) => {
	return (
		<div className={styles.container}>
			<div
				className={styles.item}
				style={{
					borderRadius: "10px 0px 0px 10px",
					border: `${nbMoviesDisplayed === 4 ? "3" : "1"}px solid #${
						nbMoviesDisplayed === 4 ? "fff" : "ccc"
					}`,
					fontWeight: `${nbMoviesDisplayed === 4 ? "bold" : "normal"}`,
				}}
				onClick={() => setNbMoviesDisplayed(4)}
			>
				4
			</div>
			<div
				className={styles.item}
				style={{
					border: `${nbMoviesDisplayed === 8 ? "3" : "1"}px solid #${
						nbMoviesDisplayed === 8 ? "fff" : "ccc"
					}`,
					fontWeight: `${nbMoviesDisplayed === 8 ? "bold" : "normal"}`,
				}}
				onClick={() => setNbMoviesDisplayed(8)}
			>
				8
			</div>
			<div
				className={styles.item}
				style={{
					borderRadius: "0px 10px 10px 0px",
					border: `${nbMoviesDisplayed === 12 ? "3" : "1"}px solid #${
						nbMoviesDisplayed === 12 ? "fff" : "ccc"
					}`,
					fontWeight: `${nbMoviesDisplayed === 12 ? "bold" : "normal"}`,
				}}
				onClick={() => setNbMoviesDisplayed(12)}
			>
				12
			</div>
		</div>
	);
};

export default ItemsPerPage;
