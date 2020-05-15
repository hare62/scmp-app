/**
 * 角色类型
 * 后端返回字段 不会变 根据roleId去区分角色
 */
export const RoleTypeEnum = {
   Worker: 'WorkerPage',
   Director: 'DirectorPage',
   QualityInspection: 'QualityInspectorPage',
  };

/**
 * 登录状态
 */
export const LoginStatusEnum = {
  Unlogin: Symbol('Unlogin'),
  LoginSuccess: Symbol('LoginSuccess'),
  LoginFailure: Symbol('LoginFailure'),
  NetWorkError: Symbol('NetWorkError')
};