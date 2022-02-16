import ScoreTypes from "./ScoreTypes"

declare namespace userType {
    export interface user {
        id: string
        name: string
        segment?: string
        employeeName?: string
        _id?:string
        score?: ScoreTypes.Score
    }
}

export default userType