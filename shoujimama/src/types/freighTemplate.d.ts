// 获取运费信息请求参数类型
export interface deliverInfoParamType {
    deliver_name: string
}

// 运费信息返回参数类型
export interface deliverInfoDataType {
    deliver_name: string
    id: number
    update_time: string
}

// 运费详情信息返回参数类型
export interface deliverMoreInfoDataType extends deliverInfoDataType {
    regionArray:Array<deliverMoreInfoListType>
    create_time:string
}

// 运费详情信息返回数组类型
export interface deliverMoreInfoListType {
    first_price: number
first_unit: number
id: number
regions: Array<number>
renew_price: number
renew_unit: number
}

// 配送区域信息类型
export interface regionInfo {
    id:number
    name:string
}