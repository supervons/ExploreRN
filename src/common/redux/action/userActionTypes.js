/**
 * Created by supervons on 2019/08/20.
 * 本文件涉及与用户信息相关的类型，新增请写明用途
 * This document relates to the types related to user information. Please add a description.
 */

/**
 * 用户令牌信息，涉及到所有网络请求中的身份校验
 * User token information, involving identity verification in all network requests
 */
export const USER_TOKEN = 'USER_TOKEN';

/**
 * 用户信息，USER_TOKEN + USER_INFO 均有值，则无需再次输入账户密码即可登录
 * User information, USER_TOKEN + USER_INFO have values, you can log in without entering the account password again
 */
export const USER_INFO = 'USER_INFO';
