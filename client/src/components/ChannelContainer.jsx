import React from 'react';
import { Channel, MessageTeam, useChatContext } from 'stream-chat-react';
//MessageTeam is a component that allows to view the team messages
import { ChannelInner, CreateChannel, EditChannel } from './';

//Based on this variables we can show isCreating window or isEditing window
const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    const { channel } = useChatContext();

    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div> 
        )
    }
//We have created a chat with no messages yet
    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    )

    return (
        <div className=" channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
}

export default ChannelContainer;
