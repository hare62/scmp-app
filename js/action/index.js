import {onThemeChange} from './theme';
import {onLoadPopularData, onLoadMorePopular }from './popular';
import {onRefreshTrending, onLoadMoreTrending }from './trending';
import {onLoadfavoriteData} from './favorite';
import {onfirstRequestWorkerData} from './workshopDirector/index'

export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
    onLoadfavoriteData,
    onfirstRequestWorkerData
};