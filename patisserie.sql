CREATE TABLE client(
        id_client     Int NOT NULL ,
        nom_client    Varchar (200) NOT NULL ,
        prenom_client Varchar (200) NOT NULL ,
        adresse       Varchar (150) NOT NULL ,
        telephone     Varchar (150) NOT NULL ,
        email         Varchar (200) NOT NULL
	,CONSTRAINT client_PK PRIMARY KEY (id_client)
);


CREATE TABLE promotion(
        id_promotion   Int NOT NULL ,
        pourcentage    Decimal NOT NULL ,
        date_promotion Date NOT NULL
	,CONSTRAINT promotion_PK PRIMARY KEY (id_promotion)
);

CREATE TABLE paiement(
        id_paiement   Int NOT NULL ,
        date_paiement Date NOT NULL ,
        id_client     Int NOT NULL
	,CONSTRAINT paiement_PK PRIMARY KEY (id_paiement)

	,CONSTRAINT paiement_client_FK FOREIGN KEY (id_client) REFERENCES client(id_client)
);

CREATE TABLE commande(
        id_commande   Int NOT NULL ,
        date_commande Date NOT NULL ,
        id_client     Int NOT NULL ,
        id_paiement   Int NOT NULL
	,CONSTRAINT commande_PK PRIMARY KEY (id_commande)

	,CONSTRAINT commande_client_FK FOREIGN KEY (id_client) REFERENCES client(id_client)
	,CONSTRAINT commande_paiement0_FK FOREIGN KEY (id_paiement) REFERENCES paiement(id_paiement)
);

CREATE TABLE employe(
        id_employe     Int NOT NULL ,
        nom_employe    Varchar (200) NOT NULL ,
        prenom_employe Varchar (200) NOT NULL ,
        salaire        Decimal NOT NULL
	,CONSTRAINT employe_PK PRIMARY KEY (id_employe)
);

CREATE TABLE gateau(
        id_gateau    Int NOT NULL ,
        nom_gateau   Varchar (150) NOT NULL ,
        description  Text NOT NULL ,
        categorie    Varchar (50) NOT NULL ,
        prix         Decimal NOT NULL ,
        id_employe   Int NOT NULL ,
        id_promotion Int NOT NULL
	,CONSTRAINT gateau_PK PRIMARY KEY (id_gateau)

	,CONSTRAINT gateau_employe_FK FOREIGN KEY (id_employe) REFERENCES employe(id_employe)
	,CONSTRAINT gateau_promotion0_FK FOREIGN KEY (id_promotion) REFERENCES promotion(id_promotion)
);

CREATE TABLE contenir(
        id_gateau   Int NOT NULL ,
        id_commande Int NOT NULL ,
        quantite    Int NOT NULL
	,CONSTRAINT contenir_PK PRIMARY KEY (id_gateau,id_commande)

	,CONSTRAINT contenir_gateau_FK FOREIGN KEY (id_gateau) REFERENCES gateau(id_gateau)
	,CONSTRAINT contenir_commande0_FK FOREIGN KEY (id_commande) REFERENCES commande(id_commande)
);

-------INSERT
insert into client values
        (1, 'Benjamina', 'Faly', 'Itaosy', '03200298465', 'benja@gmail.com'),
        (2, 'Rasoa', 'Tiana', 'Analamahitsy', '0341234567', 'tiana.rasoa@example.com'),
        (3, 'Rakoto', 'Andry', 'Ambatonakanga', '0327654321', 'andry.rakoto@example.com'),
        (4, 'Ravelona', 'Hery', 'Ankatso', '0330987654', 'hery.ravelona@example.com'),
        (5, 'Raharinirina', 'Lala', 'Ambodivona', '0348765432', 'lala.raharinirina@example.com'),
        (6, 'Rabe', 'Ny Aina', 'Ivandry', '0329876543', 'nyaina.rabe@example.com'),
        (7, 'Rajaonarivelo', 'Feno', 'Ambohijatovo', '0345678901', 'feno.rajaonarivelo@example.com'),
        (8, 'Rakotomalala', 'Solofo', 'Antanimena', '0332345678', 'solofo.rakotomalala@example.com'),
        (9, 'Rasoamanarivo', 'Voahirana', 'Anosibe', '0323456789', 'voahirana.rasoamanarivo@example.com'),
        (10, 'Randriamampionona', 'Tahina', 'Ampefiloha', '0346789012', 'tahina.randriamampionona@example.com');

