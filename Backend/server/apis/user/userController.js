const userModel = require("./userModel");
const bcrypt = require("bcrypt");

const Login = (req, res) => {
    var errMsgs = [];
    if (!req.body.email) {
        errMsgs.push("email is required!!");
    }
    if (!req.body.password) {
        errMsgs.push("password is required!!");
    }
    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    } else {
        userModel.findOne({ email: req.body.email })
            .then((userdata) => {
                if (userdata == null) {
                    return res.send({
                        status: 404,
                        success: false,
                        message: "user not found!!"
                    });
                }

                if (userdata.status == false) {
                    return res.send({
                        status: 403,
                        success: false,
                        message: "Your account is deactivated. Please contact support."
                    });
                } else {
                    bcrypt.compare(req.body.password, userdata.password, function (err, ismatch) {
                        if (!ismatch) {
                            res.send({
                                status: 400,
                                success: false,
                                message: "wrong password!!"
                            });
                        } else {
                            res.send({
                                status: 200,
                                success: true,
                                message: "login successfully!!",
                                data: userdata
                            });
                        }
                    });
                }
            })
            .catch((err) => {
                console.log("err is", err);
                res.send({
                    status: 500,
                    success: false,
                    message: "Something went wrong!!"
                });
            });
    }
};

const changepassword = (req, res) => {
    var errMsgs = [];
    if (!req.body.oldpassword)
        errMsgs.push("oldpassword is required!!");
    if (!req.body.newpassword)
        errMsgs.push("newpassword is required!!");
    if (!req.body.confirmpassword)
        errMsgs.push("confirmpassword is required!!");

    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }

    if (req.body.newpassword === req.body.confirmpassword) {
        
        userModel.findOne({ email: req.body.email }) 
            .then((userdata) => {
                if (!userdata) {
                    return res.send({
                        status: 404,
                        success: false,
                        message: "user not found!!"
                    });
                }

                bcrypt.compare(req.body.oldpassword, userdata.password, function (err, ismatch) {
                    if (!ismatch) {
                        res.send({
                            status: 422,
                            success: false,
                            message: "wrong password!!"
                        });
                    } else {
                        // update password
                        userdata.password = bcrypt.hashSync(req.body.newpassword, 10);
                        userdata.save()
                            .then((updatedata) => {
                                res.send({
                                    status: 200,
                                    success: true,
                                    message: "Password updated!!",
                                    data: updatedata
                                });
                            })
                            .catch((err) => {
                                console.log("err is", err);
                                res.send({
                                    status: 500,
                                    success: false,
                                    message: "Something went wrong!!"
                                });
                            });
                    }
                });
            })
            .catch((err) => {
                console.log("err is", err);
                res.send({
                    status: 500,
                    success: false,
                    message: "Something went wrong!!"
                });
            });
    } else {
        res.send({
            status: 422,
            success: false,
            message: "new password and confirm should be same!!"
        });
    }
};

module.exports = { Login, changepassword };
