const express = require('express');
const router = express.Router();

const {update, deleteUser, getUser, followUser, unfollowUser}= require('../controllers/user');

router.route('/:id').put(update).delete(deleteUser).get(getUser);
router.put('/:id/follow',followUser);
router.put('/:id/unfollow',unfollowUser);

module.exports = router;