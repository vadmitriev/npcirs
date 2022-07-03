import * as React from 'react';
import ExtReactDOM from '@sencha/ext-react-modern';
import * as serviceWorker from './serviceWorker';
import App from './App';

import 'semantic-ui-css/semantic.min.css';

ExtReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
