package the.turku.forge.babyProject.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.stereotype.Controller
import the.turku.forge.babyProject.model.ChatMessage

@Controller
class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public fun sendMessage(@Payload chatMessage: ChatMessage): ChatMessage {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public fun addUser(@Payload chatMessage: ChatMessage, headerAccessor: SimpMessageHeaderAccessor) : ChatMessage {
        // Add username in WebSocket session
        headerAccessor.sessionAttributes?.set( "username", chatMessage.sender )
        return chatMessage;
    }
}