export default interface MassiveExternal {
    sendMsg(cel:string, nombre:string, apellido:string, errores:string[]):Promise<any>
}