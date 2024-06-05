let prompt = require("prompt-sync")();
const { log } = require('console');
const pg = require('pg');

let config = {
    user: 'postgres',
    database: 'patisserie',
    password: 'mihaja123',
    port: 5432
};

let pool = new pg.Pool(config);

pool.connect(function (err, client, done) {

    function welcome() {
        console.log("----------Bienvenu dans la patisserie TYMN----------");
        console.log();
    }

    function fonction() {
        console.log("Quel est votre role dans cette patisserie?");
        console.log("1 - employe");
        console.log("2 - client");
        let role = +prompt("=> ");
        console.log();
        return role;
    }

    function choix(role) {
        if (role == 1) {
            console.log("Que souhaitez-vous faire?");
            console.log("1 - Voir la liste des gateaux");
            console.log("2 - Voir le nombre de client dans le mois");
            console.log("3 - Ajouter un nouveau gateau");
            console.log("4 - Enlever un gateau");
            console.log("5 - Quitter");
            let action_employe = +prompt("=>");

            if (action_employe == 1) {
                client.query('SELECT * FROM gateau', (err, res) => {
                    console.log('Liste des gateaux :');
                    console.log(res.rows);
                    done();
                });
            }

            else if (action_employe == 2) {
                client.query('select COUNT(*) AS nombre_de_clients FROM commande WHERE date_commande < current_date', (err, res) => {
                    if (err) {
                        console.error("error");
                        done();
                    } else {
                        console.log('le nombre de client de ce mois est :');
                        console.log(res.rows[0]);
                        done();
                    }
                })
            }
            else if (action_employe == 3) {
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
                        done();
                    }
                });
            }

            else if (action_employe == 4) {
                let id_gateau = +prompt("Insérer l'id du gateau à enlever :");
                client.query('DELETE FROM gateau WHERE id_gateau = $1', [id_gateau], (err, res) => {
                    if (err) {
                        console.log("Erreur dans la suppression");
                    } else {
                        console.log('Suppression réussie');
                        done(); } 
                    });
            }
            else if (action_employe == 5) {
                console.log("Merci, a tres bientot");
                done();
            }
            else {
                console.log("Reessayer");
                choix(role)
            }
        }
        else if (role == 2) {
            console.log("Que souhaitez-vous faire?");
            console.log("1 - Voir la liste des gateaux");   //nom, prix, categorie
            console.log("2 - Faire une commande");
            console.log("3 - Voir la description d'un gateau");
            console.log("4 - Quitter");
            let action_client = prompt("=>");

            if (action_client == 1) {
                //voir la liste des gateaux
            }
            else if (action_client == 2) {
                //faire une commande
            }
            else if (action_client == 3) {
                //voir la description d'un gateau
            }
            else if (action_client == 4) {
                console.log("Merci d'avoir utilise notre service");
                done();
            }
            else {
                console.log("Reessayer");
                choix(role)
            }
        }
        else {
            console.log("Qui etes-vous?");
            result();
        }
    }

    function result() {
        let role = fonction();
        choix(role);
    }


    //appel de tout les fontions
    welcome();
    result();
});