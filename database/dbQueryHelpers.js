const { pool, client } = require('./postgres.config.js');

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// use pool for all queries. It will scale better than client.

// const getAllReviews = () => (
//   pool.query('SELECT * FROM reviews')
//     .catch(() => console.log('failed to connect to db'))
// );

// const saveReviewToDB = (reviewData) => {
//   const args = justValues(reviewData);
//   return pool.query(`INSERT INTO reviews(${justKeys(reviewData).join(', ')}) VALUES(${params(args).join(', ')})`, justValues(reviewData))
//     .catch((err) => console.log('failed to connect to db: ', err));
// };

module.exports.getAllReviews = getAllReviews;

