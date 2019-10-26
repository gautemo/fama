package app.gaute.fama

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import com.google.firebase.auth.FirebaseAuth

class MainActivity : AppCompatActivity() {
    var screen = Screen.HOME
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        auth = FirebaseAuth.getInstance()
        auth.signInAnonymously()
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    supportFragmentManager.inTransactionDirect { add(R.id.frame, Home()) }
                } else {
                    Toast.makeText(baseContext, "Authentication failed.", Toast.LENGTH_SHORT).show()
                }
            }

        findViewById<Button>(R.id.socialButton).setOnClickListener { goTo(Screen.HOME) }
        findViewById<Button>(R.id.profileButton).setOnClickListener { goTo(Screen.PROFILE) }
    }

    fun goTo(to: Screen, postId: String = ""){
        if(to != screen){
            when(to){
                Screen.HOME -> supportFragmentManager.inTransaction { add(R.id.frame, Home()) }
                Screen.PROFILE -> supportFragmentManager.inTransaction { add(R.id.frame, Profile()) }
                Screen.ADD -> supportFragmentManager.inTransaction { add(R.id.frame, AddPost()) }
                Screen.POST -> {
                    if(screen == Screen.ADD) {
                        supportFragmentManager.popBackStack()
                    }
                    supportFragmentManager.inTransaction {
                        val fragment = PostView()
                        fragment.postId = postId
                        add(R.id.frame, fragment)
                    }
                }
            }
            screen = to
        }
    }

    inline fun FragmentManager.inTransaction(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().addToBackStack(null).func().commit()
    }

    inline fun FragmentManager.inTransactionDirect(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().func().commit()
    }

    enum class Screen{
        HOME, PROFILE, ADD, POST
    }
}
