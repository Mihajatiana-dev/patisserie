let prompt = require("prompt-sync")();
const { log } = require('console');
const pg = require('pg');

let config = {
    user: 'postgres',
    database: 'patisserie',
    password: '100398',  //need to change this psswrd if you log with you pg
    port: 5432
};

let pool = new pg.Pool(config);

pool.connect(function (err, client, done) {

    function welcome() {
        console.log("--------BIENVENU DANS LA PATISSERIE TYMN----------");
        console.log();
    }

    function fonction() {
        console.log("Quel est votre role dans cette patisserie?");
        console.log();
        console.log('*------------- ROLE ------------*');
        console.log('*        (1)  employe           *');
        console.log('*        (2)  client            *');
        console.log('*-------------------------------*');
        let role = +prompt("=> ");
        console.log();
        return role;
    }

    function choix(role) {
        if (role == 1) {
            console.log("Que souhaitez-vous faire?");
            console.log();
            console.log('*---------------- ACTION ----------------*');
            console.log('*      (1)  Voir la liste des gateaux    *');
            console.log('*      (2)  Ajouter un nouveau gateau    *');
            console.log('*      (3)  Enlever un gateau            *');
            console.log('*      (4)  Total des commandes          *');
            console.log('*      (5)  Facture pour un client       *');
            console.log('*      (6)  Quitter                      *');
            console.log('*----------------------------------------*');
            let action_employe = +prompt("=>");

            if (action_employe == 1) {
                client.query('SELECT * from gateau', (err, res) => {
                    console.log('Liste des gateaux :');
                    console.table(res.rows);

                    console.log();
                    choix(role);
                });
            }
            else if (action_employe == 2) {
                let id_gateau = +prompt("Insérer id :");
                let nom_gateau = prompt("Insérer nom :");
                let description = prompt("Insérer la description :");
                let categorie = prompt("Insérer la categorie :");
                let prix = +prompt("Insérer le prix :");
                let id_employe = +prompt("Insérer l'id de l'employe qui le prepare :");
                let id_promotion = +prompt("Insérer l'id de la promotion :");

                const query = `
                INSERT INTO gateau (id_gateau, nom_gateau, description, categorie, prix, id_employe, id_promotion)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;

                client.query(query, [id_gateau, nom_gateau, description, categorie, prix, id_employe, id_promotion], (err, res) => {
                    if (err) {
                        console.log();
                        console.log("Erreur dans l'insertion");
                        choix(role);
                    } else {
                        console.log('Insertion réussie');
                        console.log();
                        console.log();
                        choix(role);
                    }
                });
            }

            else if (action_employe == 3) {
                let id_gateau = +prompt("Insérer l'id du gateau à supprimer :");

                const query = `
                DELETE FROM gateau WHERE id_gateau = $1
            `;

                client.query(query, [id_gateau], (err, res) => {
                    if (err) {
                        console.log();
                        console.log("Erreur dans la suppression");
                        choix(role);
                    } else {
                        console.log();
                        console.log('Suppression réussie');
                        console.log();
                        console.log();
                        choix(role);
                    }
                });
            }
            else if (action_employe == 4) {
                client.query(`SELECT
                    (SELECT COUNT(*) FROM client) AS total_client,
                    (SELECT SUM(contenir.quantite * gateau.prix) 
                    FROM commande 
                    LEFT JOIN client ON commande.id_client = client.id_client 
                    LEFT JOIN contenir ON commande.id_commande = contenir.id_commande 
                    LEFT JOIN gateau ON contenir.id_gateau = gateau.id_gateau) AS total_des_commandes`, (err, res) => {
                        if (err) {
                            console.error(err);
                            choix(role);
                        }
                        else{
                            console.log('Le nombre de client et la somme total des commandes:');
                            console.table(res.rows);
                            choix(role);
                        }
                });
            }
            else if (action_employe == 5) {
                let id_client = +prompt("Insérer l'id du client :");

                const query = `
                     SELECT client.nom_client, client.prenom_client, gateau.nom_gateau, contenir.quantite, commande.date_commande, 
                    SUM(contenir.quantite * gateau.prix) 
                    AS totale_de_la_commande 
                    FROM commande
                    LEFT JOIN client ON commande.id_commande=client.id_client
                    LEFT JOIN contenir ON commande.id_commande=contenir.id_commande
                    LEFT JOIN gateau ON contenir.id_gateau=gateau.id_gateau 
                    WHERE client.id_client = $1
                    GROUP BY client.nom_client, 
                    client.prenom_client, 
                    gateau.nom_gateau, 
                    contenir.quantite, 
                    commande.date_commande; 
                    `;

                    client.query(query, [id_client], (err, res) => {
                    if (err) {
                        console.log(err);
                        console.log("Erreur dans l'execution de la demande");
                        choix(role);
                    } 
                    else{
                        const clientInfo = res.rows[0];
                        const nomClient = clientInfo.nom_client;
                        const prenomClient = clientInfo.prenom_client;
                        console.log();
                        console.log(`La facture de ${nomClient} ${prenomClient}:`);
                        console.table(res.rows)
                        console.log();
                        choix(role);
                    }
                });
            }

            else if (action_employe == 6) {
                console.log();
                console.log("Merci, a tres bientot");
                client.end();
                console.log();
            }
            else {
                console.log("Reessayer");
                choix(role);
            }
        }



        else if (role == 2) {
            console.log("Que souhaitez-vous faire?");
            console.log();
            console.log('*------------------ ACTION ------------------*');
            console.log('*    (1)  Voir la liste des gateaux          *');
            console.log("*    (2)  Voir la description d'un gateau    *");
            console.log('*    (3)  Faire une commande                 *');
            console.log('*    (4)  Rechercher un gateau(par nom)      *');
            console.log('*    (5)  Rechercher un gateau(par type)     *');
            console.log('*    (6)  Rechercher son panier de commandes *');
            console.log('*    (7)  Quitter                            *');
            console.log('*--------------------------------------------*');
            let action_client = prompt("=>");

            if (action_client == 1) {
                client.query('SELECT nom_gateau, categorie, prix FROM gateau', (err, res) => {
                    console.log('Liste des gateaux :');
                    console.table(res.rows);
                    console.log();
                    console.log();
                    choix(role);
                });
            }
            else if (action_client == 2) {
                let id_gateau = +prompt("Insérer l'id du gateau qui vous intéresse :");

                const query = `
                    select description from gateau where id_gateau = $1
                `;

                client.query(query, [id_gateau], (err, res) => {
                    if (err) {
                        console.error('Erreur lors de la récupération de la description du gâteau');
                        choix(role);
                    } else {
                        console.log();
                        console.log('Description du gateau :', res.rows[0].description);
                    }
                    console.log();
                    console.log();
                    choix(role);
                });
            }
            else if (action_client == 3) {
                let id_gateau = +prompt("Insérer l'id du gateau à commander :");
                let id_commande = +prompt("Insérer l'id de votre commande :")
                let quantite = +prompt("Insérer la quantite :");

                const insertContenirQuery = `
            INSERT INTO contenir (id_gateau, id_commande, quantite)
            VALUES ($1, $2, $3)
        `;

                client.query(insertContenirQuery, [id_gateau, id_commande, quantite], (err, res) => {
                    if (err) {
                        console.log("Erreur dans l'insertion du gateau dans la commande");
                        choix(role);
                    } else {
                        console.log();
                        console.log('Gateau ajouté à la commande avec succès');
                        console.log();
                        console.log();
                        choix(role);
                    }
                });
            }
            else if (action_client == 4) {
                let nom_gateau = prompt("Quel gateau recherchez-vous :");

                const query = `
            SELECT nom_gateau, description, categorie, prix FROM gateau where nom_gateau ilike $1
        `;
                const insert = `%${nom_gateau}%`;


                client.query(query, [insert], (err, res) => {
                    if (err) {
                        console.log("Erreur dans la recherche du gateau");
                        choix(role);
                    } else {
                        console.log();
                        console.log("Resultats de votre recherche : ");
                        console.table(res.rows);
                        console.log();
                        choix(role);
                    }
                });
            }
            else if (action_client == 5) {
                let categorie = prompt("Quel type de gateau recherchez-vous :");

                const query = `
            SELECT nom_gateau, description, prix FROM gateau where categorie ilike $1
        `;
                const insert = `%${categorie}%`;


                client.query(query, [insert], (err, res) => {
                    if (err) {
                        console.log("Erreur dans la recherche du gateau");
                        choix(role);
                    } else {
                        console.log();
                        console.log("Resultats de votre recherche : ");
                        console.table(res.rows);
                        console.log();
                        choix(role);
                    }
                });
            }

            else if (action_client == 6) {
                let votreNom = prompt("votre nom:");
                let votrePrenom = prompt("votre prenom:");

                const query = `
                                SELECT gateau.nom_gateau, 
                                contenir.quantite, 
                                gateau.prix,
                                SUM(contenir.quantite * gateau.prix) 
                                AS totale_de_la_commande 
                                FROM commande
                                LEFT JOIN client ON commande.id_commande=client.id_client
                                LEFT JOIN contenir ON commande.id_commande=contenir.id_commande
                                LEFT JOIN gateau ON contenir.id_gateau=gateau.id_gateau 
                                WHERE nom_client ILIKE $1 AND prenom_client ILIKE $2
                                GROUP BY  
                                gateau.nom_gateau, 
                                contenir.quantite, 
                                gateau.prix,
                                commande.date_commande;
        `;


                client.query(query, [`%${votreNom}%`,`%${votrePrenom}%`], (err, res) => {
                    if (err) {
                        console.log("Erreur dans votre demande");
                        choix(role);
                    } else {
                        console.log("Voici votre panier : ");
                        console.table(res.rows);
                        console.log();
                        choix(role);
                    }
                });
            }

            else if (action_client == 7) {
                console.log();
                console.log("Merci d'avoir utilise notre service");
                client.end();
                console.log();
            }
            else {
                console.log("Reessayer");
                choix(role)
            }
        }
        else {
            console.log();
            console.log("Qui etes-vous?");
            result();
        }
    }

    function result() {
        let role = fonction();
        choix(role);
    }

    //appel des fontions
    welcome();
    result();
});