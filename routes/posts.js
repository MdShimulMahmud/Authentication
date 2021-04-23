const router = require('express').Router();
// to do post route private
const verify = require('./verify_token');
router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: "this is my first posts",
            description: "Random data should not access!"
        }
    });
    // finding user with
    // res.send(req.user);

    User.findbyone({ _id: req.user });
});

module.exports = router;