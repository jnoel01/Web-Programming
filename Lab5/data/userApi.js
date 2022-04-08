const axios = require('axios');

module.exports = {

    async getPeople() {
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
        return data // this will be the array of people objects
    },

    async getWork() {
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
        return data // this will be the array of people objects
    },

    // ***     GET PERSON BY ID     *** //
    async getPersonById(id) {
        const data = await this.getPeople();
        // Checks that the input id exists
        if (id == undefined)
            throw "Input does not exist!";

        // Checks that the id parameter is of proper type: string
        if (!(typeof id == 'string'))
            throw "Input id must be a string!";
        
        // Checks if the id is empty spaces
        if (id.trim().length === 0)
            throw "Input id can not just be empty spaces!";
        
        // Checks if the id is found in the array of people
        // if its found return the value
        for (key of data) {
            if (key.id == id) {
                return key;
            }
        }
        throw "person not found!";
    },

    // ***     GET WORK BY ID     *** //
    async getWorkById(id) {
        const data = await this.getWork();
        // Checks that the input id exists
        if (id == undefined)
            throw "Input does not exist!";

        // Checks that the id parameter is of proper type: string
        if (!(typeof id == 'string'))
            throw "Input id must be a string!";
        
        // Checks if the id is empty spaces
        if (id.trim().length === 0)
            throw "Input id can not just be empty spaces!";
        
        // Checks if the id is found in the array of people
        // if its found return the value
        for (key of data) {
            if (key.id == id) {
                return key;
            }
        }
        throw "work not found!";
    }
}






