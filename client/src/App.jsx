import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie"; // saves user information in the browser

import { ChannelListContainer, ChannelContainer, Auth } from "./components";
/* To avoid many imports I created an index.js file on the components folder, we are avoiding too much redudancy of this:
    import ChannelContainer from './components/ChannelContainer */
import "stream-chat-react/dist/css/index.css"; //we are taking streams css file for prebuilt components, this will helps to quickly get a better looking chat application
import "./App.css"; //imports the styles and applies them to the relevant className in the App jsx

const cookies = new Cookies();
//the api key found in the dashboard.getstream.io
const apiKey = "txksk25hes66";
const authToken = cookies.get("token");
//create an instance of StreasmChat via the api key
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

//The props passed will display the various windows depending on the state
const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  {
    /*In case we are not logged in show the authentication page*/
  }
  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        {/*rendering the chat component*/}
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
