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

