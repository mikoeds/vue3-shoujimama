import type { IMallRedPacketPurchasemoreList } from "./redEnvelopeRush"

// 活动信息返回参数类型
export interface activityInfoType {
    create_time: string
    id: number
    image: string
    index_image: string
    name: string
}

// 活动详情信息返回参数类型
export interface activityMoreInfoType extends activityInfoType {
    goods_list: Array<activityMoreInfoGoodType>
    status: number
}

export interface activityMoreInfoGoodType {
    goods_id: number
    goods_image: string
    goods_name: string
    official_price: number | string
    red_packet_price: number | string
    retail_price: number | string
    sales_actual: number
    sales_initial: number
    sort: number
    stock_total: number
}
