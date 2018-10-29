
const users = require('../test-data/users');

function oneUser(ctx) {
  // let user = ctx.request.query.user
  // let id = ctx.request.query.id
  const id = ctx.params.uid;
  const [res] = users.filter(x => x.id === id);
  // console.log(res)
  if (res) {
    ctx.ok(res);
  }
}

function allUsers(ctx) {
  ctx.ok(users);
}

module.exports = {
  allUsers,
  oneUser,
};
