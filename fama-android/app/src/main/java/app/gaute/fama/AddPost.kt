package app.gaute.fama


import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import com.google.firebase.Timestamp
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore

/**
 * A simple [Fragment] subclass.
 */
class AddPost : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_add_post, container, false)

        v.findViewById<Button>(R.id.addPostButton).setOnClickListener {
            val text = v.findViewById<EditText>(R.id.addPostText).text.toString()
            val post = Post(text)

            FirebaseFirestore.getInstance().collection("posts").add(post)
                .addOnSuccessListener {
                    (activity as MainActivity).goTo(MainActivity.Screen.POST, it.id)
                }
                .addOnFailureListener {e ->
                    Log.w("AddPost", "Error adding document", e)
                }

        }

        return v
    }

}
