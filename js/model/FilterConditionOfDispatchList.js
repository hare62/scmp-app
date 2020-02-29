class FilterConditionOfDispatchList {
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

        let filterData = new FilterConditionOfDispatchList();
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

    isExist() {
        let isExist = true;
        isExist = isExist && !!this.showText;
        isExist = isExist && !!this.searchText;
        isExist = isExist && !!this.showIconName;

        return isExist;
    }


}
export default FilterConditionOfDispatchList;