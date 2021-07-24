const Test = require("../models/testModel");
const Data = require("../models/dataModel");
const { v4: uuidv4 } = require('uuid');

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
            
            res.render('err', {alert: alert});
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
    
    var ex = []
    var errr = "";
    const result = [];
    Data.findOne({uuid: req.params.uuid}).then(found => {
        
        
        found.tests.forEach( name => {
                
            ex.push(name)
                
                // await Test.findOne({test: name}, (err, test) => {
                //     if(!err) {
                //         const original = result;
                //         let newArray;

                //         newArray = original.concat(test);
                //         // newArray = [...original, '🦄'];
                //         result = newArray;
                //         result.push(test);
                        
                //     }
                // })
                
                // console.log(result);
            });
            // console.log(ex);
            // result.push('1');
            // result.push('2');
            
            // ex.forEach(naam => {
                Test.find({test: {$in: ex}}).then(test => {
                    // console.log(test);
                    // result = test;
                    res.render('editReport', {tests: test, name: found.patient.name});
                // result.push(test);
            
            }).catch(err1 => {
                errr = err1;
            });
            // });
            // console.log('2');
            // console.log(result);
            // if(errr.length > 0) {
            //     res.render('err', {error: errr});
            // } else {
            //     console.log(result);
            //     res.render('editReport', {tests: result, name: found.patient.name});
            // }
        
        
    }).catch(err => {
        res.render('err', {error: err});
        
    });
    // console.log(ex);
    
    // Data.findOne({uuid: req.params.uuid}, (err, found) => {
    //     const result = [];
    //     let errr = "";
        
    //     found.tests.forEach( name => {
                
    //         Test.findOne({test: name}, test => {
    //             result.push(test);
            
    //         });
           
    //     });

    //     if(errr.length > 0) {
    //         res.render('err', {error: errr});
    //     } else {
    //         console.log(result);
    //         res.render('editReport', {tests: result, name: found.patient.name});
    //     }

    // })
    
}

const editReport = async (req,res) => {
    try{
        const found = await Data.findOne({uuid: req.params.uuid});
        var result = [];
        found.tests.forEach( async name => {
            let temp = await Test.finOne({test: name});
            result.push(temp);
        }
    }finally{
        await res.render('editReport', {tests: result, name: found.patient.name});                  
    }
}


const manageTest = (req, res) => {
    res.render('manageTest');
}

const sendReport = (req, res) => {
    res.render('sendReport');
}

const payments = (req, res) => {
    res.render('payments');
}

module.exports = {
    index, addPatientPage, createReport, manageTest, sendReport, payments, addPatient, editReport
}

