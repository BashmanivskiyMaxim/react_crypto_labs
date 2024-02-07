import {initializeApp} from "firebase/app";

export default class Db {
    get app() {
        return this._app;
    }

    set app(value) {
        this._app = value;
    }

    get db() {
        return this._firestore;
    }

    set db(value) {
        this._firestore = value;
    }

    constructor() {
        this._firebaseConfig = {
            apiKey: "AIzaSyDynEkLBOPYHINTgeQ1M39wy1Ylu5FafAk",
            authDomain: "lab8-3bbdf.firebaseapp.com",
            projectId: "lab8-3bbdf",
            storageBucket: "lab8-3bbdf.appspot.com",
            messagingSenderId: "564159322087",
            appId: "1:564159322087:web:2eed86ebc0af3aa2ad8f42"

        }
        this._app = initializeApp(this._firebaseConfig)
    }
}