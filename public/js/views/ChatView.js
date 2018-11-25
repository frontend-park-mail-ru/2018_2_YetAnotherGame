import BaseView from "./BaseView.js"
import Block from "../components/block/block.mjs"
import PageView from "./PageView.js";

export default class ChatView extends PageView {
    constructor(el) {
        super(el)
    }

    show() {
        super.show()
    }

    render() {
        const miniChat = document.getElementById("iframe")
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

        super.render({
            body: [chat]
        })
    }
}