export default interface LeadExternal {
    sendMsg({name, phone}:{name:string, phone:string}):Promise<any>
}