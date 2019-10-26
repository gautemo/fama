package app.gaute.fama


import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import com.google.firebase.Timestamp
import com.google.firebase.firestore.DocumentChange
import com.google.firebase.firestore.FirebaseFirestore
import java.time.Duration
import java.time.Instant
import java.util.*

/**
 * A simple [Fragment] subclass.
 */
class Home : Fragment() {
    val db = FirebaseFirestore.getInstance()
    val posts = mutableMapOf<String, Post>()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_home, container, false)

        v.findViewById<Button>(R.id.toAdd).setOnClickListener {
            (activity as MainActivity).goTo(MainActivity.Screen.ADD)
        }

        return v
    }

    override fun onStart() {
        super.onStart()

        val twoDaysAgo = Date.from(Instant.now().minus(Duration.ofDays(2)))

        db.collection("posts")
            .whereGreaterThan("timestamp", Timestamp(twoDaysAgo))
            .addSnapshotListener { value, e ->
                if (e != null) {
                    Log.w("HOME", "Listen failed.", e)
                    return@addSnapshotListener
                }

                for (doc in value!!.documentChanges) {
                    when(doc.type){
                        DocumentChange.Type.ADDED, DocumentChange.Type.MODIFIED -> {
                            val post = doc.document.toObject(Post::class.java)
                            posts[doc.document.id] = post
                        }
                        DocumentChange.Type.REMOVED -> {
                            posts.remove(doc.document.id)
                        }
                    }
                }
                updateUI()
            }
    }

    private fun updateUI() {
        val sorted = posts.filter { it.value.timestamp != null }.toList().sortedByDescending { (_, value) ->
            (value.timestamp!!.seconds / 3600) + value.likes + value.comments
        }.toMap()

        view?.let {
            val linear = it.findViewById<LinearLayout>(R.id.posts)
            linear.removeAllViews()

            for(p in sorted){
                val tv = TextView(context)
                tv.text = p.value.text
                linear.addView(tv)
            }
        }
    }

}
