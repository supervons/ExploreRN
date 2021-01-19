import My from '../screens/my';
import Settings from '../screens/my/settings';
import VersionInfo from '../screens/my/settings/version';
import ThemeChange from '../screens/my/settings/theme-change';
import BaseInfo from '../screens/my/baseInfo';
import SystemIntroduction from '../screens/systemIntroduction';
import UpdatePassword from '../screens/my/settings/update-password';
import Scanner from '../screens/scanner/scanner';
import ScannerResult from '../screens/scanner/scannerResult';

/**
 * @desc The my page route collection
 * @author supervons
 * @date 2021/01/19
 */

export const MyRouter = {
  My: {
    // 我的页面
    screen: My
  },
  Settings: {
    // 设置页面
    screen: Settings
  },
  VersionInfo: {
    // 版本信息页面
    screen: VersionInfo
  },
  ThemeChange: {
    // 皮肤更换页面
    screen: ThemeChange
  },
  BaseInfo: {
    // 个人基本信息页面
    screen: BaseInfo
  },
  SystemIntroduction: {
    // 系统介绍界面
    screen: SystemIntroduction
  },
  UpdatePassword: {
    // 修改密码界面
    screen: UpdatePassword
  },
  Scanner: {
    // 扫一扫及拍照界面
    screen: Scanner
  },
  ScannerResult: {
    // 扫一扫及拍照结果界面
    screen: ScannerResult
  }
};
exports.default = MyRouter;
