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
    console.log(`User created with ID: ${result.rows[0].user_id}`);
  }
  return result.rows[0].user_id;
};

// This function retrieves a user from the database by their email address and returns the user's data.
// If no user is found with the given email, it returns null. I have created this function before
//  creating this branch, so this function is already present in the main branch. I have added it here for completeness.
const findUserByEmail = async (email) => {
  const sqlQuery = `
    SELECT user_id, user_name, user_email, password_hash, role_id
    FROM users
    WHERE user_email = $1;
  `;

  const queryParams = [email];
  const result = await db.query(sqlQuery, queryParams);
  if (result.rows.length === 0) {
    return null; // Return null if no user is found with the given email
  }
  return result.rows[0];
};

export { createUser, findUserByEmail };
