INSERT INTO users (user_name, email, user_password) VALUES ('Karen', 'Karen@test.com', 123);
INSERT INTO users (user_name, email, user_password) VALUES ('Bob', 'Bob@test.com', 123);
INSERT INTO users (user_name, email, user_password) VALUES ('Peter', 'Peter@test.com', 123);
INSERT INTO users (user_name, email, user_password) VALUES ('Thanos', 'Thanos@test.com', 123);

INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Create Database',4,2,'Alpha','Karen');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Wireframing',4,1,'Alpha','Bob');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Write user story',4,2,'Alpha','Peter');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Collect Infinity Stones',4,4,'Alpha','Thanos');


INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Mix Cocktails',4,4,'Party','Karen');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Get food',4,2,'Party','Bob');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Hire dancers',1,5,'Party','Peter');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Get Liability Insurance',2,10,'Party','Thanos');

INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Plan Route',1,5,'Fieldtrip','Karen');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Pack Bags',2,5,'Fieldtrip','Bob');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Get ripped',4,5,'Fieldtrip','Peter');
INSERT INTO tasks (task, task_priority, task_duration, project_id, user_name) VALUES ('Steal spaceship',1,10,'Fieldtrip','Thanos');

