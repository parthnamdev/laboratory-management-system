const Test = require("../models/testModel");
const Data = require("../models/dataModel");
const { v4: uuidv4 } = require('uuid');
const Report = require("../models/reportModel");

const index = (req, res) => {
    res.render('index');
}

const addPatientPage = (req, res) => {
    let alert = '';
    Test.find({}).then(found => {
        
        res.render('addPatient', {tests: found, alert: alert});

    }).catch(err => {

        // console.log(err);
        res.render('err', {error: err});
    })

    // Test.find({}, (err, found) => {
    //     if(!err) {
    //         console.log(found);
    //     } else {
    //         console.log(err);
    //     }
    // })

}
const addPatient = (req, res)=>{

    //const time = new Date().toLocaleString();

    const newData = new Data({
        patient: {
             name: req.body.name,
             age: req.body.age,
             gender: req.body.gender,
             date: req.body.date,
             number: req.body.number,
             email: req.body.email,
             address: req.body.address
        },
        uuid: uuidv4(),
        tests: req.body.tests
    });
    newData.save(function(err, data) {
        if(err) {
            console.log(err);
            
            res.render('err', {error: err});
        }
        else {
            let alert = 'Submitted successfully';
            Test.find({}).then(found => {
        
            res.render('addPatient', {tests: found, alert: alert});

            }).catch(err => {

            // console.log(err);
            res.render('err', {error: err});
            })
        }
    });
    
    

}
const createReport = (req, res) => {

    Data.find({}).then(found => {
        
        res.render('createReport', {patients: found});

    }).catch(err => {

        // console.log(err);
        res.render('err', {error: err});
    })
    
}

const editReport = (req, res) => {
    
    var names = []
    
    Data.findOne({uuid: req.params.uuid}).then(found => {
        
        found.tests.forEach( name => {    
            names.push(name)
        });
            
        Test.find({test: {$in: names}}).then(match=> {

            Report.findOne({uuid: req.params.uuid}).then(report => {
                if(report) {
                    res.render('editReport', {tests: match, name: found.patient.name, uuid: req.params.uuid, values: report.tests});
                } else {
                    res.render('editReport', {tests: match, name: found.patient.name, uuid: req.params.uuid, values: []});
                }
            })

            
        }).catch(err1 => {
            res.render('err', {error: err1});
        });
        
    }).catch(err => {
        res.render('err', {error: err});
        
    });
}
const saveReport = (req, res) => {
    
    Report.findOne({uuid: req.params.uuid}).then( found => {
        if(found) {

            found.tests.forEach(updateTest => {
                updateTest.values = req.body[`${updateTest.name}`];
            })

            found.save(function(err, data) {
                if(err) {
                    console.log(err);
                    res.render('err', {error: err});
                }
                else {
                    res.redirect('/createReport');
                }
            });
        } else {
            
           
            Data.findOne({uuid: req.params.uuid}).then(required => {
                let tests = [];
                
                Test.find({test: {$in : required.tests}}).then(match => {
                    match.forEach(test => {
                        tests.push({
                            name: test.test,
                            entries: test.entries,
                            values: req.body[`${test.test}`]
                        })
                    })

                    // console.log(tests);
                    const newInput = new Report({
                        tests: tests,
                        uuid: req.params.uuid
                    })

                    newInput.save(function(err, data) {
                        if(err) {
                            console.log(err);
                            res.render('err', {error: err});
                        }
                        else {
                            res.redirect('/createReport');
                        }
                    });

                }).catch(err => {
                    res.render('err', {error: err});
                });
                
            }).catch(err => {
                res.render('err', {error: err});
                
            });
        }
    }).catch(err => {
        res.render('err', {error: err});
    });
    
}

const manageTest = (req, res) => {
    res.redirect('/test');
}

const sendReport = (req, res) => {
    res.render('sendReport');
}

const payments = (req, res) => {
    res.render('payments');
}

module.exports = {
    index, addPatientPage, createReport, manageTest, sendReport, payments, addPatient, editReport, saveReport
}