export interface Message {
  body: string;
  from: string;
}

// All events going from the server to the client and their predefined types
export interface ServerToClientEvents {
  message: (message: Message) => void;
  connected: (username: string) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
  _error: (errorMessage: string) => void;
  userlist: (userlist: string[]) => void;
}

// All events going from the client to the server and their predefined types
export interface ClientToServerEvents {
  message: (message: string, to: string) => void;
  join: (room: string) => void;
}

// All internal server events and their predifned types
export interface InterServerEvents {

}

// All information that we can save on a socket representation, with a client representation, but not on the client side.
// All data saved here are saved on the server so we can't access it on the client side, but this will represenet the client on the server side.
// The socket is the connection coming in to the server.
// This is where we save the information that will be important over a duration of time.
// Information on what a data property looks like on a server.
export interface ServerSocketData {
  username: string;
  chatlog: (chatlog: string[]) => void;
}

