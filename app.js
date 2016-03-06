var express = require('express'),
	multer = require('multer'),
    xmlparser = require('express-xml-bodyparser'),
    mongoose = require('mongoose'),
    bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('secured db connection');
});

var Results = mongoose.model('Result', {
                      title : String,
                      result : String
                  });

var app = express();
app.use(express.static(__dirname + '/views'));
app.use(bodyparser.urlencoded({'extended':'true'}));
app.use(bodyparser.json());
app.use(bodyparser.json({ type: 'application/vnd.api+json' }));
app.use(bodyparser.json());

app.post('/addresult', function(req,res, next){
    results = req.body;
    console.log(results);

    Results.create({
                title : results.title,
                result : results.result
            }, function(err, todo) {
                if (err)
                    res.send(err);

                // get and return all the results after you create another
                Results.find(function(err, results) {
                    if (err)
                        res.send(err)
                    res.json(results);
                });
            });


});

app.get('/gettitles', function(req,res){
    Results.find().distinct('title', function(error, titles) {
    console.log(titles);
        res.send(titles);
    });
});

app.get('/getresults', function(req,res,next){
    Results.find(function(err, results) {
                        if (err)
                            res.send(err)
                        res.json(results);
                    });
});

app.post('/filterresults/:filter',function(req,res){

    Results.find({ "title": req.params.filter },(function(err, results){
        if(err)
            res.send(err)
        res.json(results)
    }));
});

app.get('*', function(req,res){
	console.log('i got hit');
    res.sendfile('views/index.html');
});

app.listen(2500, function() {console.log("app live");
});

