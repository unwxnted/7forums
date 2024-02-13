CREATE DATABASE 7forums;
USE 7forums;
CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)    
);

INSERT INTO users(username, password) VALUES('wknss', 'root123');
INSERT INTO posts(title, content, user_id) VALUES('Welcome to 7forums', 'Hi everyone, im wknss the main dev of this forum, and I want to say welcome and thanks for viewing this website!', 1);
