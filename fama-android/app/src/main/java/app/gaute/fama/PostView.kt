package app.gaute.fama


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.google.firebase.firestore.FirebaseFirestore

/**
 * A simple [Fragment] subclass.
 */
class PostView : Fragment() {
    var postId = ""

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_post_view, container, false)
    }

    override fun onStart() {
        super.onStart()

        FirebaseFirestore.getInstance().collection("posts").document(postId).get()
            .addOnSuccessListener {
                val post = it.toObject(Post::class.java)
                view?.findViewById<TextView>(R.id.postText)?.text = post?.text
            }
    }
}
