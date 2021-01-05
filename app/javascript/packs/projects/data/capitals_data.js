const capitalsUS = [
  { prompt: "Alabama", answers: ['montgomery'] },
  { prompt: "Alaska", answers: ['juneau'] },
  { prompt: "Arizona", answers: ['phoenix'] },
  { prompt: "Arkansas", answers: ['little rock'] },
  { prompt: "California", answers: ['sacramento'] },
  { prompt: "Colorado", answers: ['denver'] },
  { prompt: "Connecticut", answers: ['hartford'] },
  { prompt: "Delaware", answers: ['dover'] },
  { prompt: "Florida", answers: ['tallahassee'] },
  { prompt: "Georgia", answers: ['atlanta'] },
  { prompt: "Hawaii", answers: ['honolulu'] },
  { prompt: "Idaho", answers: ['boise'] },
  { prompt: "Illinois", answers: ['springfield'] },
  { prompt: "Indiana", answers: ['indianapolis'] },
  { prompt: "Iowa", answers: ['des moines'] },
  { prompt: "Kansas", answers: ['topeka'] },
  { prompt: "Kentucky", answers: ['frankfort'] },
  { prompt: "Louisiana", answers: ['baton rouge'] },
  { prompt: "Maine", answers: ['augusta'] },
  { prompt: "Maryland", answers: ['annapolis'] },
  { prompt: "Massachusetts", answers: ['boston'] },
  { prompt: "Michigan", answers: ['lansing'] },
  { prompt: "Minnesota", answers: ['saint paul'] },
  { prompt: "Mississippi", answers: ['jackson'] },
  { prompt: "Missouri", answers: ['jefferson city'] },
  { prompt: "Montana", answers: ['helena'] },
  { prompt: "Nebraska", answers: ['lincoln'] },
  { prompt: "Nevada", answers: ['carson city'] },
  { prompt: "New Hampshire", answers: ['concord'] },
  { prompt: "New Jersey", answers: ['trenton'] },
  { prompt: "New Mexico", answers: ['santa fe'] },
  { prompt: "New York", answers: ['albany'] },
  { prompt: "North Carolina", answers: ['raleigh'] },
  { prompt: "North Dakota", answers: ['bismarck'] },
  { prompt: "Ohio", answers: ['columbus'] },
  { prompt: "Oklahoma", answers: ['oklahoma city'] },
  { prompt: "Oregon", answers: ['salem'] },
  { prompt: "Pennsylvania", answers: ['harrisburg'] },
  { prompt: "Rhode Island", answers: ['providence'] },
  { prompt: "South Carolina", answers: ['columbia'] },
  { prompt: "South Dakota", answers: ['pierre'] },
  { prompt: "Tennessee", answers: ['nashville'] },
  { prompt: "Texas", answers: ['austin'] },
  { prompt: "Utah", answers: ['salt lake city'] },
  { prompt: "Vermont", answers: ['montpelier'] },
  { prompt: "Virginia", answers: ['richmond'] },
  { prompt: "Washington", answers: ['olympia'] },
  { prompt: "West Virginia", answers: ['charleston'] },
  { prompt: "Wisconsin", answers: ['madison'] },
  { prompt: "Wyoming", answers: ['cheyenne'] }
];

const capitalsDE = [
  { prompt: "Baden-Württemberg", answers: ['stuttgart'] },
  { prompt: "Bavaria (Bayern)", answers: ['munich', 'münchen', 'munchen'] },
  { prompt: "Berlin", answers: ['berlin'] },
  { prompt: "Brandenburg", answers: ['potsdam'] },
  { prompt: "Bremen", answers: ['bremen'] },
  { prompt: "Hamburg", answers: ['hamburg'] },
  { prompt: "Hesse (Hessen)", answers: ['wiesbaden'] },
  { prompt: "Lower Saxony (Niedersachsen)", answers: ['hanover', 'hannover'] },
  { prompt: "Mecklenburg-Vorpommern", answers: ['schwerin'] },
  { prompt: "North Rhine-Westphalia (Nordrhein-Westfalen)", answers: ['düsseldorf', 'dusseldorf'] },
  { prompt: "Rhineland-Palatinate (Rheinland-Pfalz)", answers: ['mainz'] },
  { prompt: "Saarland", answers: ['saarbrücken', 'saarbrucken'] },
  { prompt: "Saxony (Sachsen)", answers: ['dresden'] },
  { prompt: "Saxony-Anhalt (Sachsen-Anhalt)", answers: ['magdeburg'] },
  { prompt: "Schleswig-Holstein", answers: ['kiel'] },
  { prompt: "Thuringia (Thüringen)", answers: ['erfurt'] }
];

const capitalsPL = [
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] },
  { prompt: '', answers:[''] }
];

const capitalsES = [
  { prompt: 'Andalusia (Andalucía)', answers:['seville', 'sevilla'] },
  { prompt: 'Catalonia (Catalunya / Cataluña)', answers:['barcelona'] },
  { prompt: 'Community of Madrid (Comunidad de Madrid)', answers:['madrid'] },
  { prompt: 'Valencian Community (Comunitat Valenciana)', answers:['valencia'] },
  { prompt: 'Galicia', answers:['santiago de compostela'] },
  { prompt: 'Castile and León (Castilla y León)', answers:['valladolid'] },
  { prompt: 'Basque Country (Euskadi / País Vasco)', answers:['vitoria-gasteiz', 'vitoria', 'gasteiz'] },
  { prompt: 'Castilla-La Mancha', answers:['toledo'] },
  { prompt: 'Canary Islands (Canarias)', answers:['las palmas de gran canaria and santa cruz de tenerife', 'las palmas and santa cruz'] },
  { prompt: 'Region of Murcia (Región de Murcia)', answers:['murcia'] },
  { prompt: 'Aragon (Aragón)', answers:['zaragoza'] },
  { prompt: 'Extremadura', answers:['mérida', 'merida'] },
  { prompt: 'Balearic Islands (Islas Baleares)', answers:['palma'] },
  { prompt: 'Principality of Asturias (Principado de Asturias)', answers:['oviedo'] },
  { prompt: 'Chartered Community of Navarre (Comunidad Foral de Navarra)', answers:['pamplona'] },
  { prompt: 'Cantabria', answers:['santander'] },
  { prompt: 'La Rioja', answers:['logroño', 'logrono'] }
];

export const categories = [
  {
    name: "US State Capitals",
    value: "us",
    questions: capitalsUS
  },
  {
    name: "German Bundesländer Capitals",
    value: "de",
    questions: capitalsDE
  },
  {
    name: "Spanish Autonomous Community Capitals",
    value: "es",
    questions: capitalsES
  }
  /*,
  {
    name: "Polish Voivodeship Capitals",
    value: "pl",
    questions: capitalsPL
  }*/
]
