export default class UserInfo {
  constructor(configInfo) {
    this._nameOfProfile = document.querySelector(configInfo.nameOfProfileSelector);
    this._descriptionOfProfile = document.querySelector(configInfo.descriptionOfProfileSelector);
    this._profileAvatar = document.querySelector(configInfo.profileAvatar);
  }

  getUserInfo() {
    return {name: this._nameOfProfile.textContent, description: this._descriptionOfProfile.textContent}
  }

  setUserInfo({ name, description, avatar }) {
    this._profileAvatar.src = avatar;
    this._nameOfProfile.textContent = name;
    this._descriptionOfProfile.textContent = description;
  }
}