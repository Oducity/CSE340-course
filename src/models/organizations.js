import db from "./db.js";

const getAllOrganizations = async () => {
  const sqlQuery = `SELECT organization_id, organization_name, organization_email, description, logo_filename
        FROM organizations;
                    `;
  const result = await db.query(sqlQuery);
  return result.rows;
};

export { getAllOrganizations };
