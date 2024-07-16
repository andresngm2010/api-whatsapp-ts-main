export default interface MassiveExternal {
    sendMsg({names, phones, link}:{names:string[], phones:string[], link:string}):Promise<any>
}