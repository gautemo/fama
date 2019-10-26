package app.gaute.fama

import com.google.firebase.Timestamp
import com.google.firebase.firestore.ServerTimestamp

data class Post (
    val text: String? = null,
    @ServerTimestamp val timestamp: Timestamp? = null,
    var likes: Int = 0,
    var reports: Int = 0,
    var comments: Int = 0,
    val imgPath: String? = null
)