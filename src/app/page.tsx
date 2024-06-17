"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { movies$, IMovie } from "../utils/movies";
import LikeGauge from "../components/LikeGauge/LikeGauge";
import ItemsPerPage from "../components/ItemsPerPage/ItemsPerPage";
import MultiSelect from "../components/MultiSelect/MultiSelect";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GoTrash } from "react-icons/go";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const OMDB_API_KEY = "9e8c7186";

export default function Home() {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [nbMoviesDisplayed, setNbMoviesDisplayed] = useState<number>(8);
	const [moviesDisplayed, setMoviesDisplayed] = useState<IMovie[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [categories, setCategories] = useState<string[]>([]);
	const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

	const updateCategoriesFilters = (newCategoriesSelected: string[]) => {
		setCurrentPage(0);
		setCategoriesSelected(newCategoriesSelected);
	};

	const fetchMovies = async () => {
		const response = await movies$;

		const moviesWithPoster = await Promise.all(
			response.map(async (movie) => {
				const poster = await fetch(
					`https://www.omdbapi.com/?t=${movie.title.replace(" ", "+")}&y=${
						movie.year
					}&plot=full&apikey=${OMDB_API_KEY}`
				);

				return { ...movie, poster: (await poster.json()).Poster };
			})
		);

		// ----- LOG to test. Remove it ! -----
		console.log("moviesWithPoster", moviesWithPoster);

		setMovies(moviesWithPoster);
	};

	useEffect(() => {
		const result = movies
			.map((movie) => movie.category)
			.reduce((acc, category) => {
				if (!acc.includes(category)) return [...acc, category];
				else return acc;
			}, [] as string[]);

		setCategories(result);
	}, [movies]);

	useEffect(() => {
		fetchMovies();
	}, []);

	useEffect(() => {
		setMoviesDisplayed(
			movies
				.filter(
					(movie) =>
						categoriesSelected.length === 0 ||
						categoriesSelected.includes(movie.category)
				)
				.slice(
					currentPage * nbMoviesDisplayed,
					currentPage * nbMoviesDisplayed + nbMoviesDisplayed
				)
		);
	}, [movies, nbMoviesDisplayed, currentPage, categoriesSelected]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<main className={styles.main}>
				<h1 className={styles.title}>Movies List</h1>
				<div className={styles.categorySelector}>
					<MultiSelect
						categories={categories}
						categorySelected={categoriesSelected}
						setCategorySelected={updateCategoriesFilters}
					/>
				</div>
				<div className={styles.cardContainer}>
					{moviesDisplayed.map((movie) => {
						return (
							<div className={styles.card} key={movie.id}>
								<div className={styles.cardInformations}>
									<div className={styles.cardHeader}>
										<h2>{movie.title}</h2>
										<div
											onClick={() => {
												setMovies((prev) =>
													prev.filter((m) => m.id !== movie.id)
												);
												if (
													!movies
														.filter((m) => m.id !== movie.id)
														.find((m) => m.category === movie.category)
												)
													setCategoriesSelected((prev) =>
														prev.filter((c) => c !== movie.category)
													);
											}}
											className={styles.trashContainer}
										>
											<GoTrash />
										</div>
									</div>
									<p>{movie.category}</p>
									<LikeGauge
										likes={movie.likes}
										dislikes={movie.dislikes}
										movie={movie}
										setMovies={setMovies}
									/>
								</div>

								<div
									className={styles.cardPoster}
									style={{
										backgroundImage: `url(${movie.poster})`,
									}}
								></div>
							</div>
						);
					})}
				</div>

				{movies.filter(
					(movie) =>
						categoriesSelected.length === 0 ||
						categoriesSelected.includes(movie.category)
				).length > nbMoviesDisplayed && (
					<div className={styles.pagination}>
						<div className={styles.paginationTop}>
							<button
								onClick={() => setCurrentPage((prev) => prev - 1)}
								disabled={currentPage === 0}
								className={styles.button}
								style={{ opacity: currentPage === 0 ? 0.5 : 1 }}
							>
								Previous
							</button>
							<span>Page {currentPage + 1}</span>
							<button
								onClick={() => setCurrentPage((prev) => prev + 1)}
								disabled={
									(currentPage + 1) * nbMoviesDisplayed >=
									movies.filter(
										(movie) =>
											categoriesSelected.length === 0 ||
											categoriesSelected.includes(movie.category)
									).length
								}
								className={styles.button}
								style={{
									opacity:
										(currentPage + 1) * nbMoviesDisplayed >=
										movies.filter(
											(movie) =>
												categoriesSelected.length === 0 ||
												categoriesSelected.includes(movie.category)
										).length
											? 0.5
											: 1,
								}}
							>
								Next
							</button>
						</div>
						<ItemsPerPage
							nbMoviesDisplayed={nbMoviesDisplayed}
							setNbMoviesDisplayed={setNbMoviesDisplayed}
						/>
					</div>
				)}
			</main>
		</ThemeProvider>
	);
}
