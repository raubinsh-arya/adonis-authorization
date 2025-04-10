const AdminController = () => import('#controllers/admin_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.get('status', () => {
      return 'Working'
    })
    router.post('signup', [AuthController, 'create'])
    router.post('login', [AuthController, 'login'])

    router
      .group(() => {
        router.get('profile', [AuthController, 'getProfile'])
      })
      .prefix('user')
      .use(middleware.auth())
    router
      .group(() => {
        router.get('roles', [AuthController, 'getRoles'])
      })
      .prefix('user')
      .use(middleware.auth())
    router
      .group(() => {
        router.get('permissions', [AuthController, 'getPermissions'])
      })
      .prefix('user')
      .use(middleware.auth())

    // ACL
    router
      .group(() => {
        // Role
        router
          .get('roles', [AdminController, 'getAllRole'])
          .use(middleware.acl({ permissions: ['view_roles'] }))
        router
          .get('roles/:id', [AdminController, 'getRole'])
          .use(middleware.acl({ permissions: ['view_role'] }))
        router
          .get('roles/:id/permissions', [AdminController, 'getRolePermissions'])
          .use(middleware.acl({ permissions: ['view_role_permissions'] }))
        router
          .post('roles/:id/permissions', [AdminController, 'addRolePermissions'])
          .use(middleware.acl({ permissions: ['add_role_permissions'] }))
        router
          .put('roles/:id/permissions', [AdminController, 'replaceRolePermissions'])
          .use(middleware.acl({ permissions: ['add_role_permissions'] }))
        router
          .delete('roles/:id/permissions', [AdminController, 'deleteRolePermissions'])
          .use(middleware.acl({ permissions: ['remove_role_permissions'] }))
        router
          .post('roles', [AdminController, 'createRoles'])
          .use(middleware.acl({ permissions: ['create_roles'] }))
        router
          .delete('roles', [AdminController, 'deleteRoles'])
          .use(middleware.acl({ permissions: ['delete_roles'] }))
        router
          .patch('roles', [AdminController, 'disableRoles'])
          .use(middleware.acl({ permissions: ['update_roles_status'] }))
        // Permission
        router
          .get('permissions', [AdminController, 'getAllPermissions'])
          .use(middleware.acl({ permissions: ['view_permissions'] }))
        router
          .get('permissions/:id', [AdminController, 'getPermission'])
          .use(middleware.acl({ permissions: ['view_permission'] }))
        router
          .post('permissions', [AdminController, 'createPermissions'])
          .use(middleware.acl({ permissions: ['create_permissions'] }))
        router
          .delete('permissions', [AdminController, 'deletePermissions'])
          .use(middleware.acl({ permissions: ['delete_permissions'] }))
        router
          .patch('permissions', [AdminController, 'disablePermissions'])
          .use(middleware.acl({ permissions: ['update_permissions_status'] }))
        // Users
        router
          .get('users', [AdminController, 'getUsers'])
          .use(middleware.acl({ permissions: ['view_users'] }))
        router
          .get('users/:id', [AdminController, 'getUser'])
          .use(middleware.acl({ permissions: ['view_user'] }))
        router
          .get('users/:id/roles', [AdminController, 'getUserRoles'])
          .use(middleware.acl({ permissions: ['view_user_roles'] }))
        router
          .post('users/:id/roles', [AdminController, 'addUserRoles'])
          .use(middleware.acl({ permissions: ['add_user_roles'] }))
        router
          .put('users/:id/roles', [AdminController, 'updateUserRoles'])
          .use(middleware.acl({ permissions: ['update_user_roles'] }))
        router
          .get('users/:id/permissions', [AdminController, 'getUserPermissions'])
          .use(middleware.acl({ permissions: ['view_user_permissions'] }))
        router
          .post('users/:id/permissions', [AdminController, 'addUserPermissions'])
          .use(middleware.acl({ permissions: ['add_user_permissions'] }))
        router
          .put('users/:id/permissions', [AdminController, 'updateUserPermissions'])
          .use(middleware.acl({ permissions: ['update_user_permissions'] }))
        router
          .delete('users/:id/roles', [AdminController, 'deleteUserRoles'])
          .use(middleware.acl({ permissions: ['delete_user_roles'] }))
        router
          .delete('users/:id/permissions', [AdminController, 'deleteUserPermissions'])
          .use(middleware.acl({ permissions: ['delete_user_permissions'] }))
        router
          .patch('users/:id/status', [AdminController, 'updateUserStatus'])
          .use(middleware.acl({ permissions: ['update_user_status'] }))
      })
      .prefix('admin')
      .use([middleware.auth()])
  })
  .prefix('api/v1')
