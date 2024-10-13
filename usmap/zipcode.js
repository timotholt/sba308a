
// Here is JS version tested on a real US zipcode database with 42735 zip codes. Includes exceptions and other US territories like American Samoa, District of Columbia, Guam, Northern Mariana Islands, Puerto Rico, United States Virgin Islands
//
// From: DIma Uchkin
//
// https://stackoverflow.com/questions/28821804/how-can-i-quickly-determine-the-state-for-a-given-zipcode

export const STATE_ZIPCODE = [
    {
        stateCode: "VI",
        stateName: "Virgin Islands",
        zipcodeRange: ["00801", "00851"],
    },
    {
        stateCode: "PR",
        stateName: "Puerto Rico",
        zipcodeRange: ["00601", "00988"],
    },
    {
        stateCode: "RI",
        stateName: "Rhode Island",
        zipcodeRange: ["02801", "02940"],
    },
    {
        stateCode: "NH",
        stateName: "New Hampshire",
        zipcodeRange: ["03031", "03897"],
    },
    {
        stateCode: "GU",
        stateName: "Guam",
        zipcodeRange: ["96910", "96932"],
    },
    {
        stateCode: "MP",
        stateName: "Mariana Islands",
        zipcodeRange: ["96950", "96952"],
    },
    {
        stateCode: "AP",
        stateName: "Armed Forces Pacific",
        zipcodeRange: ["96200", "96600"],
    },

    // Dist of Columbia
    {
        stateCode: "DC",
        stateName: "Dist of Columbia",
        zipcodeRange: ["20001", "20039"],
    },
    {
        stateCode: "DC",
        stateName: "Dist of Columbia",
        zipcodeRange: ["20040", "20100"], 
    },
    {
        stateCode: "DC",
        stateName: "Dist of Columbia",
        zipcodeRange: ["20199", "20599"], 
    },
    {
        stateCode: "DC",
        stateName: "Dist of Columbia",
        zipcodeRange: ["20799", "20799"],
    },
    {
        stateCode: "DC",
        stateName: "Dist of Columbia",
        zipcodeRange: ["56901", "56999"],
    },
    // ---------------
    {
        stateCode: "AL",
        stateName: "Alabama",
        zipcodeRange: ["35004", "36925"],
    },
    {
        stateCode: "AK",
        stateName: "Alaska",
        zipcodeRange: ["99501", "99950"],
    },
    {
        stateCode: "AZ",
        stateName: "Arizona",
        zipcodeRange: ["85001", "86556"],
    },
    {
        stateCode: "AR",
        stateName: "Arkansas",
        zipcodeRange: ["71601", "72959"],
    },
    {
        stateCode: "CA",
        stateName: "California",
        zipcodeRange: ["90001", "96162"],
    },
    {
        stateCode: "CO",
        stateName: "Colorado",
        zipcodeRange: ["80001", "81658"],
    },
    {
        stateCode: "CT",
        stateName: "Connecticut",
        zipcodeRange: ["06001", "06928"],
    },
    {
        stateCode: "DE",
        stateName: "Delaware",
        zipcodeRange: ["19701", "19980"],
    },
    {
        stateCode: "FL",
        stateName: "Florida",
        zipcodeRange: ["32003", "34997"],
    },
    {
        stateCode: "TN",
        stateName: "Tennessee",
        zipcodeRange: ["37010", "38589"],
    },
    {
        stateCode: "MS",
        stateName: "Mississippi",
        zipcodeRange: ["38601", "39776"],
    },
    {
        stateCode: "GA",
        stateName: "Georgia",
        zipcodeRange: ["30002", "39901"],
    },
    {
        stateCode: "HI",
        stateName: "Hawaii",
        zipcodeRange: ["96701", "96898"],
    },
    {
        stateCode: "ID",
        stateName: "Idaho",
        zipcodeRange: ["83201", "83877"],
    },
    {
        stateCode: "IL",
        stateName: "Illinois",
        zipcodeRange: ["60001", "62999"],
    },
    {
        stateCode: "IN",
        stateName: "Indiana",
        zipcodeRange: ["46001", "47997"],
    },
    {
        stateCode: "IA",
        stateName: "Iowa",
        zipcodeRange: ["50001", "52809"],
    },
    {
        stateCode: "KS",
        stateName: "Kansas",
        zipcodeRange: ["66002", "67954"],
    },
    {
        stateCode: "KY",
        stateName: "Kentucky",
        zipcodeRange: ["40003", "42788"],
    },
    {
        stateCode: "LA",
        stateName: "Louisiana",
        zipcodeRange: ["70001", "71497"],
    },
    {
        stateCode: "ME",
        stateName: "Maine",
        zipcodeRange: ["03901", "04992"],
    },
    {
        stateCode: "MD",
        stateName: "Maryland",
        zipcodeRange: ["20588", "21930"],
    },
    {
        stateCode: "VT",
        stateName: "Vermont",
        zipcodeRange: ["05001", "05907"],
    },
    {
        stateCode: "MA",
        stateName: "Massachusetts",
        zipcodeRange: ["01001", "05544"],
    },
    {
        stateCode: "MI",
        stateName: "Michigan",
        zipcodeRange: ["48001", "49971"],
    },
    {
        stateCode: "MN",
        stateName: "Minnesota",
        zipcodeRange: ["55001", "56763"],
    },
    {
        stateCode: "MO",
        stateName: "Missouri",
        zipcodeRange: ["63001", "65899"],
    },
    {
        stateCode: "MT",
        stateName: "Montana",
        zipcodeRange: ["59001", "59937"],
    },
    {
        stateCode: "NE",
        stateName: "Nebraska",
        zipcodeRange: ["68001", "69367"],
    },
    {
        stateCode: "NV",
        stateName: "Nevada",
        zipcodeRange: ["88901", "89883"],
    },
    {
        stateCode: "NJ",
        stateName: "New Jersey",
        zipcodeRange: ["07001", "08989"],
    },
    {
        stateCode: "NM",
        stateName: "New Mexico",
        zipcodeRange: ["87001", "88439"],
    },
    {
        stateCode: "NY",
        stateName: "New York",
        zipcodeRange: ["00501", "14925"],
    },
    {
        stateCode: "NC",
        stateName: "North Carolina",
        zipcodeRange: ["27006", "28909"],
    },
    {
        stateCode: "ND",
        stateName: "North Dakota",
        zipcodeRange: ["58001", "58856"],
    },
    {
        stateCode: "OH",
        stateName: "Ohio",
        zipcodeRange: ["43001", "45999"],
    },
    {
        stateCode: "OK",
        stateName: "Oklahoma",
        zipcodeRange: ["73001", "74966"],
    },
    {
        stateCode: "OR",
        stateName: "Oregon",
        zipcodeRange: ["97001", "97920"],
    },
    {
        stateCode: "PA",
        stateName: "Pennsylvania",
        zipcodeRange: ["15001", "19640"],
    },
    {
        stateCode: "SC",
        stateName: "South Carolina",
        zipcodeRange: ["29001", "29945"],
    },
    {
        stateCode: "SD",
        stateName: "South Dakota",
        zipcodeRange: ["57001", "57799"],
    },
    {
        stateCode: "UT",
        stateName: "Utah",
        zipcodeRange: ["84001", "84791"],
    },
    {
        stateCode: "VA",
        stateName: "Virginia",
        zipcodeRange: ["20040", "24658"],
    },
    {
        stateCode: "WA",
        stateName: "Washington",
        zipcodeRange: ["98001", "99403"],
    },
    {
        stateCode: "WV",
        stateName: "West Virginia",
        zipcodeRange: ["24701", "26886"],
    },
    {
        stateCode: "WI",
        stateName: "Wisconsin",
        zipcodeRange: ["53001", "54990"],
    },
    {
        stateCode: "WY",
        stateName: "Wyoming",
        zipcodeRange: ["82001", "83414"],
    },
    {
        stateCode: "TX",
        stateName: "Texas",
        zipcodeRange: ["73301", "88595"],
    },
];

