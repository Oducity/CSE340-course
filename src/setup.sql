-- This script creates the organizations table in the database
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(150) NOT NULL,
    organization_email VARCHAR(150) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);