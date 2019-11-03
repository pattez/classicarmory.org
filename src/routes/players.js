import playersIndex from '@/views/players/index.svelte'
import playersShow from '@/views/players/show.svelte'

const routes = {
    '/players': playersIndex,
    '/players/:id': playersShow,
}

export default routes
