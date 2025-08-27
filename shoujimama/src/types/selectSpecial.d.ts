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
    goods_list:Array<IMallRedPacketPurchasemoreList>
    status:number
}


