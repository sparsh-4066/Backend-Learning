import { MongoClient } from 'mongodb';



async function runGetStarted() {
  // Replace the uri string with your connection string
  const uri = 'mongodb+srv://sparshuser1234_db_user:PEZfsp94bgRXefCt@cluster0.o6djqqf.mongodb.net/';
  const client = new MongoClient(uri);
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    await client.close();
  }
}

runGetStarted().catch(console.dir);