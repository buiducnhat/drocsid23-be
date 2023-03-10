const router = require('express').Router();
const serverPolicy = require('../constant/ServerPolicy');
const { OWNER, MANAGE_INVITE, MANAGE_SERVER } = require('../constant/ServerPolicy');
const serverController = require('../controllers/server.controller');
const Authen = require('../middleware/authen');
const serverRoleGroup = require('../controllers/serverRoleGroup.controller');
const serverRoleGroupController = require('../controllers/serverRoleGroup.controller');
const UserServerRole = require('../controllers/userServerRole.controller');

// get All Servers Joined By User
router.get('/get-servers-join-user', Authen.verifyToken, serverController.getAllServersJoinedByUser)

// response User Request Join
router.post('/response-user-request/:serverId', Authen.verifyToken, serverController.responseUserRequestJoin)


// get-server-public
router.get('/get-servers-public', serverController.getServersPublic)

// get-member
router.get('/:serverId', Authen.verifyToken, serverController.getServerById);

// router.get('/', serverController.getAllServer);
router.delete('/:serverId', Authen.verifyToken, serverController.deleteServer)

// create
router.post('/', Authen.verifyToken,  serverController.createServer);

// update
router.put('/:serverId', Authen.verifyToken, serverController.updateServer);


// kick user to server
router.put('/:serverId/kick-user', Authen.verifyToken, serverController.kickUser)
// create invite link
router.post('/create-invite/:serverId', Authen.verifyToken, Authen.verifyPermission(serverPolicy.MANAGE_INVITE), serverController.createInviteServer)


// response request join
router.post('/response-requests/:serverId', Authen.verifyToken, Authen.verifyPermission(MANAGE_SERVER), serverController.responseUserRequestJoin)


// Role on server
router.post('/:serverId/roles',Authen.verifyToken, serverRoleGroup.createRoleGroup)

// get all roles of current server
router.get('/:serverId/roles',Authen.verifyToken, serverRoleGroup.getAllRoleGroup)

// delete role
router.delete('/:serverId/roles/:roleId', Authen.verifyToken, serverRoleGroupController.deleteRoleGroup)

router.get('/:serverId/roles/:roleId', Authen.verifyToken, serverRoleGroup.getRoleGroup)

router.put('/:serverId/roles/:roleId', Authen.verifyToken, serverRoleGroup.updateRoleGroup)



// user-role-server
router.put('/:serverId/user-role/:roleId', Authen.verifyToken, UserServerRole.addUserToRoleGroup)
router.get('/:serverId/user-role/:userId', Authen.verifyToken, UserServerRole.getDetailRolesUserOnServer)
router.get('/:serverId/user-role/get-all-members/:roleId', Authen.verifyToken, UserServerRole.getAllUsersBelongRoleGroup)
router.get('/:serverId/user-role/users-not-belong/:roleId', Authen.verifyToken, UserServerRole.getUsersNotBelongRoleGroup)
router.delete('/:serverId/user-role/:roleId/:userId', Authen.verifyToken, UserServerRole.removeUserFromRoleGroup)

module.exports = router;
