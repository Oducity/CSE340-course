// Imports the db function from the database file.
import db from "./db.js";

// this function create a new user in the database and returns the newly created user's ID
const createUser = async (userName, email, password_hash, userRole) => {
  const sqlQuery = `
    INSERT INTO users (user_name, user_email, password_hash, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id;
    `;

  const queryParams = [userName, email, password_hash, userRole];
  const result = await db.query(sqlQuery, queryParams);
  if (result.rows.length === 0) {
    throw new Error("Failed to create user");
  }
  if (process.env.ENABLE_SQL_LOGGING === "true") {
    CONSOLE_LOGGER.info(`User created with ID: ${result.rows[0].user_id}`);
  }
  return result.rows[0].user_id;
};

export { createUser };
