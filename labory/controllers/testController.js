const Test = require("../models/testModel");


const index = (req, res) => {
    Test.find({}).then(found => {
        res.render('manageTest', {tests: found});
    }).catch(err => {
        res.render('err', {error: err});
    })
}

const add = (req, res) => {
    res.render('addTest', {no_of_entries: req.body.no_of_entries});
}

const addTest = (req, res) => {
    
    const entry_names = req.body.name;
    const entry_range = req.body.range;
    let entries = [];

    for (let index = 0; index < entry_names.length; index++) {
        entries.push({
            name: entry_names[index],
            range: entry_range[index]
        })
    }
    
    const newTest = new Test({
        test: (req.body.test).toUpperCase(),
        entries: entries,
        price: req.body.price
    })

    newTest.save(function(err, data) {
        if(err) {
            console.log(err);
            res.render('err', {error: err});
        }
        else {
            res.redirect('/test');
        }
    });

}

const update = (req, res) => {

    Test.findById(req.body.test).then(found => {
        res.render('updateTest', {test_details: found});
    }).catch(err => {
         res.render('err',{error: err});
    })
}

const updateTest = (req, res) => {
    const entry_names = req.body.name;
    const entry_range = req.body.range;

    if(!entry_names){
        Test.findByIdAndDelete(req.body.tid).then(docs => {
            res.redirect('/test');
        }).catch(err => {
            res.render('err',{error: err});
       })
    } else {
        let entries = [];
        
        for (let index = 0; index < entry_names.length; index++) {
            entries.push({
                name: entry_names[index],
                range: entry_range[index]
            })
        }
        
        const updated = {
            test: (req.body.test).toUpperCase(),
            entries: entries,
            price: req.body.price
        }
    
        Test.findByIdAndUpdate(req.body.tid, updated).then(docs => {
            res.redirect('/test');
        }).catch(err => {
             res.render('err',{error: err});
        })
    
    }
}

const remove = (req, res) => {
     Test.findByIdAndDelete(req.body.test).then(docs => {
        res.redirect('/test');
        
     }).catch(err => {
          res.render('err',{error: err});
     })
}


module.exports = {
    index, add, remove, update, addTest, updateTest
}