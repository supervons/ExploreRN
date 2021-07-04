import React, { useState } from "react";
import md5 from "md5";
import { View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Theme from "../../../../styles/theme";
import commonStyles from "../../../../styles/commonStyles";
import Toast from "../../../../components/toast";
import userAction from "../../../../actions/user";
import I18n from "../../../../common/languages";

/**
 * Created by supervons on 2019/09/06.
 * 修改密码页面
 * update password page
 */
export default function UpdatePassword(props) {
  const renderItem = [
    {
      key: "oldPassword",
      title: I18n.t("ChangePassword.oldPassword"),
      placeholder: I18n.t("ChangePassword.oldPasswordPlaceholder"),
      editable: false,
    },
    {
      key: "newPassword",
      title: I18n.t("ChangePassword.newPassword"),
      placeholder: I18n.t("ChangePassword.newPasswordPlaceholder"),
      editable: true,
    },
    {
      key: "confirmPassword",
      title: I18n.t("ChangePassword.confirmPassword"),
      placeholder: I18n.t("ChangePassword.confirmPasswordPlaceholder"),
      editable: false,
    },
  ];
  const [userInfo, setUserInfo] = useState({});

  /**
   * Update user password.
   * Need old password and new password can't same with it.
   * Use md5 encryption.
   */
  function updatePassword() {
    if (
      !userInfo.oldPassword ||
      !userInfo.newPassword ||
      !userInfo.confirmPassword
    ) {
      Toast.showToast("请输入原密码和新密码!");
    } else {
      if (userInfo.newPassword !== userInfo.confirmPassword) {
        Toast.showToast("两次输入新密码不一致!");
      } else {
        if (userInfo.oldPassword === userInfo.newPassword) {
          Toast.showToast("请输入不同的新密码噢!");
        } else {
          const params = {
            ...userInfo,
            id: global.userInfo.id,
            oldPassword: md5(userInfo.oldPassword),
            newPassword: md5(userInfo.newPassword),
          };
          userAction.updatePassword(params).then(resp => {
            Toast.showToast("update password success!");
            props.navigation.pop(2);
          });
        }
      }
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      {renderItem.map((item, i) => (
        <ListItem bottomDivider key={i}>
          <ListItem.Content
            key={i}
            containerStyle={commonStyles.itemPadding}
            bottomDivider={true}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ListItem.Title>{item.title}</ListItem.Title>
            </View>
            <ListItem.Input
              onChangeText={text =>
                setUserInfo({ ...userInfo, [item.key]: text })
              }
              placeholder={item.placeholder}
              secureTextEntry={true}
              value={userInfo[item.key]}
              input={{
                inputStyle: {
                  paddingTop: 0,
                  alignItems: "center",
                  fontSize: 15,
                },
              }}
            />
          </ListItem.Content>
        </ListItem>
      ))}
      <Button
        icon={{
          name: "done",
          color: "white",
        }}
        buttonStyle={{
          marginTop: 15,
        }}
        title="确认"
        onPress={() => updatePassword()}
      />
    </View>
  );
}
