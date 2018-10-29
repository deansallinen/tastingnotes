const Router = require('koa-router');
const Ctrl = require('../controllers/notes');

const router = new Router();

router.get('/', Ctrl.all);
router.post('/', Ctrl.postNote);
router.get('/:nid', Ctrl.getNote);
router.put('/:nid', Ctrl.updateNote);
router.del('/:nid', Ctrl.deleteNote);


module.exports = router.routes();
