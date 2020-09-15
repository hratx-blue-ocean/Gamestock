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
    return executeQuery(queryString, parsedOptions.values).then(results => results.rows[0]);
  }

  /**
   * Creates a new record in the table.
   * @param {Object} options - An object with key/value pairs, where the keys should match
   * the column names and the values should be of the correct type for that table. See model
   * class definition for additional information about the schema.
   * @returns {Promise<Object>} A promise that is fulfilled with an object
   * containing the results of the query or is rejected with the the error that occurred
   * during the query.
   * @returning string - a string starting with the word "returning" that will declare what to return on a successful create
   */
  create(options, returning = 'RETURNING id') {
    let parsedOptions = parseKeyValues(options);
    let queryString = `INSERT INTO ${this.tablename}(${parsedOptions.keys.join()}) VALUES (${parseParams(parsedOptions.values).join()}) ${returning}`
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
  update(options, values, returning = 'RETURNING id') {

    let parsedValues = parseData(values);
    let parsedValueKeys = parsedValues.string;
    let valuesParams = parseParams(parsedValueKeys);
    parsedValueKeys = parsedValueKeys.map((key, index) => `${key}${valuesParams[index]}`)

    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string
    let params = parseParams(parsedKeys, valuesParams.length);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);

    let queryString = `UPDATE ${this.tablename} SET ${parsedValueKeys.join(', ')} WHERE ${parsedKeys.join(' AND ')} ${returning}`;
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
  delete(options, returning = 'RETURNING id') {
    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string
    let params = parseParams(parsedKeys);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);

    let queryString = `DELETE FROM ${this.tablename} WHERE ${parsedKeys.join(' AND ')} ${returning}`;
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
  /** To make this one work, be sure to clean the commands first. replace the values with  $1, $2, etc and make sure the array of values matches the order of those. */
  superCustom(complexQuery, values) {
    return executeQuery(complexQuery, values);
  }
}

module.exports = {
  Crud
}
