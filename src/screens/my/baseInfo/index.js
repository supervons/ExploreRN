/**
 * Created by supervons on 2019/08/15.
 * Base info page, user can change avatar and motto.
 */
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import { PROFILE_INFO } from "../../../redux/action/settingActionTypes";
import Theme from "../../../styles/theme";
import I18n from "../../../common/languages";
import Toast from "../../../components/toast";
import ProfileAction from "../../../actions/profile";
import commonStyles from "../../../styles/commonStyles";

export default function BaseInfo() {
  const [userInfo, setUserInfo] = useState([]);
  const profileInfo = useSelector(state => state.SettingReducer.profileInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfoJson = [
      {
        key: "avatar",
        title: I18n.t("BaseInfos.avatar"),
        rightTitle: profileInfo?.file_access_path,
        editable: false,
      },
      {
        key: "motto",
        title: I18n.t("BaseInfos.motto"),
        rightTitle: profileInfo?.motto,
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

  function itemAction(index) {
    if (index === 0) {
      uploadFile();
    }
  }

  /**
   * Upload avatar and refresh redux profile info.
   */
  function uploadFile() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let formData = new FormData();
      let file = {
        uri: image.path,
        type: "multipart/form-data",
        name: "image.png",
      };
      formData.append("files", file);
      console.log(JSON.stringify(profileInfo));
      formData.append("id", profileInfo.id);
      formData.append("userId", profileInfo.user_id);
      ProfileAction.updateProfile(formData)
        .then(res => {
          dispatch({
            type: PROFILE_INFO,
            profileInfo: res.profileInfo,
          });
        })
        .catch(res => {
          Toast.showToast("update theme failed!" + res.msg);
        });
    });
  }

  function _renderItemView(i, title, rightTitle) {
    return (
      <ListItem onPress={() => itemAction(i)} bottomDivider key={i}>
        <ListItem.Content
          key={i}
          containerStyle={commonStyles.itemPadding}
          rightTitleStyle={styles.listRightTitle}
          bottomDivider={true}
          style={styles.listItemContent}>
          <View style={styles.listTitle}>
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

const styles = StyleSheet.create({
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listRightTitle: {
    width: 170,
    textAlign: "right",
  },
  listTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
