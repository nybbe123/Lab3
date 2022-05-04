export interface ServerToClientEvents {
  message: (message: string) => void;
  connected: (userName: string) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
}

export interface InterServerEvents {
}

export interface ServerSocketData {
  username: string;
}
  
