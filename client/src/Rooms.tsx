import classes from "./Rooms.module.css";
import logoMini from './assets/images/logoMini.png'
import { useContext, useEffect, useState } from "react";
import SocketContext from "./store/SocketContext";

function Rooms() {
    const SocketCtx = useContext(SocketContext);

   function onSubmit() {
       
   }


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
                    <button className={classes['SendButton']} type="submit" >Skicka</button>

                </div>
            </div>
        </div>
    );
}


export default Rooms;


// unction renderForm (){
    //     Document.body.innerHTML = "" //Tömma fältet 
    
    //     let chatList = document.createElement("ul")
    //     chatList.id = "messeges"
    
    //     let chatInput = document.createElement("input")
    //     chatInput.autocomplete = "of"
    
    //     let chatForm = document.createElement("form")
    //     chatForm.addEventListener("submit", () => {
    //         event?.preventDefault()
    //         if(chatInput.length) {
    //             Socket.emit("message", chatInput.value, joinedRoom)
    //         } else {
    //             console.log("Du får inte skicka tomma meddelanden!");
    //         }
    //  })
    
    
    
    //     let sendButton = document.createElement("button")
    //     sendButton.innerText = "skicka"
    // }
    