export function getStateCodeByZipcode(zipcode) {
    const EXCEPTION_ZIPCODES = {
        "05501": "MA",
        "05544": "MA",
        "06390": "NY",
        "20199": "VA",
        "20799": "MD",
        "73301": "TX",
        "73344": "TX",
        "83888": "ID",
        "88441": "NM",
        "72643": "MO",
        "73960": "TX",
        "83414": "WY",
        "20588": "MD",
        "20598": "VA",
        "88888": "DC",
    };

    if (EXCEPTION_ZIPCODES[zipcode]) return EXCEPTION_ZIPCODES[zipcode]

    if (zipcode.startsWith("09")) return "AE";
    if (zipcode.startsWith("340")) return "AA";
    if (zipcode.startsWith("96799")) return "AS";
    if (["96960", "96970"].some((prefix) => zipcode.startsWith(prefix))) return "MH";
    if (["96939", "96940"].some((prefix) => zipcode.startsWith(prefix))) return "PW";
    if (["962", "963", "964", "965", "966"].some((prefix) => zipcode.startsWith(prefix))) return "AP";
    if (["96941", "96942", "96943", "96944"].some((prefix) => zipcode.startsWith(prefix)))return "FM";

    const stateInfo = STATE_ZIPCODE.find((stateInfo) => {
        const zipcodes = [...stateInfo.zipcodeRange, zipcode].sort();

        return zipcodes[1] === zipcode;
    });

    return stateInfo ? stateInfo.stateCode : null;
}
