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
    1: { name: 'Ashbringer', type: 'PVP', region: 'eu' },
    2: { name: 'Bloodfang', type: 'PVP', region: 'eu' },
    3: { name: 'Dragonfang', type: 'PVP', region: 'eu' },
    4: { name: 'Dreadmist', type: 'PVP ', region: 'eu' },
    5: { name: 'Earthshaker', type: 'PVP', region: 'eu' },
    6: { name: 'Firemaw', type: 'PVP', region: 'eu' },
    7: { name: 'Flamelash', type: 'PVP', region: 'eu' },
    8: { name: 'Gandling', type: 'PVP', region: 'eu' },
    9: { name: 'Gehennas', type: 'PVP', region: 'eu' },
    10: { name: 'Golemagg', type: 'PVP', region: 'eu' },
    11: { name: 'Hydraxian Waterlords', type: 'RP', region: 'eu' },
    12: { name: 'Judgement', type: 'PVP', region: 'eu' },
    13: { name: 'Mirage Raceway', type: 'Normal', region: 'eu' },
    14: { name: 'Mograine', type: 'PVP', region: 'eu' },
    15: { name: 'Nethergarde Keep', type: 'Normal', region: 'eu' },
    16: { name: 'Noggenfogger', type: 'PVP', region: 'eu' },
    17: { name: 'Pyrewood Village', type: 'Normal', region: 'eu' },
    18: { name: 'Razorgore', type: 'PVP', region: 'eu' },
    19: { name: 'Shazzrah', type: 'PVP', region: 'eu' },
    20: { name: 'Skullflame', type: 'PVP', region: 'eu' },
    21: { name: 'Stonespine', type: 'PVP', region: 'eu' },
    22: { name: 'Ten Storms', type: 'PVP', region: 'eu' },
    23: { name: 'Zandalar Tribe', type: 'RPPVP', region: 'eu' },
    24: { name: 'Anathema', type: 'PvP', region: 'us' },
    25: { name: 'Arcanite Reaper', type: 'PvP', region: 'us' },
    26: { name: 'Arugal', type: 'PvP', region: 'us' },
    27: { name: 'Ashkandi', type: 'PvE', region: 'us' },
    28: { name: 'Atiesh', type: 'PvE', region: 'us' },
    29: { name: 'Azuresong', type: 'PvE', region: 'us' },
    30: { name: 'Benediction', type: 'PvP', region: 'us' },
    31: { name: 'Bigglesworth', type: 'PvP', region: 'us' },
    32: { name: 'Blaumeux', type: 'PvP', region: 'us' },
    33: { name: 'Bloodsail Buccaneers', type: 'RP', region: 'us' },
    34: { name: 'Deviate Delight', type: 'PvPRP', region: 'us' },
    35: { name: 'Earthfury', type: 'PvP', region: 'us' },
    36: { name: 'Faerlina', type: 'PvP', region: 'us' },
    37: { name: 'Fairbanks', type: 'PvP', region: 'us' },
    38: { name: 'Felstriker', type: 'PvP', region: 'us' },
    39: { name: 'Grobbulus', type: 'PvPRP', region: 'us' },
    40: { name: 'Heartseeker', type: 'PvP', region: 'us' },
    41: { name: 'Herod', type: 'PvP', region: 'us' },
    42: { name: 'Incendius', type: 'PvP', region: 'us' },
    43: { name: 'Kirtonos', type: 'PvP', region: 'us' },
    44: { name: 'Kromcrush', type: 'PvP', region: 'us' },
    45: { name: 'Kurinnaxx', type: 'PvP', region: 'us' },
    46: { name: 'Loatheb', type: 'PvP', region: 'us' },
    47: { name: 'Mankrik', type: 'PvE', region: 'us' },
    48: { name: 'Myzrael', type: 'PvE', region: 'us' },
    49: { name: 'Netherwind', type: 'PvP', region: 'us' },
    50: { name: 'Old Blanchy', type: 'PvE', region: 'us' },
    51: { name: 'Pagle', type: 'PvE', region: 'us' },
    52: { name: 'Rattlegore', type: 'PvP', region: 'us' },
    53: { name: 'Remulos', type: 'PvE', region: 'us' },
    54: { name: 'Skeram', type: 'PvP', region: 'us' },
    55: { name: 'Smolderweb', type: 'PvP', region: 'us' },
    56: { name: 'Stalagg', type: 'PvP', region: 'us' },
    57: { name: "Sul'thraze", type: 'PvP', region: 'us' },
    58: { name: 'Sulfuras', type: 'PvP', region: 'us' },
    59: { name: 'Thalnos', type: 'PvP', region: 'us' },
    60: { name: 'Thunderfury', type: 'PvP', region: 'us' },
    61: { name: 'Westfall', type: 'PvE', region: 'us' },
    62: { name: 'Whitemane', type: 'PvP', region: 'us' },
    63: { name: 'Windseeker', type: 'PvE', region: 'us' },
    64: { name: 'Yojamba', type: 'PvP', region: 'us' },
    65: { name: 'Celebras', type: 'RP', region: 'eu' },
    66: { name: "Dragon's Call", type: 'PvP', region: 'eu' },
    67: { name: 'Everlook', type: 'PvE', region: 'eu' },
    68: { name: 'Heartstriker', type: 'PvP', region: 'eu' },
    69: { name: 'Lakeshire', type: 'PvE', region: 'eu' },
    70: { name: 'Lucifron', type: 'PvP', region: 'eu' },
    71: { name: 'Patchwerk', type: 'PvP', region: 'eu' },
    72: { name: 'Razorfen', type: 'PvE', region: 'eu' },
    73: { name: 'Transcendence', type: 'PvP', region: 'eu' },
    74: { name: 'Venoxis', type: 'PvP', region: 'eu' },
    75: { name: 'Mandokir', type: 'PvP', region: 'eu' },
    76: { name: 'Amnennar', type: 'PvP', region: 'eu' },
    77: { name: 'Auberdine', type: 'PvE', region: 'eu' },
    78: { name: 'Finkle', type: 'PvP', region: 'eu' },
    79: { name: 'Sulfuron', type: 'PvP', region: 'eu' },
    80: { name: 'Chromie', type: 'PvE', region: 'eu' },
    81: { name: 'Flamegor', type: 'PvP', region: 'eu' },
    82: { name: 'Harbinger of Doom', type: 'PvP', region: 'eu' },
    83: { name: "Rhok'delar", type: 'PvP', region: 'eu' },
    84: { name: 'Wyrmthalak', type: 'PvP', region: 'eu' },
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
