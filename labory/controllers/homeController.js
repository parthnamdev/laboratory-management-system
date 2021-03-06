const Test = require("../models/testModel");
const Data = require("../models/dataModel");
const Report = require("../models/reportModel");
const Profile = require("../models/profileModel");

const { v4: uuidv4 } = require('uuid');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs')


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
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const addPatient = (req, res)=>{

    //const time = new Date().toLocaleString();
    

    const newData = new Data({
        patient: {
             name: capitalizeFirstLetter(req.body.name),
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
                            values: req.body[`${test.test}`],
                            price: test.price
                        })
                    })
                    
                    // console.log(tests);
                    const newInput = new Report({
                        tests: tests,
                        uuid: req.params.uuid,
                        patient: required.patient.name,
                        remark: 'No remarks'

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

const allReport = (req, res) => {
    Report.find({}).then(found => {
        res.render('sendReport', {reports: found});
    }).catch(err => {
        res.render('err', {error: err});
    });
    
}



const deleteReport = (req, res) => {
    Report.findOneAndDelete({uuid: req.params.uuid}).then( doc => {
        Data.findOneAndDelete({uuid: req.params.uuid}).then(docs => {
            res.redirect('/sendReport');
        }).catch(err => {
            res.render('err', {error: err});
        });

    }).catch(err => {
        res.render('err', {error: err});
    });
}

const viewReport = (req, res) => {
    
    Report.findOne({uuid: req.params.uuid}).then(found => {
        
        Data.findOne({uuid: req.params.uuid}).then(data => {

            Profile.find({}).then(profile => {
                if(profile.length > 0) {
                res.render('viewReport',{report: found, patient: data.patient, profile: profile[0]}); 
                } else {
                    res.render('viewReport',{report: found, patient: data.patient, profile: {}}); 
                }
            }).catch(err => {
            res.render('err', {error: err});
            });
            
        }).catch(err => {
            res.render('err', {error: err});
        });

    }).catch(err => {
        res.render('err', {error: err});
    });
}

  
const profile = (req, res) => {
    Profile.find({}).then(found => {
        if(found.length > 0){
            res.render('profile',{alert:"", profile: found[0]});
        } else {
            res.render('profile',{alert:"", profile: {}});
        }
    }).catch(err => {
        res.render('err', {error: err});
    })

}

const updateProfile = (req, res) => {

    Profile.find({}).then(found => {
        if(found.length > 0){

            found[0].name = req.body.name;
            found[0].number = req.body.number;
            found[0].email = req.body.email;
            found[0].address = req.body.address;

            found[0].save( function(err, data) {
                if(err) {
                    res.render('err', {error: err});
                } else {
                    res.redirect('/profile');
                }
            })
        } else {

            const newProfile = new Profile({
                name: req.body.name,
                number: req.body.number,
                email: req.body.email,
                address: req.body.address,
                logo: ''
            }) 

            newProfile.save( (err, data) => {
                if(err) {
                    res.render('err', {error: err});
                } else {
                    res.redirect('/profile');
                }
            })
        }
    }).catch(err => {
        res.render('err', {error: err});
    })

    
}

const updateImage = (req, res) => {
    if(req.file) {
        // console.log('this is file');
        // console.log(req.file);


        Profile.find({}).then(found => {
            if(found.length > 0){
    
                found[0].logo = req.file.buffer.toString('base64');
                found[0].mimetype = req.file.mimetype;
                
                found[0].save( function(err, data) {
                    if(err) {
                        res.render('err', {error: err});
                    } else {
                        res.redirect('/profile');
                    }
                })
            } else {
                res.render('profile', {alert: "Please fill profile details first", profile: {}});
            }
        }).catch(err => {
            res.render('err', {error: err});
        })

    } else {

        Profile.find({}).then(found => {
            if(found.length > 0){
                res.render('profile', {alert: "File should be png/jpeg of size less then 11 MB", profile: found[0]});
            } else {
                res.render('profile', {alert: "File should be png/jpeg of size less then 11 MB", profile: {}});
            }
        }).catch(err => {
            res.render('err', {error: err});
        })
    }
}

const changeRemark = (req, res) => {
    Report.findOneAndUpdate({uuid: req.params.uuid}, {remark: req.body.remarks}).then(found =>{
        res.redirect(`/viewReport/${found.uuid}`);
    }).catch(err => {
        res.render('err', {error: err});
    })
}


module.exports = {
    index, addPatientPage, createReport, manageTest, allReport, addPatient, editReport, saveReport, viewReport, deleteReport, profile, updateProfile, updateImage, changeRemark
}