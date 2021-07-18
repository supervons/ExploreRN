import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ListItem, Button, Avatar } from "react-native-elements";
import Theme from "../../../styles/theme";
import Toast from "../../../components/toast";
import userAction from "../../../actions/user";
import { USER_INFO } from "../../../redux/action/userActionTypes";
import { connect, useSelector } from "react-redux";
import I18n from "../../../common/languages";
import commonStyles from "../../../styles/commonStyles";

/**
 * Created by supervons on 2019/08/15.
 * 基本信息页面，可以修改头像及签名.
 * Base info page, user can change avatar and motto.
 */
export default function BaseInfo() {
  const [userInfo, setUserInfo] = useState([]);
  const profileInfo = useSelector(state => state.SettingReducer.profileInfo);

  useEffect(() => {
    const userInfoJson = [
      {
        key: "avatar",
        title: I18n.t("BaseInfos.avatar"),
        rightTitle: profileInfo.file_access_path,
        editable: false,
      },
      {
        key: "motto",
        title: I18n.t("BaseInfos.motto"),
        rightTitle: profileInfo.motto,
        editable: false,
      },
      {
        key: "loginId",
        title: I18n.t("BaseInfos.account"),
        rightTitle: global.userInfo.uId,
        editable: false,
      },
      {
        key: "userName",
        title: I18n.t("BaseInfos.name"),
        rightTitle: global.userInfo.userName,
        editable: true,
      },
      {
        key: "userSex",
        title: I18n.t("BaseInfos.sex"),
        rightTitle: global.userInfo.userSex,
        editable: false,
      },
      {
        key: "userCellPhone",
        title: I18n.t("BaseInfos.phone"),
        rightTitle: global.userInfo.userCellphone,
        editable: true,
      },
      {
        key: "userAddress",
        title: I18n.t("BaseInfos.address"),
        rightTitle: global.userInfo.userAddress,
        editable: true,
      },
    ];
    setUserInfo(userInfoJson);
  }, [profileInfo]);

  function _renderItemView(i, title, rightTitle) {
    return (
      <ListItem bottomDivider key={i}>
        <ListItem.Content
          key={i}
          containerStyle={commonStyles.itemPadding}
          rightTitleStyle={{ width: 170, textAlign: "right" }}
          bottomDivider={true}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <ListItem.Title>{title}</ListItem.Title>
          </View>
          {i === 0 ? (
            <ListItem.Subtitle>
              <Avatar
                rounded
                size="medium"
                source={
                  rightTitle
                    ? { uri: rightTitle }
                    : require("../../../resource/image/avatar/logo.png")
                }
              />
            </ListItem.Subtitle>
          ) : (
            <ListItem.Subtitle>{rightTitle}</ListItem.Subtitle>
          )}
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      {userInfo.map((item, i) =>
        _renderItemView(i, item.title, item.rightTitle),
      )}
    </View>
  );
}
