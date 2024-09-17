export interface ICategory {
  id: number
  name: string
}

export type IAccount = string

export type IReportData = Record<string, number>

export interface IReportTop5 {
  bestPracticeName: string
  total: number
}
export type ITop5Data = Array<IReportTop5>