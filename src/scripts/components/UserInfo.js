export default class UserInfo {
  constructor(configInfo) {
    this._nameOfProfile = document.querySelector(configInfo.nameOfProfileSelector);
    this._descriptionOfProfile = document.querySelector(configInfo.descriptionOfProfileSelector);
  }

  getUserUnfo() {
    return {name: this._nameOfProfile.textContent, description: this._descriptionOfProfile.textContent}
  }

  setUserInfo(dataUser) {
    this._nameOfProfile.textContent = dataUser.name;
    this._descriptionOfProfile.textContent = dataUser.description;
  }
}