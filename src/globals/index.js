const development = location.href && location.href.includes('localhost')
const BACKEND_URL = development ? 'http://localhost:8090' : 'https://armory-backend.whydoisuckatvideogames.com';
const FRONTEND_URL = development ? 'http://localhost:5000' : 'https://classicarmory.org';
const PATREON_URL = 'https://www.patreon.com/classicarmory';
const DISCORD_URL = 'https://discord.gg/cVDp6en';
const ADDON_URL = 'https://github.com/pattez/pattez_armory';

const genders = {
    1: 'Neutrum / Unknown',
    2: 'Male',
    3: 'Female',
}
function zerolize(number) {
    if (number < 10) {
        return `0${number}`
    }
    return number
}
const formatDate = d => {
    const date = new Date(d)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${zerolize(
        date.getDate()
    )}
  ${zerolize(date.getHours())}:${zerolize(date.getMinutes())}:${zerolize(
        date.getSeconds()
    )}`
}

const INVENTORY_ITEMS = {
    slot_1: 'Head',
    slot_2: 'Neck',
    slot_3: 'Shoulders',
    slot_4: 'Shirt',
    slot_5: 'Chest',
    slot_6: 'Waist',
    slot_7: 'Legs',
    slot_8: 'Feet',
    slot_9: 'Wrists',
    slot_10: 'Hands',
    slot_11: 'Ring 1',
    slot_12: 'Ring 2',
    slot_13: 'Trinket 1',
    slot_14: 'Trinket 2',
    slot_15: 'Back',
    slot_16: 'Main hand',
    slot_17: 'Off hand',
    slot_18: 'Ranged',
    slot_19: 'Tabard',
}

const RANKS = {
    15: 'Private',
    16: 'Corporal',
    17: 'Sergeant',
    18: 'Master Sergeant',
    19: 'Sergeant Major',
    110: 'Knight',
    111: 'Knight-Lieutenant',
    112: 'Knight-Captain',
    113: 'Knight-Champion',
    114: 'Lieutenant Commander',
    115: 'Commander',
    116: 'Marshal',
    117: 'Field Marshal',
    118: 'Grand Marshal',
    25: 'Scout',
    26: 'Grunt',
    27: 'Sergeant',
    28: 'Senior Sergeant',
    29: 'First Sergeant',
    210: 'Stone Guard',
    211: 'Blood Guard',
    212: 'Legionnaire',
    213: 'Centurion',
    214: 'Champion',
    215: 'Lieutenant General',
    216: 'General',
    217: 'Warlord',
    218: 'High Warlord'
}

const SERVERS = {
    1: { name: 'Ashbringer', type: 'PVP' },
    2: { name: 'Bloodfang', type: 'PVP' },
    3: { name: 'Dragonfang', type: 'PVP' },
    4: { name: 'Dreadmist', type: 'PVP ' },
    5: { name: 'Earthshaker', type: 'PVP' },
    6: { name: 'Firemaw', type: 'PVP' },
    7: { name: 'Flamelash', type: 'PVP' },
    8: { name: 'Gandling', type: 'PVP' },
    9: { name: 'Gehennas', type: 'PVP' },
    10: { name: 'Golemagg', type: 'PVP' },
    11: { name: 'Hydraxian Waterlords', type: 'RP' },
    12: { name: 'Judgement', type: 'PVP' },
    13: { name: 'Mirage Raceway', type: 'Normal' },
    14: { name: 'Mograine', type: 'PVP' },
    15: { name: 'Nethergarde Keep', type: 'Normal' },
    16: { name: 'Noggenfogger', type: 'PVP' },
    17: { name: 'Pyrewood Village', type: 'Normal' },
    18: { name: 'Razorgore', type: 'PVP' },
    19: { name: 'Shazzrah', type: 'PVP' },
    20: { name: 'Skullflame', type: 'PVP' },
    21: { name: 'Stonespine', type: 'PVP' },
    22: { name: 'Ten Storms', type: 'PVP' },
    23: { name: 'Zandalar Tribe', type: 'RPPVP' },
    24: { name: 'Anathema', type: 'PvP' },
    25: { name: 'Arcanite Reaper', type: 'PvP' },
    26: { name: 'Arugal', type: 'PvP' },
    27: { name: 'Ashkandi', type: 'PvE' },
    28: { name: 'Atiesh', type: 'PvE' },
    29: { name: 'Azuresong', type: 'PvE' },
    30: { name: 'Benediction', type: 'PvP' },
    31: { name: 'Bigglesworth', type: 'PvP' },
    32: { name: 'Blaumeux', type: 'PvP' },
    33: { name: 'Bloodsail Buccaneers', type: 'RP' },
    34: { name: 'Deviate Delight', type: 'PvPRP' },
    35: { name: 'Earthfury', type: 'PvP' },
    36: { name: 'Faerlina', type: 'PvP' },
    37: { name: 'Fairbanks', type: 'PvP' },
    38: { name: 'Felstriker', type: 'PvP' },
    39: { name: 'Grobbulus', type: 'PvPRP' },
    40: { name: 'Heartseeker', type: 'PvP' },
    41: { name: 'Herod', type: 'PvP' },
    42: { name: 'Incendius', type: 'PvP' },
    43: { name: 'Kirtonos', type: 'PvP' },
    44: { name: 'Kromcrush', type: 'PvP' },
    45: { name: 'Kurinnaxx', type: 'PvP' },
    46: { name: 'Loatheb', type: 'PvP' },
    47: { name: 'Mankrik', type: 'PvE' },
    48: { name: 'Myzrael', type: 'PvE' },
    49: { name: 'Netherwind', type: 'PvP' },
    50: { name: 'Old Blanchy', type: 'PvE' },
    51: { name: 'Pagle', type: 'PvE' },
    52: { name: 'Rattlegore', type: 'PvP' },
    53: { name: 'Remulos', type: 'PvE' },
    54: { name: 'Skeram', type: 'PvP' },
    55: { name: 'Smolderweb', type: 'PvP' },
    56: { name: 'Stalagg', type: 'PvP' },
    57: { name: "ul'thraze", type: 'PvP' },
    58: { name: 'Sulfuras', type: 'PvP' },
    59: { name: 'Thalnos', type: 'PvP' },
    60: { name: 'Thunderfury', type: 'PvP' },
    61: { name: 'Westfall', type: 'PvE' },
    62: { name: 'Whitemane', type: 'PvP' },
    63: { name: 'Windseeker', type: 'PvE' },
    64: { name: 'Yojamba', type: 'PvP' },
  };

  const RACES = {
    1: { name: 'Human', faction: 'Alliance' },
    2: { name: 'Orc', faction: 'Horde' },
    3: { name: 'Dwarf', faction: 'Alliance' },
    4: { name: 'Night Elf', faction: 'Alliance' },
    5: { name: 'Undead', faction: 'Horde' },
    6: { name: 'Tauren', faction: 'Horde' },
    7: { name: 'Gnome', faction: 'Alliance' },
    8: { name: 'Troll', faction: 'Horde' },
  };


export { BACKEND_URL, genders, zerolize, formatDate, INVENTORY_ITEMS, FRONTEND_URL, PATREON_URL, DISCORD_URL, ADDON_URL, SERVERS, RACES, RANKS }
