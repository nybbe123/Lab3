import classes from "./Rooms.module.css";
import logoMini from './assets/images/logoMini.png'
import { useSocket } from "./store/SocketProvider";
import ChatRoom from "./ChatRoom";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Rooms() {
    const { rooms, joinRoom, roomName, username } = useSocket();
    let availableRooms = rooms.filter((room) => {
        return room !== roomName;
    })

    const joinRoomHandler = (roomName: string) => {
        joinRoom(roomName)
    }

    return (
        <div className={classes['main-container']}>
            <div className={classes['left-container']}>
                <div className={classes['logo-container']}>
                    <img src={logoMini} alt="logotype" className={classes.logotype} />
                    <div className={classes['logo-text-container']}>
                        <h3>{username}</h3>
                        <p>is in da ChatHouse...</p>
                    </div>
                </div>
                <div className={classes['room-container']}>
                    <div className={classes['own-room']}>
                        <h4>Your Room:</h4>
                        <button className={classes['room-btn']}>
                            {roomName}
                            <ArrowForwardIosIcon />
                        </button>
                    </div>
                    <div className={classes['other-rooms']}>
                        <h4>Available rooms:</h4>
                        {availableRooms.map((availableRoom, index) => (
                            <button onClick={() => joinRoomHandler(availableRoom)} className={classes['room-btn']} key={index}>
                                {availableRoom}
                                <ArrowForwardIosIcon />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <ChatRoom />


        </div>
    );
}

export default Rooms;