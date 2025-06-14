
interface User {
    userid: number,
    username: string,
    studentid: string,
    email: string
}

/**
 * @description 用户数据类型定义
 * @property {number} role - 用户角色(1-管理员, 2-用户, 3-志愿者)
 * @property {string} username - 用户名
 */
export interface UserType {
    role: number | void,
    userData: User | void
}

