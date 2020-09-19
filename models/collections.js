const { Crud } = require("../database/dbQueryHelpers");

class Collections extends Crud {
  constructor() {
    super("items_in_collection");
  }

  save({
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
  }) {
    return super.superCustom.call(
      this,
      `WITH item_id_var AS (
        INSERT INTO items
          (title, console, is_console, thumbnail, front_view, current_price)
        VALUES
          ($1, $2, $3, $4, $5, $12) ON CONFLICT (title, console) DO UPDATE SET current_price = $12
        RETURNING id
      ),
      ins2 AS (
        INSERT INTO items_in_collection
          (item_id, user_id, condition, comments, starting_price, date_of_purchase, tradeable)
        VALUES
          ((SELECT id FROM item_id_var), $6, $7, $8, $9, $10, $11)
        RETURNING item_id
      )
      INSERT INTO items_value_by_date (item_id, date, current_value)
      VALUES (
        (SELECT id FROM item_id_var),
        '${new Date().toUTCString()}',
        $12
      )`,
      [
        title,
        console,
        is_console,
        thumbnail,
        front_view,
        user_id,
        condition,
        comments,
        starting_price,
        date_of_purchase,
        tradeable,
        current_value,
      ]
    );
  }
}

module.exports = new Collections();
