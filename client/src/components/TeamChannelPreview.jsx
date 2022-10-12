import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

//*Avatar is used for images

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();
    
    {/*? we have the channel before we access sth else or if the channel doesn't have a name, use the id*/}
    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );

    {/*This is for direct messages
       Members is not an array but a collection of objects
       We are mapping over all the users and we re keeping all the ones whose id is not equal to client id so that we can get the actual users we are talking to
    */}
    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        return (
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) { //for mobile devices
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    );
}

export default TeamChannelPreview
