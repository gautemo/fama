package app.gaute.fama

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentTransaction
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.remoteconfig.FirebaseRemoteConfig
import com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings

class MainActivity : AppCompatActivity() {
    var screen = Screen.HOME
    private lateinit var auth: FirebaseAuth
    private lateinit var firebaseAnalytics: FirebaseAnalytics
    lateinit var remoteConfig: FirebaseRemoteConfig

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        firebaseAnalytics = FirebaseAnalytics.getInstance(this)
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

        remoteConfig = FirebaseRemoteConfig.getInstance()
        val configSettings = FirebaseRemoteConfigSettings.Builder()
            .setMinimumFetchIntervalInSeconds(3600)
            .build()
        remoteConfig.setConfigSettingsAsync(configSettings)
        remoteConfig.setDefaultsAsync(R.xml.remote_config_defaults)
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

    fun logEvent(event: String){
        firebaseAnalytics.logEvent(event, null)
    }

    inline fun FragmentManager.inTransaction(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().addToBackStack(null).func().commit()
    }

    inline fun FragmentManager.inTransactionDirect(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().func().commit()
    }

    override fun onStart() {
        super.onStart()
        testRemote()
    }

    fun testRemote(){
        remoteConfig.fetchAndActivate()
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Toast.makeText(this, "Fetch and activate succeeded",
                        Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this, "Fetch failed",
                        Toast.LENGTH_SHORT).show()
                }
                displayRemote()
            }
    }

    fun displayRemote(){
        val value = remoteConfig.getBoolean("upload_photos")
        Toast.makeText(this, "upload_photos: $value", Toast.LENGTH_LONG).show()
    }

    enum class Screen{
        HOME, PROFILE, ADD, POST
    }
}
