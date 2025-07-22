INSERT INTO roles (role, description) VALUES
  ('admin', 'Full access to all system features, including user management and configuration.'),
  ('editor', 'Can manage and update data but cannot perform system-level or user role changes.'),
  ('reader', 'View-only access; cannot create, update, or delete any records.');

INSERT INTO users (firstname, lastname, username, password, role_id) VALUES ('admin', 'admin', 'admin', '$2b$10$iw8MW5hEAUCaXKnZiqjYKO.XhPqojx8wdDHlqqjxRZzCHO/HUxS32', 1)