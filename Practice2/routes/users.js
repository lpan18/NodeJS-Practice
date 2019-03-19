var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  console.log(db);
  var collection = db.get('userlist');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

module.exports = router;
