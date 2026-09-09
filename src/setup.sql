-- This script creates the organizations table in the database
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(150) NOT NULL,
    organization_email VARCHAR(150) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- This script inserts data into the organizations table
INSERT INTO organizations (
	organization_name,
	organization_email,
	description,
	logo_filename
	)
VALUES (
	'BrightFuture Builders',
	'info@brightfuturebuilders.org',
	'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
	'brightfuture-logo.png'
	),
	(
	'GreenHarvest Growers',
	'contact@greenharvest.org',
	'An urban farming collective promoting food sustainability and education in local neighborhoods.',
	'greenharvest-logo.png'
	),
	(
	'UnityServe Volunteers',
	'hello@unityserve.org', ' volunteer coordination group supporting local charities and service initiatives.',
	'unityserve-logo.png'
	);
