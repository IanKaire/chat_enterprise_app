import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

import { ResultsDropdown } from './'
import { SearchIcon } from '../assets';

const ChannelSearch = ({setToggleContainer}) => {
    //We can get the channel name from the chat-context
    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([]) //a direct channel in stream is simply a user
    //if there is no query set the TeamChannels to an empty array and DirectChannels to an empty array
    useEffect(() => {
        if(!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query])

    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({
                type: 'team', 
                name: { $autocomplete: text }, 
                members: { $in: [client.userID]}
            });
            const userResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text }
            })

            const [channels, { users }] = await Promise.all([channelResponse, userResponse]); 
            //Setting up individual awaits means that means will have to wait for each to be complete before moving to the next
            //But await Promise.all ensures both requests start at the same time, simultaneously, making it quicker

            if(channels.length) setTeamChannels(channels);
            if(users.length) setDirectChannels(users);
        } catch (error) {
            setQuery('')
        }
    }

    const onSearch = (event) => {
        event.preventDefault(); //When we click submit to avoid reloading the page, this will make everything reactive/instantaneous

        setLoading(true);
        setQuery(event.target.value); //what I am searching for
        getChannels(event.target.value)// get the chat channels
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }

   
    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-serach__input__icon">
                    <SearchIcon />
                </div>
                {/*In components that had a lot of props I spaced them out each on its own row*/}
                <input 
                    className="channel-search__input__text" 
                    placeholder="Search" 
                    type="text" 
                    value={query}  
                    onChange={onSearch}
                />
            </div>
            {/*Display the results if it is present in the search query*/}
            { query && (
                <ResultsDropdown  
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )}
        </div>
    )
}

export default ChannelSearch
