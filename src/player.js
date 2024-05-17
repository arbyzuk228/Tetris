export default class Player {
    score = 0;

    getPlayerName() {
        while (!this.name) {
            this.name = prompt("Введите имя пользователя:")
        }
    }
}