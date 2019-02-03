var wordCloud = (function() {

    var num, width, height, api_call;

    var generate = function() {
        d3.json(api_call + num, function(error, frequency_list) {
        



        });
    }

    return {

        init: function(config) {
            num = config.num,
                width = config.width,
                height = config.height,
                api_call = config.api_call
            generate();
        }
    }
})();