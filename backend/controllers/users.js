const { User } = require('../models');

const allusers = require('../test-data/users');

function oneUser(ctx) {
  // let user = ctx.request.query.user
  // let id = ctx.request.query.id
  const id = ctx.params.uid;
  const [res] = allusers.filter(x => x.id === id);
  // console.log(res)
  if (res) {
    ctx.ok(res);
  }
}

async function allUsers(ctx) {
  const users = await User.find({});
  ctx.ok(users);
}

module.exports = {
  allUsers,
  oneUser,
};
