import { createBrowserHistory, History } from 'history'
import env from '@utils/env'

const history = createBrowserHistory({ basename: env.appBaseName })

export default history as NonNullable<History>
