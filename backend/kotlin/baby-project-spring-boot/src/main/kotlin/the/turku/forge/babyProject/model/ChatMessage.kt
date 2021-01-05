package the.turku.forge.babyProject.model

class ChatMessage(
    val type: MessageType,
    val content: String?,
    val sender: String ) {

    public enum class MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
}