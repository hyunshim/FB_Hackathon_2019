import React from 'react';
import { StreamApp } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';


class App extends React.Component {
  render() {
    return(
      <StreamApp
        apiKey="du8he7epvp94"
        appId="45206"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzg0YWYzNGQtNmFjMy00ZDU4LWI4NzUtODU3ZTUxNGFhYTA5In0.43SPVAp3sY4ZM6pKvQdGfhu0FSYfId8mqtIeN3lxxLo">
      </StreamApp>
    );
  }
}

export default App;