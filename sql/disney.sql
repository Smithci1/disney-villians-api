SHOW DATABASES;
CREATE DATABASE disney3;
USE disney3;
SHOW TABLES;
CREATE TABLE users (
id INT AUTO_INCREMENT,
name VARCHAR(255),
movie VARCHAR(255),
slug VARCHAR(255),
primary key(id)
);
SHOW TABLES;
USE disney3;
SELECT * FROM users;

INSERT INTO users (name, movie, slug) VALUES ('Captain Hook','Peter Pan','captain-hook'),('Cruella de Vil','One Hundred and One Dalmatians','cruella-de-vil'),('Gaston','Beauty and the Beast','gaston'),('Hades','Hercules','hades'),
('Horned King','The Black Cauldron','horned-king'),('Jafar','Aladdin','jafar'),('Lady Tremaine','Cinderella','lady-tremaine'),('Madame Medusa','The Rescuers','madame-medusa'),('Madam Mim','The Sword in the Stone','madam-mim'),('Maleficent','Sleeping Beauty','maleficent'),('Prince John','Robin Hood','sir-hiss'),('Queen Grimhilde','Snow White and the Seven Dwarfs','queen-grimhilde'),
('Queen of Hearts','Alice in Wonderland','queen-of-hearts'),('Scar','The Lion King','scar'),('Shan Yu','Mulan','shan-yu'),('Shere Khan','The Jungle Book','shere-khan'),('Ursula','The Little Mermaid','ursula');
SELECT * FROM users;	
INSERT INTO users (name, movie, slug) VALUES ('Sir Hiss','Robin Hood','sir-hiss')		
