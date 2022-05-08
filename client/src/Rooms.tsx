import classes from "./Rooms.module.css";
import logoMini from './assets/images/logoMini.png'
import { SocketContextType } from "./store/SocketContext";
import { useSocket } from "./store/SocketProvider";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Rooms() {
    const socketCtx = useSocket() as SocketContextType;
    let availableRooms = socketCtx.rooms.filter((room) => {
        return room !== socketCtx.roomName;
    })

    return (
        <div className={classes['main-container']}>
            <div className={classes['left-container']}>
                <div className={classes['logo-container']}>
                    <img src={logoMini} alt="logotype" className={classes.logotype} />
                    <div className={classes['logo-text-container']}>
                        <h3>{socketCtx.username}</h3>
                        <p>is in da ChatHouse...</p>
                    </div>
                </div>
                <div className={classes['room-container']}>
                    <div className={classes['own-room']}>
                        <h4>Your Room:</h4>
                        <button className={classes['room-btn']}>
                            {socketCtx.roomName}
                            <ArrowForwardIosIcon />
                        </button>
                    </div>
                    <div className={classes['other-rooms']}>
                        <h4>Available rooms:</h4>
                        {availableRooms.map((availableRoom, index) => (
                            <button className={classes['room-btn']} key={index}>
                            {availableRoom}
                            <ArrowForwardIosIcon />
                            </button>  
                        ))}
                    </div>
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