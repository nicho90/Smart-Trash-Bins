# Smart-Trash-Bins


[![license][licence-img]][licence-url]

[licence-img]:https://img.shields.io/badge/licence-MIT-blue.svg?style=flat-square
[licence-url]:https://opensource.org/licenses/MIT

![App](/public/images/app.gif) 

Teil des Projektes Smarte Mülleimer im Kurs *Geoinformatics in transdisciplinary education*

#### In the local newspaper:

![az](/public/images/az.jpg)

*16.09.2016: Der intelligente Mülleimer erkennt Inhalt und Füllstand, der Messstand wird auf einer App angezeigt. Bauteile und Programme entwickelten Schüler der Anne-Frank-Gesamtschule im Rahmen ihrer Projektwoche. Foto: Klaus de Carné*


(Full article: [http://www.azonline.de/Muensterland/Kreis-Coesfeld/2534384-Anne-Frank-Gesamtschueler-praesentieren-Ergebnisse-ihrer-Projektwoche-Muell-im-Forscher-Fokus](http://www.azonline.de/Muensterland/Kreis-Coesfeld/2534384-Anne-Frank-Gesamtschueler-praesentieren-Ergebnisse-ihrer-Projektwoche-Muell-im-Forscher-Fokus))

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
