const axios = require('axios').default;

module.exports = {

    async getShows(){
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    return data
    },

    async getShowsByKeyword(keyword){
    const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + keyword.toString());
    return data
    },

    async getShowById(id){
    const { data } = await axios.get('http://api.tvmaze.com/shows/' + id.toString());
    return data
    }
};