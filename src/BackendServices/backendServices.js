export default class BackendServices {
  static host = 'http://localhost:4000/api';

  static usersRoue = '/users';

  static messagesRoue = '/messages';

  static userRoue = '/user';

  static messageRoue = '/message';

  static dataRequest(url, data) {
    return fetch(`${this.host}${url}`, {
      ...data,
    }).then(response => response.text());
  }

  static setDataUsersInLocalStorage = () =>
    this.dataRequest(this.usersRoue, {
      method: 'GET',
      headers: new Headers().append('Content-Type', 'application/json'),
      redirect: 'follow',
    }).then(result => {
      localStorage.setItem('userId', JSON.parse(result)[JSON.parse(result).length - 1].id);
      localStorage.setItem('userName', JSON.parse(result)[JSON.parse(result).length - 1].name);
    });

  static getMessages = () =>
    this.dataRequest(this.messagesRoue, {
      method: 'GET',
      headers: new Headers().append('Content-Type', 'application/json'),
      redirect: 'follow',
    }).then(messages => JSON.parse(messages));

  static postDataUser = userName =>
    this.dataRequest(this.userRoue, {
      method: 'post',
      headers: new Headers().append('Content-Type', 'application/json'),
      mode: 'cors',
      body: JSON.stringify({
        name: userName,
        avatar: 'IMAGE',
      }),
    });

  static postMessage = (newMessage, userId, userName) =>
    this.dataRequest(this.messageRoue, {
      method: 'post',
      headers: new Headers().append('Content-Type', 'application/json'),
      mode: 'cors',
      body: JSON.stringify({
        message: newMessage,
        userId,
        userName,
      }),
    });
}
