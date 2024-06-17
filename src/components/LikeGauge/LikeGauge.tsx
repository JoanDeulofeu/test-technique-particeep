import { IMovie } from "@/utils/movies";
import styles from "./LikeGauge.module.css";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import React from "react";

export default function LikeGauge({
	likes,
	dislikes,
	movie,
	setMovies,
}: {
	likes: number;
	dislikes: number;
	movie: IMovie;
	setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
}) {
	const likesWidth = Math.round(
		((likes + (movie.likeStatus === "liked" ? 1 : 0)) * 100) /
			(likes +
				dislikes +
				(movie.likeStatus === "liked" || movie.likeStatus === "disliked"
					? 1
					: 0))
	);
	const dislikesWidth = 100 - likesWidth;

	return (
		<div className={styles.container}>
			<div className={styles.iconsContainer}>
				<div
					onClick={() =>
						setMovies((prev) =>
							prev.map((m) => {
								if (m.id !== movie.id) return m;
								else
									return {
										...m,
										likeStatus: m.likeStatus === "liked" ? undefined : "liked",
									};
							})
						)
					}
					className={styles.icon}
				>
					<BiSolidLike
						color={movie.likeStatus === "liked" ? "lime" : "white"}
					/>
					{likes + (movie.likeStatus === "liked" ? 1 : 0)}
				</div>
				<div
					onClick={() =>
						setMovies((prev) =>
							prev.map((m) => {
								if (m.id !== movie.id) return m;
								else
									return {
										...m,
										likeStatus:
											m.likeStatus === "disliked" ? undefined : "disliked",
									};
							})
						)
					}
					className={styles.icon}
				>
					<BiSolidDislike
						color={movie.likeStatus === "disliked" ? "red" : "white"}
					/>
					{dislikes + (movie.likeStatus === "disliked" ? 1 : 0)}
				</div>
			</div>
			<div className={styles.gauge}>
				<div className={styles.like} style={{ width: `${likesWidth}%` }}></div>
				<div
					style={{ width: `${dislikesWidth}%` }}
					className={styles.dislike}
				></div>
			</div>
		</div>
	);
}
