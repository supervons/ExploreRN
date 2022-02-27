[简体中文](./README.md) | English

# project instruction
### 1. Explore the RN features of the new version;
### 2. Integrate component experiments and build your own wheels!
### 3. Hone my architectural skills and continue coding and code optimization.
#### Welcome to join us:
    QQ group: 783071253
    Email address: supervons@sina.com
    Current RN version: 0.66.4

### Download（Android）
#### Firim : http://d.firim.top/25th
<img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/download-apk.png" alt="download" style="height: 200px;" align="center"/>

### Test account

    Username: test
    Password: test

# NodeJS Web Server 
### Based on KOA2 + TypeScript - highly available NodeJS Web Server
### Address: https://github.com/supervons/ExploreKoa

# Features

| Name | Description | Use component name and version |
| ------------- | -------------------------------- | ------------------------------------------------------------ |
| Picture selection | Choose a picture in the album, or take a photo | react-native-image-picker@2.3.4 |
| Scan | Scan the QR code to get the information in the QR code | react-native-camera@3.8.0 |
| Theme change | Change system navigation head and button colors | react-navigation@3.11.1 |
| UI library | Project UI library | react-native-elements@3.1.0 |
| Redux Family Bucket | Use of redux and middleware | redux@4.0.4<br />redux-persist@5.10.0<br />redux-logger@3.0.6<br />redux-thunk@2.3 .0 |
| Network request | Unified package network request | axios@0.19.0 |
| Refactoring based Hook | Refactoring class page based on hook | react@17.0.1 |
| Skeleton screen | Improve the list and page browsing experience | react-native-shimmer-placeholder@2.0.7 |
| Language Localize | APP language switch, with the local system Settings | react-native-localize@2.0.3 + i18n-js@3.8.0 |
| Components-Dragged | Component elements move with touch drag and drop | react-native-draggable@3.3.0 |

# Finished

- [x] Theme Change
- [x] Skeleton
- [x] Language Localize
- [x] Morandi-Colors
- [x] Components are drag-and-drop supported
- [x] Perfect preview page
- [x] Use new KOA api application
- [x] Better animation - Lottie
- [x] Email register

# TODO LIST

- [ ] Upgrade to new version 0.67.3
- [ ] Multiple Bundle Support
- [ ] Typescript
- [ ] Retrieve password by e-mail.
- [ ] Change avatar and show avatar history - 50%
- [ ] Map
- [ ] Push


# Preview
#### Dynamic TAB-Bar
<img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/dynamic-tab.gif" alt="DynamicTAB-Bar" style="height: 200px;" align="center"/>

#### Skeleton
<img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/skeleton.gif" alt="Skeleton" align="center"/>

#### Draggable
<img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/draggable.gif" alt="Draggable" align="center"/>

#### I18
<img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/zh-setting.png" alt="中文" align="center"/> <img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/en-setting.png" alt="英文" align="center"/>

#### Theme
<img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/change-theme.gif" alt="Theme" align="center"/>

#### Morandi-Color
<img src="https://cdn.jsdelivr.net/gh/supervons/ExploreRN@2.0.0/preview/morandi.png" alt="Morandi-Color" align="center"/>

# Project Structure

```
|-- android	// android
|-- ios	// iOS
| -- src	// project folder
|   | -- actions	// interface-related directories
|   | --common	// common configuration constant directory
|   | -- components	// System-level component catalog
|   |--hook// Custom hook directory
|   | -- redux	// redux-related directories
|   |   |-- action
|   |   |-- reducer
|   |   |-- store
|   | -- resource	// resource directory
|   | -- routers	// route navigation directory
|   | -- screens	// System page directory
|   | --styles	// system common style directory
|   | -- utils	// System tool catalog
| -- App .js	// Entry file
| -- buildAndroid.sh	// android packaging script
| -- package.json	// This needless to say
| -- package-lock.json	// i.e
|-- . preettierrc	// Prettierrc code format the directory
```

# Installation dependencies

```sh
npm install
# If it is iOS, you need to perform the following operations to ensure that the network is unblocked
cd ios && pod install
```

# Run

`android`: 
- react-native run-android
- runAndroid.sh
    android: react-native run-android
    
`ios`: 
- Xcode selects AwesomeProject.xcworkspace to start

# Setting server URL
file `src/common/constants.js` setting value `serverUrl`.

# Internationalized language settings

`/src/common/languages.js` Set the supported languages in the, currently supports `CN`、`EN`

In `/src/common/cn.js`、`/src/common/en.js`Set up language config.

Code use:
```javascript
I18n.t("Register.userEmptyToast") // Prompt when the username is empty on the registration page
```

