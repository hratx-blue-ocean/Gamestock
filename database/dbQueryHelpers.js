const { pool, client } = require("./postgres.config.js");

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
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

const getCollectionsByValueOrSize = (rankBy, sortBy) => {
  const selectQueryLeaderboard = `SELECT ROW_NUMBER() OVER (ORDER BY ${rankBy}) AS rank, users.username, users.avatar, COUNT(items_in_collection.item_id) as total_count, SUM(items.current_price) as total_value
	FROM items_in_collection
	INNER JOIN users
	ON users.id = items_in_collection.user_id
	INNER JOIN items
	ON items.id = items_in_collection.item_id
	GROUP BY users.username, users.avatar
  ORDER BY ${sortBy}
  LIMIT 10`;

  return pool.query(selectQueryLeaderboard);
};

// should save new items to the database
const saveItemToDB = ({
  title,
  console,
  is_console,
  user_id,
  condition,
  comments,
  starting_price,
  date_of_purchase,
  tradeable,
  current_value,
  thumbnail,
  front_view,
}) => {
  return pool.query(`WITH item_id_var AS (
      INSERT INTO items
      (title, console, is_console, thumbnail, front_view)
      VALUES
      ($$${title}$$, '${console}', '${is_console}', '${thumbnail}', '${front_view}') ON CONFLICT (title, console) DO NOTHING
    RETURNING id
),
    ins2 AS (
		INSERT INTO items_in_collection
      (item_id, user_id, condition, comments, starting_price, date_of_purchase, tradeable)
    VALUES
      ((SELECT id FROM item_id_var), ${user_id}, '${condition}', '${comments}', '${starting_price}', '${date_of_purchase}', '${tradeable}')
		RETURNING item_id
		)
    INSERT INTO items_value_by_date
      (item_id, date, current_value)
    VALUES
      ((SELECT id FROM item_id_var), '${new Date().toUTCString()}', ${
    Number(current_value) / 100
  })`);
};

// query for getting leaderboard sorted by console
const getCollectionsByConsole = (console) => {
  const selectQueryConsoles = `SELECT ROW_NUMBER() OVER (ORDER BY SUM(items.current_price) DESC) AS rank, users.username, users.avatar, COUNT(items_in_collection.item_id) as total_count, SUM(items.current_price) as total_value
	FROM items_in_collection
	INNER JOIN users
	ON users.id = items_in_collection.user_id
	INNER JOIN items
	ON items.id = items_in_collection.item_id AND items.console=\'${console}\'
	GROUP BY users.username, users.avatar
  ORDER BY SUM(items.current_price) desc
  LIMIT 10`;

  return pool.query(selectQueryConsoles);
};

const getAllConsoles = () => {
  selectQueryConsoles = "SELECT DISTINCT console FROM items";

  return pool.query(selectQueryConsoles);
};

//user profile query to order default view by title-alpha-asc
const getUserCollectionByName = (username) => {
  return pool.query(
    `SELECT users.username, items_in_collection.user_id, items.title, items.id, items.console, items_in_collection.condition, items_in_collection.starting_price, items_in_collection.tradeable, items_in_collection.date_of_purchase, items_in_collection.comments
FROM items_in_collection
INNER JOIN items
ON items_in_collection.item_id = items.id
INNER JOIN users
ON items_in_collection.user_id = users.id AND users.username='${username}'
ORDER BY items.title ASC`
  );
};

//user profile query to order collection by price desc
const getUserCollectionByPrice = (username) => {
  return pool.query(
    `SELECT users.username, items_in_collection.user_id, items.title, items.id, items.console, items_in_collection.condition, items_in_collection.starting_price, items_in_collection.tradeable
FROM items_in_collection
INNER JOIN items
ON items_in_collection.item_id = items.id
INNER JOIN users
ON items_in_collection.user_id = users.id AND users.username='${username}'
ORDER BY items_in_collection.starting_price DESC`
  );
};

//user profile query to order collection by condition ASC
const getUserCollectionByCondition = (username) => {
  return pool.query(
    `SELECT users.username, items_in_collection.user_id, items.title, items.id, items.console, items_in_collection.condition, items_in_collection.starting_price, items_in_collection.tradeable
FROM items_in_collection
INNER JOIN items
ON items_in_collection.item_id = items.id
INNER JOIN users
ON items_in_collection.user_id = users.id AND users.username='${username}'
ORDER BY items_in_collection.condition DESC`
  );
};

//user profile query to order collection by tradeable DESC
const getUserCollectionByTradeable = (username) => {
  return pool.query(
    `SELECT users.username, items_in_collection.user_id, items.title, items.id, items.console, items_in_collection.condition, items_in_collection.starting_price, items_in_collection.tradeable
FROM items_in_collection
INNER JOIN items
ON items_in_collection.item_id = items.id
INNER JOIN users
ON items_in_collection.user_id = users.id AND users.username='${username}'
ORDER BY items_in_collection.tradeable DESC, items.title ASC`
  );
};

// get user collection for banner
const getCollectionByUser = (userID) => {
  const selectQueryCollection = `
  SELECT *
  FROM (
    SELECT ROW_NUMBER() OVER (ORDER BY SUM(items.current_price) DESC, COUNT(items_in_collection.item_id) DESC) AS rank, users.id as id, users.username, users.avatar, COUNT(items_in_collection.item_id) as total_count, SUM(items.current_price) as total_value
    FROM items_in_collection
    INNER JOIN users
    ON users.id = items_in_collection.user_id
    INNER JOIN items
    ON items.id = items_in_collection.item_id
    GROUP BY users.id, users.username, users.avatar
    ORDER BY total_value DESC, rank, total_count
  ) as ranking_query
  WHERE ranking_query.id= $1`;

  return pool.query(selectQueryCollection, [userID]);
};

