import { config, library, dom } from '@fortawesome/fontawesome-svg-core';

// An example icon
import {
  faChartLine,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const myCustomContext = require.context('./admin_components', true);
const ReactRailsUJS = require('react_ujs');
// use `custom_components/` for <%= react_component(...) %> calls
ReactRailsUJS.useContext(myCustomContext); // eslint-disable-line 
// Change the config to fix the flicker
config.mutateApproach = 'sync';

library.add(
  faChartLine,
  faUsers
);

dom.watch();
