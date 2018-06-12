var request = require('request');
var token = require('./secrets');
var https = require('https'); 
var fs = require('fs');

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
        var url = contributor.avatar_url;
        var filePath = './avatars/' + contributor.login + '.jpg';
        downloadImageByURL(url, filePath);
    });
});

function downloadImageByURL(url, filePath) {
   request.get(url)
   .on('error', function (err) {                                   
    console.log("error");
   })
   .on('response', function (response) { 
      console.log('Downloading image...');
      console.log('Response Status Code: ', response.statusCode, 
      'Response Status Message: ', response.statusMessage, 
      'Content Type: ', response.headers['content-type']);
      console.log('Download Complete.');
   })  
  .pipe(fs.createWriteStream(filePath));  
  }

