import React, { FormEvent, useState } from "react";
import classes from "./ChatRoom.module.css";
import { useSocket } from "./store/SocketProvider";

function ChatRoom() {
    const { messages, roomName, username, /* users */ } = useSocket();
    const [message, setMessage] = useState("");

    // Each time a user connects to the server it updates a current users array
    // And when the disconnect they get removed from the array

    // The array is used to display the nicknames of the people typing, and everyone
    // But the "main user" is displayed on the left side, whilst they are on the right

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: prata med kontexten och skicka meddelandet.
    }


    return (
        <div className={classes['right-container']}>
            <div className={classes['right-container-header']} >
                <div className={classes['right-continer-header-circel']} ></div>
                <p>{roomName}</p>
            </div>

            {messages.map(({ body, from }, index) => {
                const bubbleClass = from === username ? 'right-continer-chat1' : 'right-continer-chat2';
                const isSameSenderAsPrevMessage = from === messages[index - 1]?.from;
                return (
                    <div>
                        {!isSameSenderAsPrevMessage && <p className={classes['writer1']}>{from}</p>}
                        <div className={classes[bubbleClass]}>
                            <p>{body}</p>
                        </div>
                    </div>
                );
            })}


            <p className={classes['whoIsWriting']}>{username} skriver..</p>
            <form className={classes['']} onSubmit={sendMessage}>
                <input className={classes['writingField']} type="text" placeholder="Skriv ett meddelande " value={message} />
                <button type="submit" className={classes['sendBtn']}>Send</button>
            </form>




        </div>
    );
}

export default ChatRoom;