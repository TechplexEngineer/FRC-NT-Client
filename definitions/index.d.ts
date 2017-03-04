/// <reference types="node" />
export declare type Listener = (key: string, value: any, valueType: String, type: "add" | "delete" | "update", id: number) => any;
export declare class Client {
    serverName: String;
    clientName: string;
    private client;
    private connected;
    private entries;
    private keymap;
    private reconnect;
    private address;
    private port;
    private listeners;
    private RPCExecCallback;
    private lateCallbacks;
    /**
     * True if the Client has completed its hello and is connected
     */
    isConnected(): () => any;
    /**
     * Start the Client
     * @param address Address of the Server. Default = "localhost"
     * @param port Port of the Server. Default = 1735
     */
    start(address?: string, port?: number): void;
    /**
     * Add a Listener to be called on change of an Entry
     * @param callback Listener
     */
    addListener(callback: Listener): void;
    /**
     * Get the unique ID of a key or the IDs of all keys if called empty
     * @param key name of the key
     */
    getKeyID(key?: string): number | {
        [key: string]: number;
    };
    /**
     * Gets an Entry
     * @param id ID of an Entry
     */
    getEntry(id: number): Entry;
    /**
     * Get an Array of Keys
     */
    getKeys(): string[];
    /**
     * Get All of the Entries
     */
    getEntries(): {
        [key: number]: Entry;
    };
    private read(buf, off);
    private readonly recProto;
    private readonly toServer;
    /**
     * Add an Entry
     * @param type ID of the type of the Value
     * @param val The Value
     * @param name The Key of the Entry
     * @param persist Whether the Value should persist on the server through a restart
     */
    Assign(type: number, val: any, name: string, persist?: boolean): void;
    /**
     * Updates an Entry
     * @param id The ID of the Entry
     * @param val The value of the Entry
     */
    Update(id: number, val: any): Error;
    /**
     * Updates the Flag of an Entry
     * @param id The ID of the Entry
     * @param persist Whether the Entry should persist through a restart on the server
     */
    Flag(id: number, persist?: boolean): Error;
    /**
     * Deletes an Entry
     * @param id The ID of the Entry
     */
    Delete(id: number): Error;
    /**
     * Deletes All Entries
     */
    DeleteAll(): void;
    /**
     * Executes an RPC
     * @param id The ID of the RPC Entry
     * @param val The Values of the Parameters
     * @param callback To be called with the Results
     */
    RPCExec(id: number, val: Object, callback: (result: Object) => any): Error;
    private keys;
    private readonly keepAlive;
    private aliveTimer;
    private bufferTimer;
    private buffersToSend;
    /**
     * Direct Write to the Server
     * @param buf The Buffer to be sent
     * @param immediate whether the write should happen right away
     */
    write(buf: Buffer, immediate?: boolean): void;
}
export interface Entry {
    typeID: number;
    name: string;
    sn: number;
    flags: number;
    val?: any;
}
declare global  {
    interface Number {
        /**
         * Converts a number to a Buffer using LEB128
         */
        to128(): Buffer;
    }
}
export {};
