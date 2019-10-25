package app.gaute.fama

import com.google.firebase.Timestamp

data class Post (
    val text: String? = null,
    val timestamp: Timestamp? = null,
    var likes: Int = 0,
    var reports: Int = 0,
    var comments: Int = 0,
    val imgPath: String? = null
)