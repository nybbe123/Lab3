import classes from "./Rooms.module.css";
import logoMini from './assets/images/logoMini.png'
import { useContext, useEffect, useState } from "react";
import SocketContext from "./store/SocketContext";

function Rooms() {
    const SocketCtx = useContext(SocketContext);

    return (
        <div className={classes['main-container']}>
            <div className={classes['left-container']}>
                <div className={classes['logo-container']}>
                    <img src={logoMini} alt="logotype" className={classes.logotype} />
                    <div className={classes['logo-text-container']}>
                        <h3>{SocketCtx?.username}</h3>
                        <p>is in da ChatHouse...</p>
                    </div>
                </div>
                <div>
                    <h3>{SocketCtx?.roomName}</h3>
                </div>
            </div>
            <div className={classes['right-container']}>
                <h3>Select Da ChatRoom Of Your Choise</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem molestias nulla doloremque, quo rerum assumenda veritatis quam quasi. Vel maiores ex dolorum dolor unde corporis quos temporibus aspernatur.</p>
            </div>
    </div>
    );
}

export default Rooms;