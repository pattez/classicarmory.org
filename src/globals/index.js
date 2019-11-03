const BACKEND_URL = 'http://localhost:8090'
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

export { BACKEND_URL, genders, zerolize, formatDate, INVENTORY_ITEMS }
