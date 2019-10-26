package app.gaute.fama


import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.google.firebase.firestore.DocumentChange
import com.google.firebase.firestore.FirebaseFirestore

/**
 * A simple [Fragment] subclass.
 */
class Home : Fragment() {
    val db = FirebaseFirestore.getInstance()
    val posts = mutableMapOf<String, Post>()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onStart() {
        super.onStart()

        db.collection("posts")
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
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}
