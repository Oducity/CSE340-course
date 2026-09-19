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

-- This script creates the projects table in the database
CREATE TABLE projects(
  project_id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  project_location VARCHAR(255) NOT NULL,
  project_date DATE NOT NULL,
  CONSTRAINT fk_organization FOREIGN KEY (organization_id) 
    REFERENCES organizations(organization_id)
);

-- This script inserts data into the projects table
INSERT INTO projects (organization_id, title, description, project_location, project_date)
VALUES
(
	1,
	'Solar-Powered Community Center', 
 	'Construction of a multipurpose community center using solar panels, rainwater harvesting, and locally sourced timber to reduce environmental impact while providing a gathering space for residents.', 
 	'Aiyetoro, Lagos', '2025-03-15'
),
(
	1,
	'Eco-Friendly Borehole and Water Filtration Project', 
 	'Installation of a solar-powered borehole with an integrated filtration system to provide clean, sustainable drinking water to underserved households.', 
 	'Epe, Lagos', '2025-05-22'
),
(
	1,
	'Green Roofing Initiative for Local School', 
 	'Retrofitting an existing primary school building with green roofing and improved insulation to reduce energy costs and improve classroom conditions.', 
 	'Ikorodu, Lagos', '2025-07-10'
),
(
	1,
	'Recycled-Material Footbridge Construction', 
 	'Building a pedestrian footbridge using recycled steel and sustainably sourced wood to connect two communities separated by a seasonal flood channel.', 
 	'Badagry, Lagos', '2025-09-05'
),
(
	1,
	'Community Market Rebuild with Sustainable Materials', 
 	'Reconstruction of a local open-air market using eco-bricks, bamboo framing, and passive cooling design to support small-scale traders while minimizing carbon footprint.', 
 	'Mushin, Lagos', '2025-11-18'
),
(
	2,
	'Rooftop Vegetable Garden Initiative', 
 	'Conversion of an unused apartment rooftop into a productive vegetable garden, providing fresh produce to residents and serving as a demonstration site for space-efficient urban farming techniques.', 
	 'Yaba Lagos', '2025-02-10'
),
(
	2,
	'School Garden and Nutrition Education Program', 
 	'Establishment of a vegetable garden at a local primary school paired with a curriculum teaching children about growing food, healthy eating, and composting.', 
 	'Surulere Lagos', '2025-04-14'
),
(
	2,
	'Community Compost Hub', 
 	'Creation of a neighborhood composting station that collects household food waste and converts it into nutrient-rich soil for use in nearby community gardens.', 
 	'Ojota Lagos', '2025-06-20'
),
(
	2,
	'Vacant Lot to Urban Farm Conversion', 
 	'Transformation of an abandoned lot into a working urban farm growing vegetables and herbs, with produce sold at subsidized prices to nearby residents.', 
 	'Ajegunle Lagos', '2025-08-08'
),
(
	2,
	'Farmers Market and Food Sustainability Workshop Series', 
 	'Launch of a weekly farmers market alongside monthly workshops teaching residents about sustainable growing methods, seed saving, and reducing household food waste.', 
 	'Agege Lagos', '2025-10-25'
),
(
	3,
	'Neighborhood Cleanup Volunteer Drive', 
 	'Organization of a large-scale volunteer cleanup effort across local streets and public spaces, coordinating teams to collect waste and restore shared community areas.', 
 	'Ikeja Lagos', '2025-01-18'
),
(
	3,
	'Orphanage Support and Mentorship Program', 
 	'Recruitment and scheduling of volunteers to provide tutoring, mentorship, and recreational activities for children at a local orphanage on a weekly basis.', 
 	'Ikotun Lagos', '2025-03-29'
),
(
	3,
	'Food Bank Volunteer Coordination Initiative', 
 	'Management of volunteer shifts for sorting, packing, and distributing donated food items to a partner food bank serving low-income households.', 
 	'Oshodi Lagos', '2025-06-05'
),
(
	3,
	'Elderly Care Home Visitation Program', 
 	'Coordination of volunteer visits to a local elderly care home, organizing companionship activities, errands, and basic assistance for residents.', 
 	'Mile 12 Lagos', '2025-08-30'
),
(
	3,
	'Disaster Relief Volunteer Response Network', 
 	'Building a roster of trained volunteers ready to mobilize quickly in support of local charities responding to floods and other emergencies affecting nearby communities.', 
 	'Lekki Lagos', '2025-11-02'
),
 (
	1,
	'Riverside Community Center Renovation',
	'Retrofitting an aging community center with solar panels, energy-efficient insulation, and a rainwater harvesting system to serve as a model for sustainable public buildings.',
	'River State, Nigeria',
	'2027-11-03'
),
(
	1,
	'Green Bridges Initiative',
	'Constructing two pedestrian bridges using recycled steel and low-carbon concrete to connect under-served neighborhoods to local schools and transit hubs.',
	'Benin City, Edo State',
	'2027-12-15'
),
(
	1,
	'Sunrise Village Housing Project',
	'Building 15 affordable, energy-efficient homes for low-income families using modular construction techniques and locally sourced materials.',
	'Edo State, Nigeria',
	'2027-01-20'
),
(
	1,
	'Clearwater Sanitation Upgrade',
	'Installing a decentralized wastewater treatment system for a rural community lacking reliable sanitation infrastructure, reducing environmental runoff and health risks.',
	'Edo State, Nigeria',
	'2027-02-10'
),
(
	1,
	'Hope Street Public Park Restoration',
	'Transforming a vacant lot into a green public park with permeable pavement, native landscaping, and a solar-powered lighting system for evening community use.',
	'Lagos State, Nigeria',
	'2027-03-05'
),
(
    2,
    'Community Rooftop Garden Build',
    'Volunteers help construct raised beds, install irrigation lines, and plant seasonal vegetables on a donated rooftop space to supply fresh produce to nearby families.',
    'Downtown Community Center Rooftop',
    '2027-10-10'
),
(
    2,
    'Neighborhood Composting Workshop',
    'A hands-on class teaching residents how to turn kitchen scraps into compost, with free starter bins for attendees to use at home.',
    'Garriki, ABuja',
    '2027-10-24'
),
(
    2,
    'Youth Seed-to-Table Program',
    'A multi-week program where local students plant, tend, and harvest a school garden, then prepare a simple meal with what they grew.',
    'Victoria Island, Lagos',
    '2027-11-07'
),
(
    2,
    'Vacant Lot Urban Farm Cleanup',
    'A community workday to clear debris, test soil, and prepare an unused lot for conversion into a productive urban farm plot.',
    'Edo State, Nigeria',
    '2027-11-21'
),
(
    2,
    'Winter Harvest Food Share',
    'Volunteers sort, pack, and distribute fresh and preserved produce from the collective''s gardens to neighbors in need ahead of the holidays.',
    'Kano State, Nigeria',
    '2027-12-12'
),
(
    3,
    'Community Food Bank Sorting Day',
    'Volunteers sort, check, and box donated food items so local charities can distribute them to families in need.',
    'Kaduna, Nigeria',
    '2026-10-03'
),
(
    3,
    'Neighborhood Clothing Drive',
    'A collection and sorting event where volunteers gather gently used coats, shoes, and clothing for donation to partner shelters.',
    'King Square, Benin City, Nigeria',
    '2026-10-17'
),
(
    3,
    'Senior Center Companion Visits',
    'Volunteers spend an afternoon with seniors through games, conversation, and light meal service to reduce isolation.',
    'Lagos State, Nigeria',
    '2026-11-14'
),
(
    3,
    'Charity Fun Run Volunteer Crew',
    'Volunteers staff registration, water stations, and course marshaling for a local 5K that raises funds for partner charities.',
    'Warri, Delta State, Nigeria',
    '2026-11-28'
),
(
    3,
    'Holiday Gift Wrapping and Delivery',
    'Volunteers wrap donated gifts and deliver them to families and shelters supported by local charities.',
    'Asaba, Delta State, Nigeria',
    '2026-12-19'
);

 -- Category table creation
 CREATE TABLE category (
category_id SERIAL PRIMARY KEY,
category_name VARCHAR(50) NOT NULL UNIQUE,
category_description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- This script inserts data into the category table
INSERT INTO category (
	category_name,
	category_description
)
VALUES (
	'environmental',
	'This category contain all projects related to development and improvement of the environment.'
),
(
	'Educational',
	'This category contain all projects related to education. Either formal or informal.'
),
(
	'Community Service',
	'This contain all projects related to community services.'
),
(
	'Health and Wellness',
	'This category contain all projects related to health and wellness'
);

-- This script creates the project_category table in the database
--which establishes a many-to-many relationship between projects and category
CREATE TABLE projects_category(
	project_id INTEGER REFERENCES projects(project_id),
	category_id INTEGER REFERENCES category(category_id),
	PRIMARY KEY (project_id, category_id)
);

-- This script inserts data into the projects_category table which establishes the many-to-many relationship between projects and category
INSERT INTO projects_category
	( project_id, category_id )
VALUES 
	( 1, 3 ),
	( 2, 3),
	(2, 4),
	(3, 2 ),
	(3, 3),
	(4, 1),
	(4, 3),
	(5, 3),
	(6, 2),
	(6, 3),
	(6, 4),
	(7, 2),
	(7, 4),
	(8, 1),
	(8, 3),
	(8, 4),
	(9, 1),
	(9, 3),
	(9, 4),
	(10, 2),
	(10, 3),
	(10, 4),
	(11, 1),
	(11, 3),
	(11, 4),
	(12, 2),
	(12, 3),
	(13, 3),
	(13, 4),
	(14, 4),
	(15, 1),
	(15, 3),
	(15, 4)
	(13, 2),
	(16, 1),
	(16, 3),
	(17, 2),
	(17, 3),
	(17, 4),
	(18, 3),
	(18, 4),
	(19, 1),
	(19, 2),
	(19, 3),
	(19, 4),
	(20, 1),
	(20, 3),
	(20, 4),
	(21, 1),
	(21, 2),
	(21, 3),
	(21, 4),
	(22, 1),
	(22, 2),
	(22, 3),
	(22, 4),
	(23, 2),
	(23, 3),
	(23, 4),
	(24, 1),
	(24, 3),
	(24, 4),
	(25, 3),
	(25, 4),
	(26, 3),
	(26, 4),
	(27, 1),
	(27, 3),
	(27, 4),
	(28, 3),
	(29, 2),
	(29, 3),
	(29, 4),
	(30, 3);

ALTER TABLE category ADD COLUMN category_tag TEXT;
UPDATE category
SET category_tag = $$<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%23e0f2f1'/%3E%3Cpath d='M5 19C5 10 10 5 19 5c0 9-5 14-14 14z' fill='%2300897b'/%3E%3Cpath d='M5 19L13 11' stroke='%23e0f2f1' stroke-width='1.5' fill='none'/%3E%3C/svg%3E" alt="Environmental" width="24" height="24">$$
WHERE category_id = 1;

UPDATE category
SET category_tag = $$<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%23e8eaf6'/%3E%3Cpath d='M12 5L3 9.5l9 4.5 9-4.5z' fill='%233949ab'/%3E%3Cpath d='M7 12.5v3.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3.5l-5 2.5z' fill='%233949ab'/%3E%3C/svg%3E" alt="Educational" width="24" height="24">$$
WHERE category_id = 2;

UPDATE category
SET category_tag = $$<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%23fff3e0'/%3E%3Ccircle cx='12' cy='8' r='2.5' fill='%23ef6c00'/%3E%3Cpath d='M7.5 18c0-3 2-5 4.5-5s4.5 2 4.5 5z' fill='%23ef6c00'/%3E%3Ccircle cx='5.5' cy='10' r='1.8' fill='%23ef6c00'/%3E%3Cpath d='M2 17c0-2 1.6-3.5 3.5-3.5S9 15 9 17z' fill='%23ef6c00'/%3E%3Ccircle cx='18.5' cy='10' r='1.8' fill='%23ef6c00'/%3E%3Cpath d='M15 17c0-2 1.6-3.5 3.5-3.5S22 15 22 17z' fill='%23ef6c00'/%3E%3C/svg%3E" alt="Community Service" width="24" height="24">$$
WHERE category_id = 3;

UPDATE category
SET category_tag = $$<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%23e8f5e9'/%3E%3Cpath d='M10 5h4v5h5v4h-5v5h-4v-5H5v-4h5z' fill='%232e7d32'/%3E%3C/svg%3E" alt="Health" width="24" height="24">$$
WHERE category_id = 4;
