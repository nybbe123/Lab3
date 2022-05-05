
import logo from "./assets/images/chathouse.png"
import classes from "./ChatRoom.module.css"




function chatRoom() {

    return (
        <div className={classes['main-container']}>
            <div className={classes['left-container']}>
                <img src={logo} alt="logotype" className={classes.logotype} />
                <div className={classes['login-container']}>
                    <h3> Your rooms </h3>
                    <div className={classes['username-container']}>
                        <label htmlFor="username">Nickname</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder='Enter Username'
                            autoComplete="off"
                            onChange={(event) => {
                                // setUsername(event.target.value)
                            }}
                        />
                    </div>
                    <div className={classes['room-container']}>
                        <label htmlFor="roomname">Room Name</label>
                        <input
                            type="text"
                            name="roomname"
                            id="roomname"
                            placeholder='Enter Chatroom Name'
                            onChange={(event) => {
                                // setRoomName(event.target.value)
                            }}
                        />
                    </div>
                    {/* <button onClick={onHandleClick}>CONTINUE</button> */}
                </div>
            </div>
            <div className={classes['right-container']}>
                <div className={classes['right-container-header']} >
                    <div className={classes['right-continer-header-circel']} ></div>
                    <p>Mancave2.0</p>


                </div>
                <div className={classes['right-continer-chat1']}>
                    <p>tjenna kelle hur e läget ? </p>
                </div>
                <p className={classes['writer1']} >Pelle</p>
                <div className={classes['right-continer-chat2']}>
                    <p>fint tack fan, själv då ? </p>
                </div>
                <p className={classes['writer2']} >Kelle</p>
                <div className={classes['right-continer-chat1']}>
                    <p>jo det knattar och rullar </p>
                </div>
                <p className={classes['writer1']}>Pelle</p>
                <div className={classes['right-continer-chat2']}>
                    <p> amen fint rulla inte för långt bara då rullar du förbi </p>
                </div>
                <p className={classes['writer2']}>Kelle</p>
                <div className={classes['right-continer-chat1']}>
                    <p>Tack för tipset </p>
                </div>
                <p className={classes['writer1']}>Pelle</p>
                <div className={classes['right-continer-chat2']}>
                    <p> De vet du </p>
                </div>
                <p className={classes['writer2']}>Kelle</p>
                <p className={classes['howIsWriting']}>Pelle skriver....</p>
                <input className={classes['writingField']} type="text" placeholder="Skriv ett meddelande " />

            </div>
        </div>
    );
}

export default chatRoom;