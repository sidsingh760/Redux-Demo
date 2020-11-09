/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import rootVC from './Files/rootVC'
import Screen from './Demo/AuthContainer'
AppRegistry.registerComponent(appName, () => Screen);
