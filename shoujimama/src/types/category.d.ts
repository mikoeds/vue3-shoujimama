export interface categoryInfoType {
    id: number,
    image: string,
    is_vajra: number,
    name: string,
    sort: number,
    status: number
}

export interface categoryParamType {
    name: string;
}

// 商品信息请求参数类型
export interface mallGoodsSearchParamType {
    goods_name: string;
    goods_no: string;
    categoryId: string;
    status: string;
    current: number;
    size: number;
}

// 商品信息请求返回数据类型
export interface mallGoodsResponsType {
  category: string[];
  cost_price: string;
  goods_image: string;
  goods_name: string;
  goods_no: string;
  id: number;
  official_price: string;
  red_packet_price: string;
  retail_price: string;
  sales_initial: number;
  sort: number;
  status: string;
  statusName: string;
  stock_total: number;
  wholesale_price: string;
}

