export interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
  quality: string;
  cast: string[];
  type: 'movie' | 'series';
  uploadDate: string;
  releaseDate: string;
  rating: string; // Dummy IMDB rating
  seasons?: number[]; // For series
}

export const popularMovies: Movie[] = [
  {
    id: 1,
    title: 'The Matrix',
    description:
      'A computer hacker learns about the true nature of his reality.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    type: 'movie',
    uploadDate: '2022-01-01',
    releaseDate: '1999-03-31',
    rating: '8.7',
  },
  {
    id: 2,
    title: 'Inception',
    description:
      'A thief steals corporate secrets through dream-sharing technology.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    type: 'movie',
    uploadDate: '2022-02-01',
    releaseDate: '2010-07-16',
    rating: '8.8',
  },
  {
    id: 3,
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    type: 'movie',
    uploadDate: '2022-03-01',
    releaseDate: '2014-11-07',
    rating: '8.8',
  },
  {
    id: 4,
    title: 'The Dark Knight',
    description: 'Batman faces the Joker in Gotham City.',
    image: 'https://via.placeholder.com/150',
    quality: 'Full HD',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    type: 'movie',
    uploadDate: '2022-04-01',
    releaseDate: '2008-07-18',
    rating: '8.8',
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    description:
      'The lives of two mob hitmen intertwine in a series of events.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    type: 'movie',
    uploadDate: '2022-05-01',
    releaseDate: '1994-10-14',
    rating: '8.8',
  },
  {
    id: 6,
    title: 'Forrest Gump',
    description:
      'The story of Forrest Gump, a man with a low IQ who achieves great things.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    type: 'movie',
    uploadDate: '2022-06-01',
    releaseDate: '1994-07-06',
    rating: '8.8',
  },
  {
    id: 7,
    title: 'Gladiator',
    description: 'A former Roman General sets out to exact vengeance.',
    image: 'https://via.placeholder.com/150',
    quality: 'Full HD',
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
    type: 'movie',
    uploadDate: '2022-07-01',
    releaseDate: '2000-05-05',
    rating: '8.8',
  },
  {
    id: 8,
    title: 'Titanic',
    description:
      'A young aristocrat falls in love with a kind but poor artist aboard the Titanic.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
    type: 'movie',
    uploadDate: '2022-08-01',
    releaseDate: '1997-12-19',
    rating: '8.8',
  },
  {
    id: 9,
    title: 'Avatar',
    description:
      'A Marine dispatched to Pandora becomes torn between orders and protecting an alien civilization.',
    image: 'https://via.placeholder.com/150',
    quality: 'Full HD',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    type: 'movie',
    uploadDate: '2022-09-01',
    releaseDate: '2009-12-18',
    rating: '8.8',
  },
  {
    id: 10,
    title: 'The Lord of the Rings',
    description:
      'A meek Hobbit and his companions set out to destroy the powerful One Ring.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
    type: 'movie',
    uploadDate: '2022-10-01',
    releaseDate: '2001-12-19',
    rating: '8.8',
  },
  // 5 Popular Series
  {
    id: 11,
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher turns to a life of crime.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Bryan Cranston', 'Aaron Paul'],
    type: 'series',
    uploadDate: '2022-11-01',
    releaseDate: '2008-01-20',
    seasons: [1, 2, 3, 4, 5],
    rating: '8.8',
  },
  {
    id: 12,
    title: 'Game of Thrones',
    description: 'Noble families vie for control of the Iron Throne.',
    image: 'https://via.placeholder.com/150',
    quality: 'Full HD',
    cast: ['Emilia Clarke', 'Kit Harington'],
    type: 'series',
    uploadDate: '2022-12-01',
    releaseDate: '2011-04-17',
    seasons: [1, 2, 3, 4, 5],
    rating: '8.8',
  },
  {
    id: 13,
    title: 'Stranger Things',
    description:
      'A group of kids uncover supernatural forces in their small town.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard'],
    type: 'series',
    uploadDate: '2023-01-01',
    releaseDate: '2016-07-15',
    rating: '8.8',
  },
  {
    id: 14,
    title: 'The Crown',
    description:
      'The reign of Queen Elizabeth II is dramatized in this series.',
    image: 'https://via.placeholder.com/150',
    quality: 'HD',
    cast: ['Olivia Colman', 'Tobias Menzies'],
    type: 'series',
    uploadDate: '2023-02-01',
    releaseDate: '2016-11-04',
    rating: '8.8',
  },
  {
    id: 15,
    title: 'The Mandalorian',
    description: 'A lone bounty hunter in the outer reaches of the galaxy.',
    image: 'https://via.placeholder.com/150',
    quality: 'Full HD',
    cast: ['Pedro Pascal', 'Gina Carano'],
    type: 'series',
    uploadDate: '2023-03-01',
    releaseDate: '2019-11-12',
    rating: '8.8',
  },
];
