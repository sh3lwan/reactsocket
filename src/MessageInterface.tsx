export interface Message {
    id?: number,
    username: string
    receiver?: string | undefined
    body: string
    is_new: boolean
}
