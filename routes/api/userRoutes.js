const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  removeFriend
} = require('../../controllers/userController');
// const { remove } = require('../../models/Thought');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friend/:friendId')
.post(createFriend)
.put(removeFriend);

module.exports = router;