export default {

    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        lowercaseFirstLetter(string) {
            return string.charAt(0) + string.slice(1);
        },

        splitAndConnect(string, connector) {
            let result = "";
            for (let word of string.match(/^[a-z]*/g)) {
                result += word.charAt(0) + word.slice(1) + connector;
            }

            let match = string.match(/[A-Z][a-z]+/g);

            if (match) {

                for (let word of match) {
                    result += word.charAt(0) + word.slice(1) + connector;
                }
            }

            result = result.slice(0, -1);
            return result;
        },
        splitAndConnectByUnderscore(tableName) {
            let tableNameReadable = "";
            let words = tableName.split('_');
            words.forEach(function (word, index) {
                if (index !== words.length - 1) {
                    tableNameReadable += word + " ";
                } else {
                    tableNameReadable += word;
                }
            });
            return tableNameReadable;
        },
    }

}