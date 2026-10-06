# Hadnagy Gumi – webshop + admin prototípus

## Fájlok
- `index.html` – publikus webshop
- `style.css` – webshop stílus
- `script.js` – webshop logika
- `admin.html` – admin dashboard
- `admin.css` – admin stílus
- `admin.js` – admin demo adatok és rendelésnézet
- `data/products.json` – termék demo adatok
- `data/orders.json` – rendelés demo adatok
- `data/counties.json` – Románia 42 megye
- `logo.png` – Hadnagy Gumi logó

## Megye / település
A megye mező mind a 42 romániai megyét tartalmazza. A településlista a kiválasztott megye után dinamikusan töltődik be a `localitati.dev` SIRUTA-szinkronizált API-jából. Így nem kell 13 000+ települést egyetlen HTML fájlba beágyazni.

API: `https://api.localitati.dev/v1/counties/{MEGYE_KÓD}/localities/light`

A szolgáltatás dokumentációja szerint az adatbázis 42 megyét és 13 000+ romániai települést kezel.

## Fontos
Ez még frontend prototípus. A valódi rendszerben:
- a rendeléseket PostgreSQL-be mentjük;
- az admin külön autentikációt kap;
- a beszállítói azonosító/ár csak backend/admin oldalon lesz elérhető;
- a rendelési státuszok adatbázisból működnek;
- a statisztikák valódi rendelési adatokból készülnek;
- a marketing hozzájárulást külön mezőként kezeljük.

## Admin – beszállítói információk

A rendelés részletes nézetében minden rendelt terméknél megjelenik:
- beszállító neve;
- beszállítói adatbázisból származó beszerzési ár;
- beszállítói cikkszám;
- webshopban megjelenő ár;
- mennyiség;
- számított árrés / db.

Ezek az adatok kizárólag az admin felületen jelennek meg. A publikus webshop JavaScriptje nem jeleníti meg őket.

A mostani HTML/JS verzió demoadatokat használ; éles rendszerben ugyanezeket az adatokat a backend adja vissza az adminisztrátornak jogosultság-ellenőrzés után.

## Admin beszállítói adatok
A rendelés részleteinél az admin látja a termékhez tartozó beszállítót, beszerzési árat, beszállítói cikkszámot, beszállítói azonosítót, webshop árat és számított árrést. Ezeket a valódi rendszerben kizárólag backend jogosultság-ellenőrzés után szabad visszaadni az admin API-nak.

## Települések – v5
A településválasztó már nem a korábbi `api.localitati.dev` endpointot használja.
A teljes SIRUTA-adatfájlt tölti le a nyilvános GitHub-forrásból, majd kliensoldalon
a kiválasztott megye alapján szűri a 13 755 települést. A forrás 42 megyét és
településeket tartalmaz. Végleges éles rendszerben ezt PostgreSQL-ben tároljuk,
hogy a webshop ne függjön külső szolgáltatástól.


### Indítás
A legegyszerűbb: futtasd a `start.bat` fájlt. Ez elindítja a helyi szervert, majd megnyitja a webshopot. Az admin: `http://localhost:3000/admin.html`.
