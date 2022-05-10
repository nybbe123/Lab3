import React, { FormEvent, useEffect, useState } from "react";
import classes from "./ChatRoom.module.css";
import { useSocket } from "./store/SocketProvider";
import { Send } from "@mui/icons-material";


function ChatRoom() {
    const { sendMessage, messages, roomName, username, /* users */ } = useSocket();
    const [message, setMessage] = useState("");
    const [istyping, setIsTyping] = useState(false)

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.length) {
            sendMessage(message);
            setMessage("");
            console.log(message)
        } else {
            return;
        }
    }

    return (
        <div className={classes['right-container']}>
            <div className={classes['right-container-header']} >
                <div className={classes['right-continer-header-circel']} ></div>
                <p>{roomName}</p>
            </div>
            <div>
                {messages.map(({ body, from }, index) => {
                    const bubbleClass = from === username ? 'right-continer-chatLeft' : 'right-continer-chatRight';
                    const isSameSenderAsPrevMessage = from === messages[index - 1]?.from;
                    return (
                        <div>
                            {!isSameSenderAsPrevMessage && <p id="messages" className={classes['writerLeft']}>{from}</p>}
                            <div className={classes[bubbleClass]}>
                                <p>{body}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={classes['divFormChat']}>
                <p className={classes['whoIsTyping']}>{username} is typing..</p>

                <form className={classes['formChatInput']} onSubmit={handleSendMessage}>
                    <input
                        id="writingField"
                        className={classes['writingField']}
                        type="text"
                        placeholder="Skriv ett meddelande"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={() => setIsTyping(true)}
                        autoComplete="off"
                    />
                    <button type="submit" className={classes['sendBtn']}>  <Send /></button>
                </form>

            </div>




        </div>
    );
}

export default ChatRoom;