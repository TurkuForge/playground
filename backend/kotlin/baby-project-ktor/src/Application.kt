package the.turku.forge

import com.google.gson.Gson
import io.ktor.application.*
import io.ktor.gson.*
import io.ktor.http.cio.websocket.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.websocket.*
import kotlinx.coroutines.isActive
import java.io.File
import java.time.Duration

fun main(args: Array<String>): Unit = io.ktor.server.tomcat.EngineMain.main(args)

var wsConnections = HashSet<DefaultWebSocketServerSession>()

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }

    routing {
        get("/") {
            val file = File("resources/static/index.html")
            call.respondFile(file)
        }

        post("/api/message") {
            val message: String = call.receive<String>()
            wsConnections.forEach {
                if( it.isActive ) {
                    it.send( message )
                }
            }
            call.respondText("")
        }

        webSocket("/api/ws") {
            wsConnections.add( this )
            for (frame in incoming) {
                if ( !this.isActive ) {
                    close(CloseReason(CloseReason.Codes.NORMAL, "Not active any more"))
                }
            }
        }
    }
}

