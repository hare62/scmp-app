// /**
//  * Trending搜索时间跨度mo
//  * @param showText
//  * @param searchText
//  * @constructor
//  */
// export default function TimeSpan(showText, searchText ,showIconName) {
//     this.showText = showText;
//     this.searchText = searchText;
//     this.showIconName = showIconName
// }

class TimeSpan {
    /**
     * {展示的时间}showText
     * {请求的接口的参数}searchText
     * {展示的图标}showIconName
     */
    constructor() {

        this.showText = '';
        this.searchText = '';
        this.showIconName = '';
    }

    static init(data) {
        if (!data) throw new Error('FilterConditionOfDispatchList - init:data is null');

        let filterData = new TimeSpan();
        try {
            let { showText, searchText, showIconName } = data;
            filterData.showText = showText;
            filterData.searchText = searchText;
            filterData.showIconName = showIconName;
        } catch (error) {
            throw new Error('FilterConditionOfDispatchList - init:' + error);
        }

        return filterData;
    }
}

export default TimeSpan;