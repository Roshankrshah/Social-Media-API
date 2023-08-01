const express = require('express');
const router = express.Router();

const {createPost, updatePost, deletePost, getPost, reactOnPost, timelinePost}= require('../controllers/post');


router.post('/',createPost);
router.route('/:id').put(updatePost).delete(deletePost).get(getPost);
router.put('/:id/like',reactOnPost);
router.get('/timeline/all',timelinePost);

module.exports = router;