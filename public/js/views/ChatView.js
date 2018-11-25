import BaseView from "./BaseView.js"
import Block from "../components/block/block.mjs"
import PageView from "./PageView.js";
import mediator from "../scripts/mediator.js";

export default class ChatView extends PageView {
    constructor(el) {
        super(el)
        this.chats = null
        this.history = null
        // mediator.on("chats-loaded", this.setChats.bind(this))
        // mediator.on("history-loaded", this.setHistory.bind(this))
    }

    fetchChats() {
        mediator.emit("fetch-chats")
    }

    fetchHistory() {
        mediator.emit("fetch-history")
    }

    setChats(chats) {
        this.chats = chats
    }

    setHistory(history) {
        this.history = history
    }

    show() {
        // this.fetchChats()
        // this.fetchHistory()
        super.show()
        document.getElementById("iframe").style.display = "none"
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('mode');
        if (myParam == "iframe") {
            document.getElementById("MenuHeader").style.display = "none"
        }
    }
    
    render() {
        this.el.clear()
        const chat = Block.Create("div", {}, ["chat"])
        const chatHead = Block.Create("div", {}, ["chat__header"], `Chat with `)
        const chatBody = Block.Create("div", {}, ["chat__body"])
        const chatSideBar = Block.Create("div", {}, ["chat__body__sb"], "пользователи")
        const chatMainBar = Block.Create("div", {}, ["chat__body__mb"])
        const chatMsgs = Block.Create("div", {}, ["chat__mb_msg"])
        const chatInputSection = Block.Create("div", {}, ["chat__mb_input"])
        const chatInputForm = Block.Create("form", {"onsubmit":"alert(asd)"}, ["chat_form"])
        const chatInputArea = Block.Create("input", {"type":"text", "size":"40"}, ["chat_input"])
        const chatSubmit = Block.Create("input", {"type":"submit", "value":"send"}, ["chat_submit"])
        const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "⬅")

        const MSG = Block.Create("span", {},[], "PRIVET")
        chatInputForm
            .append(chatInputArea)
            .append(chatSubmit)

        chatInputSection
            .append(chatInputForm)

        chatMainBar
            .append(chatMsgs)
            .append(chatInputSection)

        chatBody
            .append(chatSideBar)
            .append(chatMainBar)

        chat
            .append(chatHead)
            .append(chatBody)

        // if (this.chats !== null) {
        //     this.chats.forEach((chat) => {
        //         chatSideBar.append(chat)
        //     })
        // }

        // if (this.history !== null) {
        //     this.history.forEach((msg)=> {
        //         chatMsgs.append(msg)
        //     })
        // }

        super.render({
            header: [menuLink],
            body: [chat]
        })
        document.getElementById("iframe").style.display = "none"
    }
}