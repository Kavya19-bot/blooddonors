CREATE DATABASE bloodconnect;

USE bloodconnect;
CREATE TABLE donors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    location VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    availability VARCHAR(20) NOT NULL
);

INSERT INTO donors
(name, blood_group, phone, location, age, availability)
VALUES
('Rahul Kumar', 'O+', '9876543210', 'Mysore', 24, 'Available'),

('Ananya Rao', 'A+', '9876543211', 'Bangalore', 22, 'Available'),

('Kiran Shetty', 'B+', '9876543212', 'Mangalore', 28, 'Unavailable');

CREATE TABLE requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(100) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    quantity INT NOT NULL,
    hospital VARCHAR(150) NOT NULL,
    location VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    phone VARCHAR(15) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active'
);

INSERT INTO requests
(patient_name, blood_group, quantity, hospital, location, date, time, phone, description, status)
VALUES
(
    'Arjun Patil',
    'O+',
    2,
    'Apollo Hospital',
    'Bangalore',
    '2026-08-18',
    '10:30:00',
    '9876543220',
    'Urgent requirement of O+ blood for surgery',
    'Active'
),

(
    'Sneha Rao',
    'A+',
    1,
    'KIMS Hospital',
    'Hubli',
    '2026-08-19',
    '14:00:00',
    '9876543221',
    'Blood required for emergency treatment',
    'Active'
),

(
    'Ravi Kumar',
    'B+',
    3,
    'Manipal Hospital',
    'Mangalore',
    '2026-08-20',
    '09:00:00',
    '9876543222',
    'Blood required for major surgery',
    'Fulfilled'
);

SELECT * FROM donors;

SELECT * FROM requests;

SELECT *
FROM donors
WHERE id = 1;


SELECT *
FROM donors
WHERE blood_group = 'O+';

SELECT *
FROM donors
WHERE availability = 'Available';

SELECT *
FROM donors
WHERE location = 'Mysore';

SELECT *
FROM donors
WHERE blood_group = 'O+'
AND availability = 'Available';

INSERT INTO donors
(name, blood_group, phone, location, age, availability)
VALUES
('Kavya Gadkar', 'O+', '9876543230', 'Belgaum', 20, 'Available');


UPDATE donors
SET
    name = 'Kavya Gadkar',
    blood_group = 'A+',
    phone = '9876543230',
    location = 'Belgaum',
    age = 20,
    availability = 'Available'
WHERE id = 4;

UPDATE donors
SET availability = 'Unavailable'
WHERE id = 1;

DELETE FROM donors
WHERE id = 4;

SELECT *
FROM requests
WHERE id = 1;

SELECT *
FROM requests
WHERE status = 'Active';

SELECT *
FROM requests
WHERE blood_group = 'O+';

SELECT *
FROM requests
WHERE location = 'Bangalore';

INSERT INTO requests
(
    patient_name,
    blood_group,
    quantity,
    hospital,
    location,
    date,
    time,
    phone,
    description,
    status
)
VALUES
(
    'Priya Sharma',
    'O-',
    2,
    'City Hospital',
    'Belgaum',
    '2026-08-21',
    '11:00:00',
    '9876543240',
    'Urgent blood requirement',
    'Active'
);

UPDATE requests
SET status = 'Fulfilled'
WHERE id = 1;

UPDATE requests
SET status = 'Closed'
WHERE id = 1;

DELETE FROM requests
WHERE id = 1;

SELECT *
FROM requests
WHERE blood_group = 'O+'
AND status = 'Active';

SELECT *
FROM donors
WHERE blood_group = 'O+'
AND availability = 'Available';

SELECT *
FROM donors
WHERE name LIKE '%Rahul%';

SELECT *
FROM donors
WHERE name LIKE '%Rahul%'
   OR location LIKE '%Mysore%';

SELECT COUNT(*) AS total_donors
FROM donors;

SELECT COUNT(*) AS available_donors
FROM donors
WHERE availability = 'Available';

SELECT COUNT(*) AS active_requests
FROM requests
WHERE status = 'Active';

SELECT
    blood_group,
    COUNT(*) AS total_donors
FROM donors
GROUP BY blood_group;

SELECT
    blood_group,
    COUNT(*) AS total_requests
FROM requests
GROUP BY blood_group;

SELECT
    status,
    COUNT(*) AS total
FROM requests
GROUP BY status;


SELECT *
FROM donors
ORDER BY age ASC;

SELECT *
FROM requests
ORDER BY id DESC;