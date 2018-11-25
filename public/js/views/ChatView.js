import BaseView from "./BaseView.js"
import Block from "../components/block/block.mjs"

export default class ChatView extends BaseView {
    constructor(el) {
        super(el)
    }

    show() {
        super.show()
    }

    render() {
        const chat = Block.Create("div", {}, ["chat"])
        const chatHead = Block.Create("div", {}, [])
        const chatBody = Block.Create("div", {}, [])
        const chatSideBar = Block.Create("div", {}, [])
        const chatMain = Block.Create("div", {}, [])
        const chatMsg = Block.Create("div", {}, [])
        const chatInput = Block.Create("input", {"type":"text", "size":"40"}, [])
        const chatSubmit = Block.Create("input", {"type":"submit", "value":"send"}, [])

        chatMsg
            .append(chatInput)
            .append(chatSubmit)

        chatBody
            .append(chatSideBar)
            .append(chatMain)
            .append(chatMsg)

        chat
            .append(chatHead)
            .append(chatBody)

        this.el.append(chat)
    }
}