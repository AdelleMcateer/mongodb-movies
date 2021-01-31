//Student Name: Adelle McAteer
//Student Number: 20091411
//Date: 10/01/2021

// Part 1: Read (find)
// A) Find all movies that star both Matthew McConaughey and Kate Hudson. Results show the 
//title, year, and cast. Sort the results to show the newest movie first. 
db.movies.find( {cast: {$all: ["Matthew McConaughey", "Kate Hudson"]}},{_id:0, title: 1, year: 1, cast: 1}).sort({ year: -1})

// B) Show the titles of all movies with an IMDB rating of more than 9 and a Rotten Tomatoes 
// rating greater than 4. Sort the movies based on their IMDB rating, showing the highest-rated 
// movies first, and only show the top three results. 
db.movies.find({ $and: [{"imdb.rating": { $gt: 9 }}, {"tomatoes.viewer.rating": {$gt: 4}}]}, {title: 1, _id: 0}).limit(3).sort({ "imdb.rating": -1, "year": -1 }).pretty()

// C) Find movies where “Comedy” is one of the genres listed, the rating is “G” or “PG”, and the 
// IMDB rating is 8 or more. Show only the top five results (include the fields title, genres, and IMDB rating). 
db.movies.find({ $and: [{$or: [{rated: "PG"}, {rated: "G"}] }, {"genres": "Comedy"}, {"imdb.rating": {$gte: 8}}]}, {_id: 0, title: true, genres: true, "imdb.rating": true }).limit(5).sort({ "imdb.rating": -1 })

// D) Cersei Lannister frequently comments on movies as a reviewer. Count how many movies 
// Cersei has commented on since the beginning of 2015.
db.movies.find({ comments: {$elemMatch: {"name": {$in: ["Cersei Lannister"]}, "date": {"$gte": ISODate("2015-01-01T00:00:00Z")}}}}).count()

//Create six more useful find queries on the movies collection. 
//These are my own queries 
// 1) Find movies not in Drama, Thriller, Action or Short genres from 1980 or before. Include Title, Year & Genres.  
// Limit to 10 results. Sort by highest IMDB rating and most recent year.
db.movies.find({ $and: [{genres: {$nin: ['Drama', 'Thriller', 'Action', 'Short']}}, { year: {$lte: 1980}}]}, {title: 1, year: 1, genres: 1, _id: 0 }).limit(10).sort({ "imdb.rating": -1, year: -1 })

// 2) Find all movies available in the USA, made in 2010 with an IMDB rating of 8 or higher.
// A tomato rating greater than 4. Show title, director and tomato rating
// Limit to 10 results. Sort by lowest Tomato rating.
db.movies.find({$and: [{countries: {$in: ["USA"]}}, {year: {$eq: 2012}}, {"imdb.rating": {$gte: 8}}, {"tomatoes.viewer.rating": {$gt: 4}}] }, {title: 1, directors: 1, "tomatoes.viewer.rating": 1, _id: 0 }).limit(10).sort({"tomatoes.viewer.rating": 1})

// 3) Find all movies directed by Quentin Tarantino. Skip the first four. Sort alphabetically by genre.
//Include title, year, casr and genres. 
db.movies.find({directors: "Quentin Tarantino"}, { title: 1, year: 1, cast: 1, genres: 1, _id: 0 }).skip(4).sort({ genres: 1 })

// 4) Find movies in the Documentary genre, from the UK, with an IMDB rating less than 6.
// Include title and IMDB rating. Sort by highest IMDB rating first.
db.movies.find({$and: [{$or: [{genres: "Documentary" }]}, {"imdb.rating": { $lt: 6 }}, {countries: {$elemMatch: {$in: ["UK"]}}}]}, {title: 1, "imdb.rating": 1, _id: 0 }).sort({ "imdb.rating": -1 })

// 5)
// Find all french language movies in Crime & Drama genres. 
// Count the total greater than or equal to 2010. 
db.movies.find({$and: [{genres: { $all: ["Crime", "Drama"]}},{languages: "French"},{ year: { $gte: 2010}}]}).count();

// 6)
// Find movies starring Grace Kelly, rated PG, with a runtime greater than 100 minutes and less than 140 minutes. 
//Show title, runtime & cast. Sort from oldest to newest.
db.movies.find({ $and: [{cast: 'Grace Kelly'}, {rated: "PG"}, {runtime: {$gt: 100, $lt: 140 }}]}, {title: 1, runtime: 1, cast: 1, year: 1, _id: 0 }).sort({ year: 1 })

// Part 2: Create (insert)
// Add five movies you like that were released between 2017 and 2020. 
// The movie documents you create should contain:
// • title (string)
// • year (int)
// • runtime (int)
// • cast (array)
// • plot (string)
// • directors (array)
// • imdb (subdocument, containing…) o rating (double) o votes (int)
// • genres (array)

