const concerts = [
    {
        date: "23/11/19",
        venue: "La Sala Rossa",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "06/11/19",
        venue: "Inkonst",
        city: "Malmo",
        country: "Sweden"
    },
    {
        date: "06/11/19",
        venue: "Chmury",
        city: "Warsaw",
        country: "Poland"
    },
    {
        date: "05/11/19",
        venue: "Aleponija",
        city: "Riga",
        country: "Latvia"
    },
    {
        date: "03/11/19",
        venue: "Sveta",
        city: "Talinn",
        country: "Estonia"
    },
    {
        date: "02/11/19",
        venue: "Opera House",
        city: "Saint-Petersburg",
        country: "Moscow"
    },
    {
        date: "01/11/19",
        venue: "Powerhouse",
        city: "Moscow",
        country: "Russia"
    },
    {
        date: "18/10/19",
        venue: "Brooklyn Bazaar",
        city: "Brooklyn",
        country: "USA"
    },
    {
        date: "13/10/19",
        venue: "Agora Hydro Quebec",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "12/10/19",
        venue: "Not Dead Yet",
        city: "Toronto",
        country: "Canada"
    },
    {
        date: "28/09/19",
        venue: "Espace Tam Tam",
        city: "Quebec City",
        country: "Canada"
    },
    {
        date: "16/08/19",
        venue: "Up Here Festival",
        city: "Sudbury",
        country: "Canada"
    },
    {
        date: "15/08/19",
        venue: "CCA",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "21/06/19",
        venue: "Casa Del Popolo",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "01/06/19",
        venue: "DAda",
        city: "Toulouse",
        country: "France"
    },
    {
        date: "29/05/19",
        venue: "Fettschmelze",
        city: "Karlsruhe",
        country: "Germany"
    },
    {
        date: "23/05/19",
        venue: "Slimelight",
        city: "London",
        country: "UK"
    },
    {
        date: "23/05/19",
        venue: "Poglos",
        city: "Warsaw",
        country: "Poland"
    },
    {
        date: "16/05/19",
        venue: "MS Stubnitz",
        city: "Hamburg",
        country: "Germany"
    },
    {
        date: "11/05/19",
        venue: "Hangar 49",
        city: "Berlin",
        country: "Germany"
    },
    {
        date: "05/04/19",
        venue: "La Sala Rossa",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "01/03/19",
        venue: "Katacombes",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "29/09/18",
        venue: "Galerie d'art d'Ottawa",
        city: "Ottawa",
        country: "Canada"
    },
    {
        date: "19/07/18",
        venue: "Le Festif",
        city: "Baie-Saint-Paul",
        country: "Canada"
    },
    {
        date: "27/04/18",
        venue: "Punk House",
        city: "Ottawa",
        country: "Canada"
    },
    {
        date: "26/04/18",
        venue: "Le Pantoum",
        city: "Quebec City",
        country: "Canada"
    },
    {
        date: "20/04/18",
        venue: "La Sotterenea",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "03/02/18",
        venue: "O Patro Vys",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "16/12/17",
        venue: "Market Hotel",
        city: "Brooklyn",
        country: "USA"
    },
    {
        date: "03/09/17",
        venue: "La Sala Rossa",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "03/09/17",
        venue: "L'Escogriffe",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "24/08/17",
        venue: "Kalabalik",
        city: "Tyrolen i Bladinge",
        country: "Sweden"
    },
    {
        date: "19/08/17",
        venue: "Manifest",
        city: "Utrecht",
        country: "Netherlands"
    },
    {
        date: "19/08/17",
        venue: "W-Festival",
        city: "Wortegem-Petegem",
        country: "Belgium"
    },
    {
        date: "17/08/17",
        venue: "Pontoon",
        city: "Budapest",
        country: "Hungary"
    },
    {
        date: "14/08/17",
        venue: "Pizzini",
        city: "Bamberg",
        country: "Germany"
    },
    {
        date: "13/08/17",
        venue: "(A)VOID Floating Gallery",
        city: "Prague",
        country: "Austria"
    },
    {
        date: "16/08/17",
        venue: "Celeste",
        city: "Vienna",
        country: "Austria"
    },
    {
        date: "12/08/17",
        venue: "Hangar 49",
        city: "Berlin",
        country: "Germany"
    },
    {
        date: "11/08/17",
        venue: "Poglos",
        city: "Warsaw",
        country: "Poland"
    },
    {
        date: "08/08/17",
        venue: "Klub Festiwalowy Arsenał",
        city: "Wroclaw",
        country: "Poland"
    },
    {
        date: "05/08/17",
        venue: "Klub Kegelbahn",
        city: "Luzern",
        country: "Switzerland"
    },
    {
        date: "04/08/17",
        venue: "Marina Basel",
        city: "Basel",
        country: "Switzerland"
    },
    {
        date: "02/08/17",
        venue: "Sender",
        city: "Zurich",
        country: "Switzerland"
    },
    {
        date: "28/07/17",
        venue: "Connexion",
        city: "Toulouse",
        country: "France"
    },
    {
        date: "21/07/17",
        venue: "L'Espace B",
        city: "Paris",
        country: "France"
    },
    {
        date: "20/07/17",
        venue: "The Waiting Room",
        city: "London",
        country: "UK"
    },
    {
        date: "19/07/17",
        venue: "The Hug And Pint",
        city: "Glasgow",
        country: "Scotland"
    },
    {
        date: "16/03/17",
        venue: "Théâtre Fairmount",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "31/12/16",
        venue: "La Vitrola",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "03/12/16",
        venue: 'Château H',
        city: "Sainte-Julia",
        country: "France"
    },
    {
        date: "02/12/16",
        venue: "Le Sonic",
        city: "Lyon",
        country: "France"
    },
    {
        date: "01/12/16",
        venue: "Altercafé",
        city: "Nantes",
        country: "France"
    },
    {
        date: "30/11/16",
        venue: "Joker's Pub",
        city: "Angers",
        country: "France"
    },
    {
        date: "26/11/16",
        venue: "Supersonic",
        city: "Paris",
        country: "France"
    },
    {
        date: "25/11/16",
        venue: "Koloni / Skjul Fyra Sex",
        city: "Goteborg",
        country: "Sweden"
    },
    {
        date: "24/11/16",
        venue: "Drone",
        city: "Copenhagen", 
        country: "Denmark"
    },
    {
        date: "21/11/16",
        venue: "LAS", 
        city: "Poznan",
        country: "Poland"
    },
    {
        date: "19/11/16",
        venue: "Pogłos",
        city: "Warsaw",
        country: "Poland"
    },
    {
        date: "18/11/16",
        venue: "Yucatan",
        city: "Vilnius", 
        country: "Lithuania"
    },
    {
        date: "17/11/16",
        venue: "Kultuuriklubi Kelm",
        city: "Talinn", 
        country: "Estonia"
    },
    {
        date: "13/11/16",
        venue: "Ionoteka",
        city: "St. Petersburg",
        country: "Russia"
    },
    {
        date: "12/11/16",
        venue: "Dich Bar",
        city: "Moscow",
        country: "Russia"
    },
    {
        date: "11/11/16",
        venue: "Hirscheneck",
        city:  "Basel",
        country: "Switzerland"
    },
    {
        date: "09/11/16",
        venue: "Fanfulla 5/a",
        city:  "Rome", 
        country: "Italy"
    },
    {
        date: "06/11/16",
        venue: "MENU", 
        city: "Hradec Králové",
        country: "Czech"
    },
    {
        date: "05/11/16",
        venue: "Gieszer 16",
        city: "Leipzig", 
        country: "Germany"
    },
    {
        date: "04/11/16",
        venue: "Druckluft",
        city: "Oberhausen", 
        country: "Germany"
    },
    {
        date: "03/11/16",
        venue: "De gym",
        city: "Groningue", 
        country: "Netherlands"
    },
    {
        date: "02/11/16",
        venue: "Vrankrijk",
        city: "Amsterdam", 
        country: "Netherlands"
    },
    {
        date: "27/10/16",
        venue: "Nice N Sleazy",
        city: "Glasgow", 
        country: "Scotland"
    },
    {
        date: "21/09/16",
        venue: "RITZ",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "19/07/16",
        venue: "La Sala Rossa",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "11/06/16",
        venue: "La Sala Rossa",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "28/05/16",
        venue: "Monitor Festival",
        city: "Leiria",
        country: "Portugal"
    },
    {
        date: "22/05/16",
        venue: "Hockli Klocki",
        city: "Warsaw", 
        country: "Poland"
    },
    {
        date: "21/05/16",
        venue: "Green Zoo Festival",
        city: "Krakow", 
        country: "Poland"
    },
    {
        date: "20/05/16",
        venue: "Punctum",
        city: "Prague", 
        country: "Czech"
    },
    {
        date: "19/05/16",
        venue: "Rhiz",
        city: "Vienna",
        country: "Austria"
    },
    {
        date: "18/05/16",
        venue: "Postgarage",
        city: "Graz",
        country: "Austria"
    },
    {
        date: "17/05/16",
        venue: "Pritlicje",
        city: "Ljubljana",
        country: "Slovenia"
    },
    {
        date: "15/05/16",
        venue: "Podravec",
        city: "Zagreb",
        country: "Croatia"
    },
    {
        date: "12/05/16",
        venue: "Café Central",
        city: "Brussels", 
        country: "Belgium"
    },
    {
        date: "07/05/16",
        venue: "Yachtklub",
        city: "Frankfurt", 
        country: "Germany"
    },
    {
        date: "06/05/16",
        venue: "Djazz Jazzkeller",
        city: "Duisburg", 
        country: "Germany"
    },
    {
        date: "05/05/16",
        venue: "Loophole",
        city: "Berlin", 
        country: "Germany"
    },
    {
        date: "30/04/16",
        venue: "Casa Del Popolo",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "23/04/16",
        venue: "La Sala Rossa",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "26/03/16",
        venue: "RITZ",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "12/02/16",
        venue: "La Sala Rossa",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "18/12/15",
        venue: "L'Escalier",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "05/12/15",
        venue: "Casa Del Popolo",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "01/12/15",
        venue: "Cafee Koz",
        city: "Frankfurt", 
        country: "Germany"
    },
    {
        date: "28/11/15",
        venue: "Tsunami",
        city: "Koln", 
        country: "Germany"
    },
    {
        date: "24/11/15",
        venue: "Komma",
        city: "Esslingen", 
        country: "Germany"
    },
    {
        date: "22/11/15",
        venue: "La Triperie",
        city: "Lyon", 
        country: "France"
    },
    {
        date: "21/11/15",
        venue: "Festival Randfilm",
        city: "Kassel", 
        country: "Germany"
    },
    {
        date: "17/11/15",
        venue: "Zorlu",
        city: "Istanbul",
        country: "Turkey"
    },
    {
        date: "15/11/15",
        venue: "Atlantico",
        city: "Rome", 
        country: "Italy"
    },
    {
        date: "14/11/15",
        venue: "Rivolta",
        city: "Venice", 
        country: "Italy"
    },
    {
        date: "13/11/15",
        venue: "Teatro Della Concordia",
        city: "Turin", 
        country: "Italy"
    },
    {
        date: "11/11/15",
        venue: "Huxleys",
        city: "Berlin", 
        country: "Germany"
    },
    {
        date: "08/11/15",
        venue: "Progresja",
        city: "Warsaw", 
        country: "Poland"
    },
    {
        date: "06/11/15",
        venue: "Rockefeller",
        city: "Oslo",
        country: "Norway"
    },
    {
        date: "05/11/15",
        venue: "Debaser Medis",
        city: "Stockholm", 
        country: "Sweden",
    },
    {
        date: "18/09/15",
        venue: "Village Au Pied Du Courant",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "17/09/15",
        venue: "POP Box",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "04/07/15",
        venue: "Katacombes",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "21/06/15",
        venue: "La Vitrola",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "24/05/15",
        venue: "Chmury", 
        cty: "Warsaw",
        country: "Poland"
    },
    {
        date: "19/05/15",
        venue: "Death Disco",
        city: "Athens",
        country: "Greece"
    },
    {
        date: "16/05/15",
        venue: "L'Oeil De Chatte",
        city: "Liege", 
        country: "Belgium"
    },
    {
        date: "15/05/15",
        venue: "Komma",
        city: "Esslingen", 
        country: "Germany"
    },
    {
        date: "14/05/15",
        venue: "Mudd Club",
        city: "Strasbourg", 
        country: "France"
    },
    {
        date: '11/05/15',
        venue: "Chaff",
        city: "Brussels", 
        country: "Belgium"
    },
    {
        date: "10/05/15",
        venue: "Rouge",
        city: "Lille", 
        country: "France"
    },
    {
        date: "09/05/15",
        venue: "L'Espace B",
        city: "Paris", 
        country: "France"
    },
    {
        date: "08/05/15",
        venue: "La Triperie",
        city: "Lyon", 
        country: "France"
    },
    {
        date: "06/05/15",
        venue: "Urban Spree",
        city: "Berlin", 
        country: "Germany"
    },
    {
        date: "02/05/15",
        venue: "Dreikönigskeller",
        city: "Frankfurt", 
        country: "Germany"
    },
    {
        date: "12/04/15",
        venue: "RITZ",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "06/02/15",
        venue: "La Vitrola",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "14/11/14",
        venue: "La Vitrola",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "01/11/14",
        venue: "Deathwish",
        city: "Toronto", 
        country: "Canada"
    },
    { 
        date: "31/07/14",
        venue: "Playhouse",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date: "21/06/14",
        venue:"Librairie St-Jean-Baptiste",
        city: "Quebec City", 
        country: "Canada"
    },
    {
        date: "18/06/14",
        venue: "La Sala Rossa",
        city: "Montreal", 
        country: "Canada"
    },
    {
        date:  "14/06/14",
        venue: "Jewish General Hospital",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "02/05/14",
        venue: "Le bercail",
        city: "Rimouski",
        country: "Canada"
    },
    {
        date: "17/01/14",
        venue: "Land Of Milk And Honey",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "30/11/13",
        venue: "Silent Barn",
        city: "New York",
        country: "USA"
    },
    {
        date: "22/10/13",
        venue: "Casa Del Popolo", 
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "11/06/13",
        venue: "Casa Del Popolo",
        city: "Montreal",
        country: "Canada"
    },
    {
        date: "21/03/13",
        venue: "Cercle Carré",
        city: "Montreal",
        country: "Canada"
    }
];

module.exports = {concerts};