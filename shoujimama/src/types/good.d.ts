// 商品表单提交参数类型
export interface mallGoodsParamType {
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
    // 基础信息
    selling_poiont: string; // 卖点（注意字段拼写与服务端一致）
    goods_images: string; // 多图路径（可考虑改为 string[] 根据实际需求）
    goods_content: string; // 富文本详情
    goods_video: string; // 视频地址（原可选属性改为必填）
    deliver_id: number | string; // 运费模板ID
    // 分类信息
    category_ids: number[]; // 分类ID数组
    // 平台相关
    platform_type: string[]; // 销售平台
    // 规格信息
    spec_list: ISpecItem[]; // 商品规格
    sku_list: ISku[]; // SKU列表
    // 新增字段
    update_specs?: IUpdateSpecs[]; // 根据业务需要定义具体类型
    is_goods_no: string; // 商品编号标识
}

export interface changeGoodStatusParamType {
    idArray:Array<number>;
    status:string;
}