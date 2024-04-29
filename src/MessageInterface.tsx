export interface Message {
    id?: number,
    username: string
    receiver?: string
    body: string
    is_new: boolean
}
