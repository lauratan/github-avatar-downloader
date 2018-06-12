var request = require('request');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors", 
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + token.GITHUB_TOKEN
        }
    };

    request(options, function(err, res, body) {
        var contributors = JSON.parse(body);
        cb(err, contributors);
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
    // console.log("Errors:", err);
    // console.log("Result:", result);
    if (err){
        console.log("Error");
        return;
    }
    result.forEach(contributor => {
        console.log(contributor.avatar_url); 
    });
});
