# Smart-Trash-Bins

Teil des Projektes Smarte Mülleimer im Kurs *Geoinformatics in transdisciplinary education*

![App](/public/images/app.gif) 

***

### Installation

1. Install [nodejs](https://nodejs.org/en/)
2. Clone repository
3. Run (`sudo`) `npm install`
4. Run <br>
a) `node server.js` for simple webserver <br>
b) `MODE=API node server.js` for webserver and REST-API or with flags `node server.js --mode api`
5. For the second mode you need to install [PostgreSQL](https://www.postgresql.org) and the extension [PostGIS](http://postgis.net) as first, before starting the webserver
6. After the installation create a new database with the name `giitde` and execute the SQL-files inside the repository-folder `/sql`

### Contributors

:octocat: [Nicholas Schiestel](https://github.com/nicho90) (Server group)<br>
:octocat: [Boris Stöcker](https://github.com/Flugmango) (App group)<br>
:octocat: [Cedric Lünnemann](https://github.com/CLue1988) (Hardware group)<br>
:octocat: [Shahzeib Tariq Jaswal](https://github.com/shahzeib) (Hardware group)<br>
:busts_in_silhouette: Schüler der Anne-Frank-Gesamtschule Havixbeck

### License

**The MIT License** (Please see the `LICENSE`-file for more information)
