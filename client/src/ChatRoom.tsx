import React, { FormEvent, useEffect, useRef, useState } from "react";
import classes from "./ChatRoom.module.css";
import { useSocket } from "./store/SocketProvider";
import { Send } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
    onToggleLeftContainer: () => void;
}

function ChatRoom({ onToggleLeftContainer }: Props) {
    const { sendMessage, socket, isTyping, messages, roomName, username, /* users */ } = useSocket();
    const [message, setMessage] = useState("");
    const scrollContainer = useRef<HTMLDivElement>(null);


    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.length) {
            sendMessage(message);
            setMessage("");
            console.log(message);
        } else {
            return;
        }
    }

    useEffect(() => {
        if (!scrollContainer.current) return;
        scrollContainer.current.scrollTo({ top: scrollContainer.current.scrollHeight });
    }, [messages])


    return (
        <div ref={scrollContainer} className={classes['right-container']}>
            <div className={classes['right-container-header']} >
                <div className={classes['header-menu']} onClick={onToggleLeftContainer} > <MenuIcon /> </div>
                <div className={classes['right-continer-header-circel']} ></div>
                <p>{roomName}</p>
            </div>
            <div className={classes['chat-container']}>
                {messages.map(({ body, from }, index) => {
                    const bubbleClass = from === username ? 'right-continer-chatLeft' : 'right-continer-chatRight';
                    const chatSideClass = from === username ? 'right-chatbox-container' : 'left-chatbox-container';
                    const isSameSenderAsPrevMessage = from === messages[index + 1]?.from;
                    return (
                        <div className={classes[chatSideClass]}>
                            <div className={classes[bubbleClass]}>
                                <p>{body}</p>
                            </div>
                            {!isSameSenderAsPrevMessage && <p id="messages" className={classes['writerLeft']}>{from}</p>}
                        </div>
                    );
                })}
            </div>
            <div className={classes['divFormChat']}>
                <p className={classes['whoIsTyping']}>{isTyping}</p>

                <form className={classes['formChatInput']} onSubmit={handleSendMessage}>
                    <input
                        id="writingField"
                        className={classes['writingField']}
                        type="text"
                        placeholder="Write a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={() => socket.emit('typing', roomName)}
                        autoComplete="off"
                    />
                    <button type="submit" className={classes['sendBtn']}>  <Send /></button>
                </form>

            </div>




        </div>

    );
}

export default ChatRoom;