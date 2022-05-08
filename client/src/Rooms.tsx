import classes from "./Rooms.module.css";
import logoMini from './assets/images/logoMini.png'
import { SocketContextType } from "./store/SocketContext";
import { useSocket } from "./store/SocketProvider";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Rooms() {
    const socketCtx = useSocket() as SocketContextType;

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
                    <h4>Available rooms</h4>
                    {socketCtx.rooms.map((room, index) => (
                      <button className={classes['room-btn']} key={index}>
                          {room}
                          <ArrowForwardIosIcon />
                      </button>  
                    ))}
                    {/* <h3>{socketCtx.roomName}</h3> */}
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