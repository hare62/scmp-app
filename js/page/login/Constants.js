/**
 * 角色类型
 */
export const RoleTypeEnum = {
  Worker: '9693f4a6d61746f8a392d6ebdf4f91b9',
  Director: '16d4ff33abf64b88b5c478a55e159b35',
  QualityInspection: '4140e2aa27fa471babc0e379768aec43'
};

/**
 * 登录状态
 */
export const LoginStatusEnum = {
  Unlogin: Symbol('Unlogin'),
  LoginSuccess: Symbol('LoginSuccess'),
  LoginFailure: Symbol('LoginFailure')
};