INSERT INTO employe (id_employe, nom_employe, prenom_employe, salaire) VALUES
        (1, 'Dupont', 'Jean', 2500.00),
        (2, 'Martin', 'Marie', 2600.00),
        (3, 'Bernard', 'Luc', 2700.00),
        (4, 'Dubois', 'Emma', 2800.00),
        (5, 'Petit', 'Paul', 2900.00),
        (6, 'Leroy', 'Julie', 3000.00),
        (7, 'Garcia', 'Luis', 3100.00),
        (8, 'Martinez', 'Ana', 3200.00),
        (9, 'Lopez', 'Carlos', 3300.00),
        (10, 'Sanchez', 'Laura', 3400.00);

INSERT INTO promotion (id_promotion, pourcentage, date_promotion) VALUES
        (1, 10.0, '2023-01-01'),
        (2, 15.0, '2023-02-01'),
        (3, 20.0, '2023-03-01'),
        (4, 25.0, '2023-04-01'),
        (5, 30.0, '2023-05-01');

INSERT INTO gateau (id_gateau, nom_gateau, description, categorie, prix, id_employe, id_promotion) VALUES
        (1, 'Tarte au citron', 'Tarte au citron meringuée', 'Fruit', 12.50, 1, 1);
        (2, 'Pavlova', 'Meringue légère garnie de fruits', 'Dessert', 15.00, 2, 2),
        (3, 'Brownie', 'Brownie fondant au chocolat', 'Chocolat', 8.00, 3, 3),
        (4, 'Gâteau aux carottes', 'Moelleux aux carottes et noix', 'Légume', 10.00, 4, 4),
        (5, 'Eclair a la vanille', 'Eclair garni de creme a la vanille', 'Patisserie', 3.50, 5, 5),
        (6, 'Foret noire', 'Gateau chocolate aux cerises et a la creme', 'Chocolat', 18.00, 6, 1),
        (7, 'Tarte tatin', 'Tarte renversee aux pommes caramelisees', 'Fruit', 14.00, 7, 2),
        (8, 'Paris-Brest', 'Pate a choux garnie de creme mousseline et de noisettes', 'Patisserie', 12.00, 8, 3),
        (9, 'Opera', 'Dessert francais classique', 'Patisserie', 20.00, 9, 4),
        (10, 'Tarte aux fraises', 'Tarte garnie de fraises fraiches', 'Fruit', 16.00, 10, 5);

INSERT INTO paiement (id_paiement, date_paiement, id_client) VALUES
        (1, '2024-05-01', 1),
        (2, '2024-05-02', 2),
        (3, '2024-05-03', 3),
        (4, '2024-05-04', 4),
        (5, '2024-05-05', 5),
        (6, '2024-05-06', 6),
        (7, '2024-05-07', 7),
        (8, '2024-05-08', 8),
        (9, '2024-05-09', 9),
        (10, '2024-05-10', 10);

INSERT INTO commande (id_commande, date_commande, id_client, id_paiement) VALUES
        (1, '2024-06-01', 1, 1),
        (2, '2024-06-02', 2, 2),
        (3, '2024-06-03', 3, 3),
        (4, '2024-06-04', 4, 4),
        (5, '2024-06-05', 5, 5),
        (6, '2024-06-06', 6, 6),
        (7, '2024-06-07', 7, 7),
        (8, '2024-06-08', 8, 8),
        (9, '2024-06-09', 9, 9),
        (10, '2024-06-10', 10, 10);

INSERT INTO contenir (id_gateau, id_commande, quantite) VALUES
        (1, 1, 2),
        (2, 2, 1),
        (3, 3, 3),
        (4, 4, 2),
        (5, 5, 1),
        (6, 6, 2),
        (7, 7, 1),
        (8, 8, 3),
        (9, 9, 2),
        (10, 10, 1);
