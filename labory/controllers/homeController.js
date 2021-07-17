const index = (req, res) => {
    res.render('index');
}

const addPatientPage = (req, res) => {
    res.render('addPatient');
}

const managePatient = (req, res) => {
    res.render('managePatient');
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
    index, addPatientPage, managePatient, manageTest, sendReport, payments
}

