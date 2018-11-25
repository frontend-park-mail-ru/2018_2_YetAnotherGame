import BaseView from "./BaseView.js"
import Block from "../components/block/block.mjs"
import PageView from "./PageView.js";
import mediator from "../scripts/mediator.js";

export default class ChatView extends PageView {
    constructor(el) {
        super(el)
        this.chats = null
        this.history = null
        mediator.on("fetch-chats", this.setChats.bind(this))
    }

    setData(chats) {
        this.chats = chats
    }

    show() {
        super.show()
        const miniChat = document.getElementById("iframe")
        miniChat.style.display = "none"
    }

    render() {
        const chat = Block.Create("div", {}, ["chat"])
        const chatHead = Block.Create("div", {}, ["chat__header"], `Chat with `)
        const chatBody = Block.Create("div", {}, ["chat__body"])
        const chatSideBar = Block.Create("div", {}, ["chat__body__sb"])
        const chatMainBar = Block.Create("div", {}, ["chat__body__mb"])
        const chatMsgs = Block.Create("div", {}, ["chat__mb_msg"])
        const chatInputSection = Block.Create("div", {}, ["chat__mb_input"])
        const chatInputForm = Block.Create("form", {"method": "post"}, ["chat_form"])
        const chatInputArea = Block.Create("input", {"type":"text", "size":"40"}, ["chat_input"])
        const chatSubmit = Block.Create("input", {"type":"submit", "value":"send"}, ["chat_submit"])

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


        super.render({
            body: [chat]
        })
    }
}