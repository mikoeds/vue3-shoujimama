/* 搜索 */
export interface ISearchMallRedPacketPurchase {
  name: string;
  current: number;
  size: number;
}

/* 列表数据 */
interface IMallRedPacketPurchaseList {
  id: number;
  name: string;
  image: string;
  start_time: string | number;
  end_time: string | number;
  status: number;
}

/* 详细数据列表类型 */
export interface IMallRedPacketPurchasemoreList {
  goods_id: number;
  goods_image: string;
  official_price: number;
  red_packet_price: number;
  sales: number;
  sort: number;
  stock: number;
  subtitle: string;
  title: string;
}


/* 请求详细活动数据返回类型 */
export interface IMallRedPacketPurchaseInfoList extends IMallRedPacketPurchaseList {
  goods_list: Array<IMallRedPacketPurchasemoreList>;
}