/**
 * Created by supervons on 2019/08/19.
 * 提供基础配置信息
 * constants.js 提供如服务器地址、分页数量、设备类型、设备号、版本号等配置
 *
 * Provide basic configuration information
 * constants.js provides configuration such as server address, page number, device type, device number, version number, etc.
 */
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

export default {
  serverUrl: "http://47.93.31.98:8080/commonProject",
  pageSize: 10,
  deviceType: Platform.OS.toUpperCase(),
  deviceInfo: {
    UniqueID: DeviceInfo.getUniqueId(),
    Manufacturer: DeviceInfo.getManufacturer(),
    Brand: DeviceInfo.getBrand(),
    Model: DeviceInfo.getModel(),
    DeviceId: DeviceInfo.getDeviceId(),
    SystemName: DeviceInfo.getSystemName(),
    SystemVersion: DeviceInfo.getSystemVersion(),
    BundleId: DeviceInfo.getBundleId(),
    ApplicationName: DeviceInfo.getApplicationName(),
    BuildNumber: DeviceInfo.getBuildNumber(),
    Version: DeviceInfo.getVersion(),
    ReadableVersion: DeviceInfo.getReadableVersion(),
    DeviceName: DeviceInfo.getDeviceName(),
    UserAgent: DeviceInfo.getUserAgent(),
    // DeviceLocale: DeviceInfo.getDeviceLocale(),
    // DeviceCountry: DeviceInfo.getDeviceCountry(),
    // IPAddress: DeviceInfo.getIPAddress(),
    // MACAddress: DeviceInfo.getMACAddress(),
    TotalMemory: DeviceInfo.getTotalMemory(),
    MaxMemory: DeviceInfo.getMaxMemory(),
  },
  deviceNo: DeviceInfo.getUniqueId().replace("-").substr(0, 12),
  versionName: DeviceInfo.getVersion(),
};
