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
                <div className={classes['right-container-header']} >
                    <div className={classes['right-continer-header-circel']} ></div>
                    <p>Mancave2.0</p>
                    <h3 className={classes['chatName']} >{SocketCtx?.username}</h3>

                </div>
                <div className={classes['right-container-chat']} >
                    <div className={classes['right-continer-chat1']}>
                        <p>tjenna pelle hur e läget ? </p>
                    </div>
                    <p className={classes['writer1']} >{SocketCtx?.username}</p>
                    <div className={classes['right-continer-chat2']}>
                        <p>fint tack fan, själv då ? </p>
                    </div>


                    <p className={classes['writer2']}>Kelle</p>
                    <p className={classes['howIsWriting']}>{SocketCtx?.username} skriver....</p>
                    <input className={classes['writingField']} type="text" placeholder="Skriv ett meddelande " />

                </div>
            </div>
        </div>
    );
}

export default Rooms;