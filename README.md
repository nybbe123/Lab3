# Dynamisk webbutveckling - Lab 3

## Beskrivning av projekt:
I denna inlämning har vi skapat en chatt-baserad applikation som låter användare chatta med varandra. Kommunikationen mellan klienten och servern görs med socket.io.
En användare kan skapa ett nytt rum där det är möjligt att chatta med andra användare.

## Utvecklat av:
* *Jonatan Nyberg* (https://github.com/nybbe123) 
* *Max Andersson* (https://github.com/frontMAX)
* *Emil Hagelin* (https://github.com/empafrontend)
* *Simon Eriksson* (https://github.com/Vacannot)

## Kom igång:
Öppna terminalen och skriv `npm i`
följt av `npm start`.
Öppna därefter din browser och skriv in http://localhost:3000

## Betygskriterier
### Godkänt:
- [] Användaren får börja med att välja ett eget visningsnamn när den besöker sidan.
- [] Det ska gå att skapa ett rum (och samtidigt gå med i rummet).
- [] Det ska gå att lämna ett rum (tomma rum ska automatiskt försvinna).
- [] Samtliga rum skall vara synligt i en lista.
- [] De går att gå med i ett rum genom att klicka på det i listan.
- [] När en användare går med i ett nytt rum ska befintligt rum lämnas automatiskt.
- [] Användare ska kunna skicka och läsa nya meddelanden i rummet de har gått med i.
- [] När en användare håller på att skriva ett meddelande skall det synas för alla andra i rummet.
- [] Git & GitHub har använts.
- [] Projektmappen innehåller en README.md fil (läs ovan för mer info).
- [] Uppgiften lämnas in i tid!

### Väl godkänt:
- [] Alla punkter för godkänt är uppfyllda.
- [] Varje rum i listan skall även visa vilka användare som finns i rummet.
- [] Det ska gå att ha privata konversationer med enskilda användare (DM’s).
- [] Historik ska sparas för skickade meddelanden och visas när en konversation öppnas (gäller både för Rum och för DM’s).
- [] När sidan laddas om ska användaren behålla sitt användarnamn, läggas tillbaka i konversationen som den befann sig i (Rum eller DM) och kunna sina läsa tidigare DM’s.