import React from 'react';

import { AddChannel } from '../assets';
/*This is just a list*/
const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type,  isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    {/*In case there is an error, if it is a team or a direct message*/}
    if(error) {
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    {/*If it is a team indicate'Channels' but if a direct message indicate 'Messages'*/}
    if(loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }
    {/*the list is rendered on {children}*/}
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AddChannel 
                  isCreating={isCreating}
                  setIsCreating={setIsCreating}
                  setCreateType={setCreateType} 
                  setIsEditing={setIsEditing}
                  type={type === 'team' ? 'team' : 'messaging'}
                  setToggleContainer={setToggleContainer}
                  />
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList
