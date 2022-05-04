export interface IResponse {
  statusCode: number,
  data?: {[key: string] : any},
  status: string,
  timestamp: string,
  message: string[]
}
