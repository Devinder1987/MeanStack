const Emp = require('../models/emp');

module.exports = function empData() {
    return(
    Emp.find({})
        .exec(function (err, emps) {
            if (err) {
                console.log("Error in retriving emps");
            } else {
                res.json(emps);
            }
        })
    );
}