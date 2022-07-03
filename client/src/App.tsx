import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

import Router from './routes';

declare var Ext: any;
Ext.require('Ext.plugin.Responsive');

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

// import React, { Component } from 'react';
// import { ExtGrid } from '@sencha/ext-react-modern';
// import { ExtColumn } from '@sencha/ext-react-modern';

// const Ext = window['Ext'];

// class App extends Component {
// 	constructor() {
// 		super();
// 		var data = [
// 			{ name: "Marc", email: "marc@gmail.com", priceChangePct: 0.25 },
// 			{ name: "Nick", email: "nick@gmail.com", priceChangePct: 0.35 },
// 			{ name: "Andy", email: "andy@gmail.com", priceChangePct: 0.45 },
// 		];
// 		this.store = Ext.create("Ext.data.Store", { data: data });
// 		//this.store = {xtype: 'store',data: data}
// 	}

// 	componentDidMount = () => {
// 		//console.log('componentDidMount')
// 		//console.log(this.grid.cmp)
// 	};

// 	extReactDidMount = (detail) => {
// 		//console.log('extReactDidMount')
// 		//this.grid.cmp.setStore(this.store);
// 	};

// 	renderSign = (format, value) => (
// 		<span style={{ color: value > 0 ? "green" : value < 0 ? "red" : "" }}>
// 			{Ext.util.Format.number(value, format)}
// 		</span>
// 	);

// 	render() {
// 		return (
// 			<ExtGrid
// 				viewport={true}
// 				ref={(grid) => (this.grid = grid)}
// 				title="The Grid"
// 				store={this.store}
// 				onReady={this.extReactDidMount}
// 			>
// 				<ExtColumn text="name" dataIndex="name" />
// 				<ExtColumn text="email" dataIndex="email" width="150" />
// 				<ExtColumn
// 					text="% Change"
// 					dataIndex="priceChangePct"
// 					align="right"
// 					renderer={this.renderSign.bind(this, "0.00")}
// 				/>
// 			</ExtGrid>
// 		);
// 	}
// }
export default App;
