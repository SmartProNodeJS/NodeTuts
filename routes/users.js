var express = require('express');
var route = express.Router('/users');
route.get("/", function (req, res) {

    if (!req.users) {

        req.users =[];



    } else {

        res.render("list_user", { "page_title": "Danh sách người dùng", "users": req.users });

    }


});