// generate price by item by day for graph
const getDailyItemPrice = (itemID) => {
  const selectQueryDailyPrice = `SELECT distinct on ( items_in_collection.item_id, date.date)  items_in_collection.item_id, date.date, date.current_value  as total_value
  FROM items_in_collection
  INNER JOIN users
  ON items_in_collection.user_id = users.id
  INNER JOIN items
  ON items_in_collection.item_id = items.id AND items.id=${itemID}
  INNER JOIN
    (SELECT distinct on ( items_value_by_date.item_id, DATE(items_value_by_date.date) ) DATE(items_value_by_date.date), items_value_by_date.item_id, items_value_by_date.current_value
     FROM items_value_by_date
     ORDER BY items_value_by_date.item_id, DATE(items_value_by_date.date)  DESC
    ) as date
  ON items.id = date.item_id
  GROUP BY  date.date, items_in_collection.item_id, total_value
  ORDER BY date.date ASC`;

  return pool.query(selectQueryDailyPrice);
};

const getDailyCollectionValue = (username) => {
  const selectQueryCollectionPrice = `SELECT distinct on (users.username, date.date) users.username,  date.date, SUM(date.current_value)  as total_value
FROM items_in_collection
INNER JOIN users
ON items_in_collection.user_id = users.id AND users.username='${username}'
INNER JOIN items
ON items_in_collection.item_id = items.id
INNER JOIN
	(SELECT distinct on ( items_value_by_date.item_id, DATE(items_value_by_date.date) ) DATE(items_value_by_date.date), items_value_by_date.item_id, items_value_by_date.current_value
	 FROM items_value_by_date
	 ORDER BY items_value_by_date.item_id, DATE(items_value_by_date.date)  DESC
	) as date
ON items.id = date.item_id
GROUP BY users.username, date.date
ORDER BY date.date, users.username ASC`;

  return pool.query(selectQueryCollectionPrice);
};

const getUserByUsername = (username) => {
  const selectQueryUsername = `SELECT id FROM users WHERE username = $1`;
  return pool.query(selectQueryUsername, [username]);
};
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

const _ = require("lodash");

const executeQuery = (query, values) => {
  return pool.query(query, values);
};

const parseData = (options) => {
  return _.reduce(
    options,
    (parsed, value, key) => {
      parsed.string.push(`${key} = `);
      parsed.values.push(value);
      return parsed;
    },
    { string: [], values: [] }
  );
};

const parseKeyValues = (options) => {
  return _.reduce(
    options,
    (parsed, value, key) => {
      parsed.keys.push(key);
      parsed.values.push(value);
      return parsed;
    },
    { keys: [], values: [] }
  );
};

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
    let parsedKeys = parsedOptions.string;
    let params = parseParams(parsedKeys);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);
    let queryString = `SELECT * FROM ${this.tablename} WHERE ${parsedKeys.join(
      " AND "
    )}`;
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
    let parsedKeys = parsedOptions.string;
    let params = parseParams(parsedKeys);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);
    let queryString = `SELECT * FROM ${this.tablename} WHERE ${parsedKeys.join(
      " AND "
    )} LIMIT 1`;
    return executeQuery(queryString, parsedOptions.values).then(
      (results) => results.rows[0]
    );
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
  create(options, returning = "RETURNING id") {
    let parsedOptions = parseKeyValues(options);
    let queryString = `INSERT INTO ${
      this.tablename
    }(${parsedOptions.keys.join()}) VALUES (${parseParams(
      parsedOptions.values
    ).join()}) ${returning}`;
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
  update(options, values, returning = "RETURNING id") {
    let parsedValues = parseData(values);
    let parsedValueKeys = parsedValues.string;
    let valuesParams = parseParams(parsedValueKeys);
    parsedValueKeys = parsedValueKeys.map(
      (key, index) => `${key}${valuesParams[index]}`
    );

    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string;
    let params = parseParams(parsedKeys, valuesParams.length);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);

    let queryString = `UPDATE ${this.tablename} SET ${parsedValueKeys.join(
      ", "
    )} WHERE ${parsedKeys.join(" AND ")} ${returning}`;
    return executeQuery(
      queryString,
      Array.prototype.concat(parsedValues.values, parsedOptions.values)
    );
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
  delete(options, returning = "RETURNING id") {
    let parsedOptions = parseData(options);
    let parsedKeys = parsedOptions.string;
    let params = parseParams(parsedKeys);
    parsedKeys = parsedKeys.map((key, index) => `${key}${params[index]}`);

    let queryString = `DELETE FROM ${this.tablename} WHERE ${parsedKeys.join(
      " AND "
    )} ${returning}`;
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
  Crud,
  getCollectionsByValueOrSize,
  saveItemToDB,
  getCollectionsByConsole,
  getAllConsoles,
  getCollectionByUser,
  getDailyItemPrice,
  getDailyCollectionValue,
  getUserByUsername,
  executeQuery,
  getUserCollectionByName,
  getUserCollectionByPrice,
  getUserCollectionByCondition,
  getUserCollectionByTradeable,
};
