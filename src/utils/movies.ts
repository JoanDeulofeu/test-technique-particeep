export interface IMovie {
	id: string;
	title: string;
	category: string;
	likes: number;
	dislikes: number;
	year: number;
	poster?: string;
	likeStatus?: "liked" | "disliked" | undefined;
}

const movies: IMovie[] = [
	{
		id: "1",
		title: "Ocean's 8",
		category: "Comedy",
		likes: 4,
		dislikes: 1,
		year: 2018,
	},
	{
		id: "2",
		title: "Midnight Sun",
		category: "Comedy",
		likes: 2,
		dislikes: 0,
		year: 2018,
	},
	{
		id: "3",
		title: "Incredibles 2",
		category: "Animation",
		likes: 3,
		dislikes: 1,
		year: 2018,
	},
	{
		id: "4",
		title: "A Quiet Place",
		category: "Thriller",
		likes: 6,
		dislikes: 6,
		year: 2018,
	},
	{
		id: "5",
		title: "Creed II",
		category: "Drame",
		likes: 16,
		dislikes: 2,
		year: 2018,
	},
	{
		id: "6",
		title: "Pulp Fiction",
		category: "Thriller",
		likes: 11,
		dislikes: 3,
		year: 1994,
	},
	{
		id: "7",
		title: "Pulp Fiction",
		category: "Thriller",
		likes: 12333,
		dislikes: 32,
		year: 1994,
	},
	{
		id: "8",
		title: "Seven",
		category: "Thriller",
		likes: 2,
		dislikes: 1,
		year: 1995,
	},
	{
		id: "9",
		title: "Inception",
		category: "Thriller",
		likes: 2,
		dislikes: 1,
		year: 2010,
	},
	{
		id: "10",
		title: "Gone Girl",
		category: "Thriller",
		likes: 22,
		dislikes: 12,
		year: 2014,
	},
];

export const movies$: Promise<IMovie[]> = new Promise((resolve, reject) =>
	setTimeout(resolve, 100, movies)
);
