import home from './home'
import players from './players'
import honor from './honor'
import upload from './upload'
import donate from './donate'
import stats from './stats'
const routes = {
    ...home,
    ...players,
    ...honor,
    ...upload,
    ...donate,
    ...stats,
}

export default routes
