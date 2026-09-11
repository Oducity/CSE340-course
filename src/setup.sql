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
(1, 'Solar-Powered Community Center', 
 'Construction of a multipurpose community center using solar panels, rainwater harvesting, and locally sourced timber to reduce environmental impact while providing a gathering space for residents.', 
 'Aiyetoro, Lagos', '2025-03-15'),

(1, 'Eco-Friendly Borehole and Water Filtration Project', 
 'Installation of a solar-powered borehole with an integrated filtration system to provide clean, sustainable drinking water to underserved households.', 
 'Epe, Lagos', '2025-05-22'),

(1, 'Green Roofing Initiative for Local School', 
 'Retrofitting an existing primary school building with green roofing and improved insulation to reduce energy costs and improve classroom conditions.', 
 'Ikorodu, Lagos', '2025-07-10'),

(1, 'Recycled-Material Footbridge Construction', 
 'Building a pedestrian footbridge using recycled steel and sustainably sourced wood to connect two communities separated by a seasonal flood channel.', 
 'Badagry, Lagos', '2025-09-05'),

(1, 'Community Market Rebuild with Sustainable Materials', 
 'Reconstruction of a local open-air market using eco-bricks, bamboo framing, and passive cooling design to support small-scale traders while minimizing carbon footprint.', 
 'Mushin, Lagos', '2025-11-18'),

(2, 'Rooftop Vegetable Garden Initiative', 
 'Conversion of an unused apartment rooftop into a productive vegetable garden, providing fresh produce to residents and serving as a demonstration site for space-efficient urban farming techniques.', 
 'Yaba Lagos', '2025-02-10'),

(2, 'School Garden and Nutrition Education Program', 
 'Establishment of a vegetable garden at a local primary school paired with a curriculum teaching children about growing food, healthy eating, and composting.', 
 'Surulere Lagos', '2025-04-14'),

(2, 'Community Compost Hub', 
 'Creation of a neighborhood composting station that collects household food waste and converts it into nutrient-rich soil for use in nearby community gardens.', 
 'Ojota Lagos', '2025-06-20'),

(2, 'Vacant Lot to Urban Farm Conversion', 
 'Transformation of an abandoned lot into a working urban farm growing vegetables and herbs, with produce sold at subsidized prices to nearby residents.', 
 'Ajegunle Lagos', '2025-08-08'),

(2, 'Farmers Market and Food Sustainability Workshop Series', 
 'Launch of a weekly farmers market alongside monthly workshops teaching residents about sustainable growing methods, seed saving, and reducing household food waste.', 
 'Agege Lagos', '2025-10-25'),

(3, 'Neighborhood Cleanup Volunteer Drive', 
 'Organization of a large-scale volunteer cleanup effort across local streets and public spaces, coordinating teams to collect waste and restore shared community areas.', 
 'Ikeja Lagos', '2025-01-18'),

(3, 'Orphanage Support and Mentorship Program', 
 'Recruitment and scheduling of volunteers to provide tutoring, mentorship, and recreational activities for children at a local orphanage on a weekly basis.', 
 'Ikotun Lagos', '2025-03-29'),

(3, 'Food Bank Volunteer Coordination Initiative', 
 'Management of volunteer shifts for sorting, packing, and distributing donated food items to a partner food bank serving low-income households.', 
 'Oshodi Lagos', '2025-06-05'),

(3, 'Elderly Care Home Visitation Program', 
 'Coordination of volunteer visits to a local elderly care home, organizing companionship activities, errands, and basic assistance for residents.', 
 'Mile 12 Lagos', '2025-08-30'),

(3, 'Disaster Relief Volunteer Response Network', 
 'Building a roster of trained volunteers ready to mobilize quickly in support of local charities responding to floods and other emergencies affecting nearby communities.', 
 'Lekki Lagos', '2025-11-02');

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
--which establishes a many-to-many relationship between projects and categories
CREATE TABLE projects_category(
	project_id INTEGER REFERENCES projects(project_id),
	category_id INTEGER REFERENCES category(category_id),
	PRIMARY KEY (project_id, category_id)
);