import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
require('dotenv').config()

let stream = require('getstream');

  const STREAM_KEY = process.env.REACT_APP_STREAM_KEY;
  const STREAM_ID = process.env.REACT_APP_STREAM_ID;
  // const STREAM_SECRET = process.env.REACT_APP_STREAM_SECRET;

let client = stream.connect(STREAM_KEY, null, STREAM_ID);
let userToken = client.createUserToken("user-one");

class App extends React.Component {
  render() {
    return( 
      <StreamApp
      apiKey={STREAM_KEY}
      appId={STREAM_ID}
      token={userToken}
      >
        <NotificationDropdown notify/>
        <FlatFeed
          notify
        />
      </StreamApp>
    );
  }
}

export default App;