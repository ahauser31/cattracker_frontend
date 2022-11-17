export {};

declare global {

   interface Session {
        index: number
        startTime: Date
        endTime: Date
        ongoing: boolean
    }

    type SessionArray = Array<Session>
}