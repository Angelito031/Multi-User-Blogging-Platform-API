CREATE TABLE roles(
    id serial PRIMARY KEY,
    role VARCHAR(150) UNIQUE NOT NULL,
    description text NOT NULL
);

CREATE TABLE users(
    uid serial PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL, 
    password VARCHAR(60) NOT NULL,
    role_id INT, 
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

CREATE TABLE blogs(
    bid serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INT NOT NULL REFERENCES users(uid) ON DELETE CASCADE
)

CREATE TABLE comments(
    cid serial PRIMARY KEY,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    blog_id INT NOT NULL REFERENCES blogs(bid) ON DELETE CASCADE
)