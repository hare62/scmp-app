import utils from '../util/Utils'
class api {

    static onfirstRequestWorkerData() {
        return utils.fetchData('https://facebook.github.io/react-native/movies.json')
    }

}

export default api;