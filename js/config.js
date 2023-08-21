//Some of the settings may or may not work as this is not a fully completed update. Mainly Appearance settings and weather variables that arent finished.
//Input API Keys below. If no API is inputted, sim will default to no report.
var api_key = 'e1f10a1e78da46f5b10a1e78da96f525';
var map_key = 'sk.eyJ1IjoicGljZWxib2kiLCJhIjoiY2xraXFhZzl6MDV3bDN0azZ0YjNrYmgwYSJ9.8plxnS0F8bbz3hI1pAaCuQ'
//Weatherscan.net mapbox key
//var map_key = 'pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaW4wbzllcjkwYWtrd2JsdWl3dG1hZjZ1In0.AdcjoWQiVfvjHfOB0nsyeQ';


//Apperance settings. Fields left blank will use defaults. Will only refresh upon reload.
var apperanceSettings = {
  iconSet:"2023", //2007 or 2010 
  serialNumber:" TPBC3141592",// Ex. "TWCS02983932"
  headinID:" Nowhere | 31415926535", // Ex. "0298393223"
  affilateName:" Waddle Dee Comms.",// Ex. "Comcast"
  logoURL:"/images/WDDC.png", //image size must be 879*184px or similar aspect ratio.
  corebackgroud:"neighborhood", //forest, mountain, city, buildings, neighborhood, southwest, ocean. Default is buildings.
  backgroudType:"",//Set to
  backgroudURL:"",//If background type set to "custom" will use this url. URL can be a website or local file path.
  marqueeAd: ["Weirderscan is brought to you by GitHub pages. Made by Goldblaze, ruined by PicelBoi, blah blah blah."], //Array of strings. Each string will be a seperate marquee ad.
}
var slideApperanceSettings = {//Ill add more options here eventually.
  localDoppler: {},
  cityIntro: {},
  currentConditions: {cityHeaderEnding: ""},
  city8Slides: {},
  dayPart: {cityHeaderEnding: "Area"},
  dayDesc: {cityHeaderEnding: "Area"},
  extendedForecast: {cityHeaderEnding: "Area"},
  almanac: {cityHeaderEnding: ""},
  severeCityIntro: {},
  severeMessage: {},
  severeCurrentConditions: {cityHeaderEnding: ""},
  severeCity8Slides: {},
  severeDayPart: {cityHeaderEnding: ""},
  severeDayDesc: {cityHeaderEnding: ""},
  severeExtendedForecast: {cityHeaderEnding: ""},
  severeAlmanac: {cityHeaderEnding: ""},
  travelIntro: {},
  destinationForecast: {cityHeaderEnding: ""},
  internationalIntro: {},
  internationalForecast: {cityHeaderEnding: ""},
  beachIntro: {},
  beachConditions: {},
  costalWatersAlerts: {},
  costalWatersForecast: {},
  healthIntro: {},
  healthForecast: {cityHeaderEnding: ""}, //ill make these work later too lazy right now
  pollen: {cityHeaderEnding: ""},
  achesBreath: {cityHeaderEnding: ""},
  airQuality: {cityHeaderEnding: ""},
  uvIndex: {cityHeaderEnding: ""},
  healthTip: {cityHeaderEnding: ""},
  moreInfoImage: {cityHeaderEnding: ""},
}
/*For locidx, all, extra, or number can be used. Random or reverse can be used with all or extra.
All will add all the cities to the loop and extra will add all but the main.
Additionaly, with extra or all, slideOrder, slideDelay, and repeat takes multiple setups in an array.
Currently, only cityslides and severecityslides are set up to work with locidx.

For skipping, a testDisplay function is added. This function must return true for the slide to skip.
Functions have access to global variable only, and location index by inserting replaceLocIdx.
An alternate slide can be added by adding alternate:{slide}.

For this to work properly, there must be two packages in the loop that are not skipped. I might try to address this later if it doesn't add too many checks.
*/
var slideLoopSettings = {
  order:[
      {type:"cities",repeat:0,locidx:0,slideDelay:10000,slideOrder:[{name:"cityIntro",slideDelay:""},{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"city8Slides",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:"return (Math.random() > 0.5) ? true : false",alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayDesc",slideDelay:""},{name:"extendedForecast",slideDelay:""},{name:"almanac",slideDelay:""}]},
      {type:"health",repeat:true,locidx:0,slideDelay:10000,slideOrder:[{name:"healthIntro",slideDelay:""},{name:"healthForecast",slideDelay:""},{name:"pollen",slideDelay:"",testDisplay:"if (!weatherInfo.healthPollen.totalcat || weatherInfo.healthforecast.noReport != false) {return true}"},{name:"achesBreath",slideDelay:""},{name:"airQuality",slideDelay:""},{name:"uvIndex",slideDelay:""},{name:"healthTip",slideDelay:""},{name:"moreInfoImage",slideDelay:""}]},
      {type:"travel",repeat:true,locidx:0,slideDelay:10000,slideOrder:[{name:"travelIntro",slideDelay:""},{name:"destinationForecast",slideDelay:""}]},
      {type:"cities",repeat:0,locidx:0,slideDelay:10000,slideOrder:[{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayPart",slideDelay:""},{name:"extendedForecast",slideDelay:""}]},
      {type:"cities",repeat:true,locidx:'extra',slideDelay:10000,slideOrders:[[{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayPart",slideDelay:""},{name:"extendedForecast",slideDelay:""}],[{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayDesc",slideDelay:""}]]},
      {type:"airport",repeat:true,locidx:0,slideDelay:10000,slideOrder:[{name:"airportIntro",slideDelay:""},{name:"airportConditions",slideDelay:""},{name:"otherAirportConds",slideDelay:""}]},
      {type:"international",repeat:true,locidx:0,slideDelay:10000,slideOrder:[{name:"internationalIntro",slideDelay:""},{name:"internationalForecast",slideDelay:""}]},
      {type:"cities",repeat:true,locidx:'extra reverse',slideDelay:10000,slideOrders:[[{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayPart",slideDelay:""},{name:"extendedForecast",slideDelay:""}],[{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayDesc",slideDelay:""}]]},
      {type:"radar",repeat:0,locidx:0,slideDelay:60000,slideOrder:[{name:"localDoppler",slideDelay:""}]},
      {type:"cities",loopComplete:true,repeat:true,locidx:0,slideDelay:10000,slideOrder:[{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayDesc",slideDelay:""},{name:"cityIntro",slideDelay:""},{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}'},{name:"currentConditions",slideDelay:""},{name:"city8Slides",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"dayDesc",slideDelay:""},{name:"extendedForecast",slideDelay:""},{name:"almanac",slideDelay:""}]},
    ]
}
var severeLoopSettings = {radarTransition:true,order:[
  {type:"severe-cities",repeat:true,locidx:0,slideDelay:10000,slideOrder:[{name:"bulletin",slideDelay:"",testDisplay:'if (weatherInfo.bulletin.weatherLocs[replaceLocIdx].enabled != true) {return true}',alternate:{name:"severeMessage",slideDelay:""}}/*,{name:"severeCurrentConditions",slideDelay:""},{name:"severeCity8Slides",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"severeDayDesc",slideDelay:""},{name:"severeExtendedForecast",slideDelay:""},{name:"severeAlmanac",slideDelay:""}*/]},
  {type:"severe-cities",repeat:true,locidx:0,slideDelay:10000,slideOrder:[{name:"severeCurrentConditions",slideDelay:""},{name:"localDoppler",slideDelay:"",testDisplay:'return (Math.random() > 0.5) ? true : false',alternate:{name:"regionalSatellite",slideDelay:""}},{name:"severeDayPart",slideDelay:""},{name:"severeExtendedForecast",slideDelay:""}]}
]}
var indexvoice = Math.floor(Math.random() * (4- 1)+ 1);
var audioSettings = {
  enableMusic: true, //Something is wrong if you set this to false.
  order: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,80,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171], //The order the music will play. To include or exclude tracks add or remove their number to the order. Default is 1-33. 34-46 are known 2003 tracks excluding duplicates with 2007. 47-51 are known 2006 tracks excluding duplicates with 2007 and 2003. 52-53 are other weatherscan tracks from unknown year. 54-66 is Trammel Starks 1 not used in any other section. 67-76 is Trammel Starks 2 excluding duplicates. 77-83 is Trammel Starks 3 excluding duplicates.
  shuffle: true, //Shuffle audio. Default is false.
  randomStart: true, //Starts the order from a random spot. Default is true.
  enableNarrations: true, //Play narrations. Default is true.
  narrationType: indexvoice,//allen or female. Default is female. picelboi added in weirderscan v1.1.1. cantore added in v1.2. 1 is allen, 2 is female, 3 is picelboi, 4 is cantore.
}
var locationSettings = {
  mainLocation:{
    displayName:"",//Name that will show up on the sim.
    searchQuery:{ //Type and val are required fields for search to work. Will be overridden if location is given in URL.
      type:"",//Leave type blank to use automatic search. "geocode", "state", "district", "city", "locality", "neighborhood", "postal" (zipcode), "address", "poi", "pws" (personal weatherstation) //If geocode is used all otherfields but val will be ignored.
      fuzzy:true, //Attempt approximate search.
      country:"US", //Two letter country code. //Recommend using "US".
      state:"", //Two letter state code.
      val:"", //for geocode "lat,lon"
      searchResultNum:2,//Defaults to 0. Use if the first result for a particular location sucks.
    }
  },
  extraLocations: {
    useAutoLocations: true, //Will add automatically searched locations to the list.
    maxLocations: 7, //Will limit amount of locations that appear on sim. Default is 7.
    locationOrderNum:[5,4,3,9,2,6,1], //Ordernum for automatically generated locations. Lower number will be placed closer to the front.
    locs:[
    {
      displayName:'New York',
      orderNum:2,
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"US",
        state:"NY",
        val:"40.730610, -73.935242",
        searchResultNum:"",
      }
    },
    {
      displayName:"Beijing",
      orderNum:6,
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"CN",
        state:"",
        val:"39.90806,116.36052",
        searchResultNum:"",
      }
    },
    {
      displayName:"Tokyo",
      orderNum:1,
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"JP",
        state:"",
        val:"35.6762,139.6503",
        searchResultNum:"",
      }
    },
  ]},
  aroundCityInfoLocs: {
    useAutoLocations: true, //Will add automatically searched locations to the list.
    maxLocations: 6, //Will limit amount of locations that appear on sim. Default is 8. Hard Limit is 8.
    locationOrderNum:[5,4,3,2,6,1], //Ordernum for automatically generated locations. Lower number will be placed closer to the front.
    locs:[//Cities for the nearby cities slide
    {
      displayName:'New York',
      orderNum:2,
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"US",
        state:"NY",
        val:"40.730610, -73.935242",
        searchResultNum:"",
      }
    },
    {
      displayName:"Beijing",
      orderNum:6,
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"CN",
        state:"",
        val:"39.90806,116.36052",
        searchResultNum:"",
      }
    },
    {
      displayName:"Tokyo",
      orderNum:1,
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"JP",
        state:"",
        val:"35.6762,139.6503",
        searchResultNum:"",
      }
    },
  ]},
  marqueeCities: [// Cities for the ccticker.
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
    {
      displayName:"",
      searchQuery:{
        type:"",
        fuzzy:true,
        country:"",
        state:"",
        val:"",
        searchResultNum:"",
      }
    },
  ],//to be functional in a future update
  airportLocations:[//For main airports slide.
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
  ],
  otherAirportLocations:[//For other airports slide.
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
    {
      displayName:"",
      iataCode:"",
    },
  ]
}
//var mapSettings = {}
//to be functional in a future update
//This section will deal with all weather variables. Blank fields will use API data. You can update this via console and data will be refreshed on a set time.
var weatherInfoSettings = {
  currentCond: {
    sidebar: {
      noReport:false, //If true, shows no report.
      displayname:"", //Ove
      temp:"", //
      cond:"",
      icon:"",
      humid:"",
      dewpt:"",
      pressure:"",
      wind:"",
      windspeed:"",
      gust:"",
      feelslike: {type:"",val:""},
      visibility:"",
      uvidx:"",
      ceiling:""
    },
    //loc:{noReport:"",displayname:"",temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""},},
    weatherLocs:[

    ],
  //cityLoc:{noReport:false,displayname:"",temp:"",icon:"",wind:"",windspeed:""}
  city8slides:{noReport:false, cities:[]},
}, dayPart: {
  lowerbar:{noReport:false,displayname:"",daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]},
  /*loc:{noReport:"",displayname:"",daytitle:"",hour:[
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
    {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
  ]},*/
  weatherLocs:[],
}, dayDesc: {
  lowerbar: {noReport:false,displayname:"",day:[{name:"",desc:""},{name:"",desc:""},{name:"",desc:""},{name:"",desc:""}]},
  /*loc:{noReport:"",displayname:"",day:[
    {name:"",desc:""},
    {name:"",desc:""},
    {name:"",desc:""},
    {name:"",desc:""}
  ]},*/
  weatherLocs:[]
}, fiveDay: {
    lowerbar: {noReport:false,displayname:"",day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""}]},
    /*loc:{noReport:"",displayname:"",day:[
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
      {name:"",cond:"",icon:"",high:"",low:"",windspeed:""}
    ]},*/
    weatherLocs:[]
  }, almanac: {displayname:"",date:"",avghigh:"",avglow:"",rechigh:"",reclow:"",rechighyear:"",reclowyear:"",sunrise:"",sunset:"",moonphases:[
    {name:"NEW",date:"Feb 10"},
    {name:"FIRST",date:"Feb 16"},
    {name:"FULL",date:"Feb 21"},
    {name:"LAST",date:"Feb 27"},
  ]}, bulletin: {
    //loc:{displayname:"",pages:[]},
    includesevereonbulletin: false,
    weatherLocs:[],
    severewarnings:[],
    //{name:"", desc:"", status:""}
    marqueewarnings:[],
    severeweathermode: false
    //{name:"", desc:"", status:"", significance:""}
  }, healthforecast: {noReport:false, displayname:"",dayidx:0, day:"", high:"", low:"", precipChance:"", humid:"", wind:"",windspeed:"", icon:""
  }, healthPollen: {noReport:false, displayname:"", total:"", totalcat:"", date:"", types:[
    {type:"tree", treetype:"", pollenidx:""},
    {type:"grass", pollenidx:""},
    {type:"weed", pollenidx:""},
    {type:"mold", pollenidx:""},
  ]}, healthAcheBreath: {noReport:false, date:"",achesindex:"",achescat:"",breathindex:"",breathcat:""
  },  airquality: {noReport:false, date:"",ozoneactin: false, primarypolute:"", airqualityindex:""
  },  uvindex: {noReport:false, currentuv:{index:"",desc:""},forecast:[
    {day:"",time:"",index:"",desc:""},
    {day:"",time:"",index:"",desc:""},
    {day:"",time:"",index:"",desc:""}
  ]}, airport: {noReport: false, mainairports:[
    {displayname:"",iata:"MIA",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""},
    {displayname:"",iata:"MCO",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""}
  ], delays: [],
    //{iato:"",type:"",amount:"",amountmin:"",reason:""}
   otherairports:[
    {displayname:"New York / John F. Kennedy",iata:"JFK",delay:";)",temp:"",icon:"",windspeed:""},
    {displayname:"Chicago O'hare Int'l",iata:"ORD",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Los Angeles Int'l",iata:"LAX",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Atlanta International",iata:"LAX",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Dallas / Ft. Worth Int'l",iata:"DFW",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Denver International",iata:"DEN",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Boston / Logan Int'l",iata:"BOS",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Salt Lake City Int'l",iata:"SLC",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Miami International",iata:"MIA",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Phoenix / Sky Harbor",iata:"PHX",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Minneapolis - St. Paul",iata:"MSP",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Washington Dulles Int'l",iata:"IAD",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"San Francisco Int'l",iata:"SFO",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Philadelphia Int'l",iata:"PHL",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Seattle - Tacoma Int'l",iata:"SEA",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"Lambert - St. Louis Int'l",iata:"STL",delay:"No Delay",temp:"",icon:"",windspeed:""},
    {displayname:"The Worst Airport",iata:"WST",delay:"69420",temp:"",icon:"",windspeed:""},
  ]},
  ccticker: {noReportCC:false,noReportFC:false,noReportAC:false,arrow:"",ccLocs:[],ccairportdelays:[]},
  radarTempUnavialable: false,
  radarWinterLegend: false,
  reboot: true,
  ad: "Hoshi No Kaabii is brought to you by the Nintendo Gamecube. Nintendo Gamecube. Now you're playing with power. GitHub Copilot added this text. Blah blah blah. Made by Goldblaze, ruined by PicelBoi."
}