// Insert one movie to test.
db.movies.insert({
  title: "Jumanji: Welcome to the Jungle",
  year: 2017,
  runtime: 120,
  cast: ["Dwayne, Johnson", "Jack, Black", "Kevin, Hart", "Karen, Gillan", "Nick, Jonas"],
  plot: "The story focuses on a group of teenagers who come across Jumanji—now transformed into a video game—twenty-one years after the events of the 1995 film.",
  directors: ["Jake, Kasdan", "Scott, Rosenberg", "Chris, McKenna"],
  imdb: { rating: 6.9, votes: 317547, },
  genre: ["Action", "Adventure", "Comedy",]
})

// InsertMany for five movies I like that were released between 2017 and 2020.
db.movies.insertMany(
  [
    {
      title: "Richard Jewell",
      year: 2019,
      runtime: 131,
      cast: ["Paul Walter Hauser”,  “Sam Rockwell”, “Brandon Stanley"],
      plot: "Security guard Richard Jewell is an instant hero after foiling a bomb attack at the 1996 Atlanta Olympics, but his life becomes a nightmare when the FBI leaks to the media that he is a suspect in the case.",
      directors: ["Clint Eastwood"],
      imdb: { rating: 7.5, votes: 59136 },
      genres: ["Biography", "Crime", "Drama"]
    },
    {
      title: "Midway",
      year: 2019,
      runtime: 138,
      cast: ["Ed Skrein", "Patrick Wilson", "Woody Harrelson"],
      plot: "The story of the Battle of Midway, told by the leaders and the sailors who fought it.",
      directors: ["Roland Emmerich"],
      imdb: { rating: 6.7, votes: 65129 },
      genres: ["Action", "Adventure", "Drama"]
    },
    {
      title: "Greyhound",
      year: 2020,
      runtime: 131,
      cast: ["Tom Hanks”, “Elisabeth Shue”, “Stephen Graham"],
      plot: "Several months after the U.S. entry into World War II, an inexperienced U.S. Navy commander must lead an Allied convoy being stalked by a German submarine wolf pack.",
      directors: ["Aaron Schneider"],
      imdb: { rating: 7.0, votes: 64401 },
      genres: ["Action”, “Drama”, “History"]
    },
    {
      title: "Joker",
      year: 2019,
      runtime: 122,
      cast: ["Joaquin Phoenix”, “Robert De Niro”, “Zazie Beetz"],
      plot: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
      directors: ["Todd Phillips"],
      imdb: { rating: 8.5, votes: 923544 },
      genres: ["Crime”, “Drama”, “Thriller"]
    },
    {
      title: "Once Upon a Time... In Hollywood",
      year: 2019,
      runtime: 161,
      cast: ["Leonardo DiCaprio”, “Brad Pitt”, “Margot Robbie"],
      plot: "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.",
      directors: ["Quentin Tarantino"],
      imdb: { rating: 7.6, votes: 541172 },
      genres: ["Comedy", "Drama"]
    }
  ]
)

// Part 3: Update
// Perform the following update operations on the movies you added:
// a) Add a cast member to the cast array (on whichever document you want)
db.movies.update({title: "Once Upon a Time... In Hollywood"}, {$push: {"cast": "Dakota Fanning"}})

// b) On one of your documents (whichever you choose), update the IMDB rating to a new
// value and increase the number of votes by 1. Update "Richard Jewell" imdb rating to "8.2".
db.movies.updateMany({title: "Richard Jewell"}, { $set: {"imdb.rating": 8.5}, $inc: {"imdb.votes": 1}}, {upsert: true})

// c) Add a tomatoes subdocument to one of your movies. Look at the tomatoes
// subdocuments in other movies in the collection and match this structure.
// Subdocument added for "Richard Jewell". 
db.movies.updateOne({title: "Richard Jewell"}, {$set: {viewer: {"tomatoes": {"rating": "9.6", "numReviews": "40"}, lastUpdated: {ISODate: ("2020-11-30T18:31:53Z")}}}})

// Create one additional update of your choice.
// Updates comments on "Once Upon a Time... In Hollywood".
db.movies.updateOne({title: "Once Upon a Time... In Hollywood"}, {$set: {num_mflix_comments: 1, comments: [{"name": "Adelle McAteer", "email": "adelle@mcateer.com", "movie_id": {title: "Once Upon a Time... In Hollywood" }, "text": "A long but watchable film", date: ISODate("1996-06-11T07:01:30Z")}]}})

//Part 4: Delete
//Write the code to delete one of the movies you added. 
db.movies.deleteOne({title: {$eq: "Midway"}})

// Experimenting with additional queries
// Find all movies in the Documentary genre that have won awards/mention awards. 
//List by title, year and award information. Limit to 10 and sort by most recent. 
db.movies.find({ $and: [{ genres: { $all: ["Documentary"]}}, {awards: { $regex: /Award/i } }] }, { title: 1, year: 1, awards: 1, _id: 0 }).limit(10).sort({ year: -1 });
db.movies.find({"tomatoes.critic.meter": {$gte: 88}, runtime: {$gt: 180 } }, { title: 1, runtime: 1, _id: 0 }).pretty()
db.movies.find({"tomatoes.critic.meter": {$gte: 88}, runtime: {$gt: 180 } }, { title: 1, runtime: 1, _id: 0 }).count()