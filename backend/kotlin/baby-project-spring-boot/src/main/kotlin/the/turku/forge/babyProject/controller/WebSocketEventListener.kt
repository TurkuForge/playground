package the.turku.forge.babyProject.controller

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.messaging.simp.SimpMessageSendingOperations
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.stereotype.Component
import org.springframework.web.socket.messaging.SessionConnectedEvent
import org.springframework.web.socket.messaging.SessionDisconnectEvent
import the.turku.forge.babyProject.model.ChatMessage

@Component
class WebSocketEventListener(private val messagingTemplate: SimpMessageSendingOperations) {
    private val logger: Logger = LoggerFactory.getLogger(javaClass) as Logger

    @EventListener
    public fun handleWebSocketConnectListener(event: SessionConnectedEvent) {
        logger.info("Received a new web socket connection");
    }

    @EventListener
    public fun handleWebSocketDisconnectListener(event: SessionDisconnectEvent) {
        val headerAccessor = StompHeaderAccessor.wrap(event.message)
        val username = headerAccessor.sessionAttributes!!["username"] as String?
        username?.let {
            logger.info("User Disconnected : $it")

            val chatMessage = ChatMessage(ChatMessage.MessageType.LEAVE, null, it)
            messagingTemplate.convertAndSend("/topic/public", chatMessage)
        }
    }
}