declare namespace ScoreTypes {

    export interface ScoreMonth {
        avarage: number | string
        pontuation: number | string
        numberOfServices: number | string 
    }

    export interface Score {
        previousMonth: ScoreMonth
        actualMonth: ScoreMonth
    }
}

export default ScoreTypes