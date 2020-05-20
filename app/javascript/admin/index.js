const myCustomContext = require.context('./admin_components', true)
const ReactRailsUJS = require('react_ujs')
// use `custom_components/` for <%= react_component(...) %> calls
ReactRailsUJS.useContext(myCustomContext)

import { config, library, dom } from '@fortawesome/fontawesome-svg-core'
// Change the config to fix the flicker
config.mutateApproach = 'sync'

// An example icon
import {
  faChartLine,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faChartLine,
  faUsers
)

dom.watch()
