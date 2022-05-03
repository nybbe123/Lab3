export interface ServerToClientEvents {
    message: (message: string) => void;
    welcome: (message: string) => void;
}

export interface ClientToServerEvents {
    message: (message: string) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface ServerSocketData {
    name: string;
}