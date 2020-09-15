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
//******************************* */

// query for getting leaderboard by value / size
  // if sorting by value
    // sortBy will be 'total_value DESC, total_count'
  // if sorting by size
    //sortBy will be 'total_count DESC, total_value'

const getCollectionsByValueOrSize = (sortBy) => {
  const SelectQuery = `SELECT distinct on (total_value, total_count, users.username, users.avatar, date.date ) users.username, users.avatar, COUNT(items_in_collection.item_id) as total_count, date.date, SUM(date.current_value)  as total_value
  FROM items_in_collection
  INNER JOIN users
  ON items_in_collection.user_id = users.id
  INNER JOIN items
  ON items_in_collection.item_id = items.id
  INNER JOIN
    (SELECT distinct on (DATE(items_value_by_date.date), items_value_by_date.item_id) DATE(items_value_by_date.date), items_value_by_date.item_id, items_value_by_date.current_value
     FROM items_value_by_date
      WHERE DATE(items_value_by_date.date) = (SELECT MAX(DATE(items_value_by_date.date)) from items_value_by_date)
     ORDER BY items_value_by_date.item_id, DATE(items_value_by_date.date) DESC
    ) as date
  ON items.id = date.item_id
  GROUP BY users.username, users.avatar, date.date \
  ORDER BY ${sortBy}, date.date, users.username, users.avatar
  LIMIT 10`;

  return pool.query(SelectQuery)
}

//******************************* */

// function argumentSplitter(obj) {
//     const keys = Object.keys(obj);
//     const vals = Object.values(obj);
//     let result = '';
//     for (let i = 0; i < keys.length; i++) {
//       result += `${keys[i]} = ${vals[i]} `;
//     }
//     return result;
//   }

//   function justValues(obj) {
//     return Object.values(obj);
//   }

//   function justKeys(obj) {
//     return Object.keys(obj);
//   }

  function parseParams(arr, starting = 0) {
    const result = [];
    for (let i = starting + 1; i < starting + arr.length + 1; i++) {
      result.push(`$${i}`);
    }
    return result;
  }

const _ = require('lodash');

const executeQuery = (query, values) => {
  return pool.query(query, values)
};

const parseData = options => {
  return _.reduce(options, (parsed, value, key) => {
    parsed.string.push(`${key} = `);
    parsed.values.push(value);
    return parsed;
  }, { string: [], values: [] });
};

const parseKeyValues = options => {
    return _.reduce(options, (parsed, value, key) => {
        parsed.keys.push(key);
        parsed.values.push(value);
        return parsed;
      }, { keys: [], values: [] });
}

/**
 * Base class for all database models, written in ES6 class format. You should NOT refer
 * to this interface directly unless you are creating a new model subclass.
 * @param {string} tablename - The name of the table (as defined by table schema).
 */
class Crud {
  constructor(tablename) {
    this.tablename = tablename;
  }

  /**
   * Gets all records in the table matching the specified conditions.
   * @param {Object} options - An object where the keys are column names and the
   * values are the current values to be matched.
   * @returns {Promise<Array>} A promise that is fulfilled with an array of objects
   * matching the conditions or is rejected with the the error that occurred during
   * the query.
   */
  getAll(options) {
    if (!options) {
      let queryString = `SELECT * FROM ${this.tablename}`;
      return executeQuery(queryString);
    }
    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string
    let params = parseParams(parsedKeys);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);
    let queryString = `SELECT * FROM ${this.tablename} WHERE ${parsedKeys.join(' AND ')}`;
    return executeQuery(queryString, parsedOptions.values);
  }

  /**
   * Gets one record in the table matching the specified conditions.
   * @param {Object} options - An object where the keys are column names and the
   * values are the current values to be matched.
   * @returns {Promise<Object>} A promise that is fulfilled with one object
   * containing the object matching the conditions or is rejected with the the
   * error that occurred during the query. Note that even if multiple objects match
   * the conditions provided, only one will be provided upon fulfillment.
   */
  get(options) {
    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string
    let params = parseParams(parsedKeys);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);
    let queryString = `SELECT * FROM ${this.tablename} WHERE ${parsedKeys.join(' AND ')} LIMIT 1`;
    return executeQuery(queryString, parsedOptions.values).then(results => results[0]);
  }

  /**
   * Creates a new record in the table.
   * @param {Object} options - An object with key/value pairs, where the keys should match
   * the column names and the values should be of the correct type for that table. See model
   * class definition for additional information about the schema.
   * @returns {Promise<Object>} A promise that is fulfilled with an object
   * containing the results of the query or is rejected with the the error that occurred
   * during the query.
   */
  create(options) {
    let parsedOptions = parseKeyValues(options);
    let queryString = `INSERT INTO (${parsedOptions.keys.join()}) VALUES (${parseParams(parsedOptions.values).join()})`
    return executeQuery(queryString, parsedOptions.values);
  }

  /**
   * Updates a record(s) in the table.
   * @param {Object} options - An object where the keys are column names and the
   * values are the current values. All records in the table matching the options will be
   * updated.
   * @param {Object} values - An object where the keys are column names and the values
   * are the new values.
   * @returns {Promise<Object>} A promise that is fulfilled with an object
   * containing the results of the query or is rejected with the the error that occurred
   * during the query.
   */
  update(options, values) {

    let parsedValues = parseData(values);
    let parsedValueKeys = parsedValues.string;
    let valuesParams = parseParams(parsedValueKeys);
    parsedValueKeys = parsedValueKeys.map((key, index) => `${key}${valuesParams[index]}`)

    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string
    let params = parseParams(parsedKeys, valuesParams.length);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);

    let queryString = `UPDATE ${this.tablename} SET ${parsedValueKeys.join(', ')} WHERE ${parsedKeys.join(' AND ')}`;
    return executeQuery(queryString, Array.prototype.concat(parsedValues.values, parsedOptions.values));
  }

  /**
   * Deletes a record or records in the table.
   * @param {Object} options - An object where the keys are column names and
   * the values are the current values. All rows in the table matching options will be
   * deleted.
   * @returns {Promise<Object>} A promise that is fulfilled with an object
   * containing the results of the query or is rejected with the the error that occurred
   * during the query.
   */
  delete(options) {
    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string
    let params = parseParams(parsedKeys);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);

    let queryString = `DELETE FROM ${this.tablename} WHERE ${parsedKeys.join(' AND ')}`;
    return executeQuery(queryString, parsedOptions.values);
  }

  /**
   * Deletes all records in the table.
   * @returns {Promise<Object>} A promise that is fulfilled with an object
   * containing the results of the query or is rejected with the the error that occurred
   * during the query.
   */
  deleteAll() {
    let queryString = `DELETE FROM ${this.tablename}`;
    return executeQuery(queryString);
  }
}

module.exports = {
  Crud,
  getCollectionsByValueOrSize,
}
