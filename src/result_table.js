import Player from "./player.js";

export default class ResultTable {
    _players = []
    _table = document.createElement("table")
    isShow  = false;

    constructor() {
        const thisResultTable = this;

        this._players = this._getFromLocalStorage()

        this._initTable()
    }

    get players() {
        return this._players
    }

    _initTable() {
        document.body.append(this._table)
        this._table.classList.add("result-table")


        if (!this._players.length) {
            this._table.innerHTML = `<h1>Don't have players</h1>`
        } else {
            this._setTableHeader()
            this._updateTable()
        }

    }

    _setTableHeader() {
        this._table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
        `
    }

    _updateTable() {
        this._table.innerHTML = ''
        this._setTableHeader()

        for (let { name, score } of this._players) {
            const lineHTML = `
                <tr>
                    <td>${name}</td>
                    <td>${score}</td>
                </tr>
            `
            this._table.innerHTML += lineHTML
        }
    }

    _sortPlayersByScore() {
        this._players.sort((a, b) => b.score - a.score)
    }

    _getFromLocalStorage() {
        let players = []
        const json = localStorage.getItem("players")

        if (!json) {
            localStorage.setItem('players', JSON.stringify(players))
        } else {
            players = JSON.parse(json);
        }

        return players;
    }

    toggle() {
        if (this.isShow) {
            this.hide()
            this.isShow = false
        } else {
            this.show()
            this.isShow = true
        }
    }

    show() {
        this._table.classList.add('show')
    }

    hide() {
        this._table.classList.remove('show')
    }

    updatePlayer(player) {
        for (let i = 0; i < this._players.length; i++) {
            if (this._players[i].name === player.name) {
                this._players[i] = player
                break;
            }
        }
        this._sortPlayersByScore()
        this._updateTable()
    }

    addPlayer(player, isSave) {
        player.name.trim();

        if (this._players.length >= 9) {
            this._players = this._players.slice(0, -1)
        }

        let playerIndex;
        
        for (let i = 0; i< this._players.length; i++) {
            if (this._players[i].name === player.name) {
                playerIndex = i;
                console.log(playerIndex)
                break;
            }
        }

        if (!playerIndex && playerIndex !== 0) {
            this._players.push(player)
        }

        if (isSave) {
            this._sortPlayersByScore()
            localStorage.setItem("players", JSON.stringify(this._players))

        }

        console.log(this._players)

        this._updateTable()

        return this._players[playerIndex] || player
    }
}