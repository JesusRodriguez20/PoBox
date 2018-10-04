package main.com.pobox;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class ActivityMain extends AppCompatActivity {
    WebView webView;
    WebSettings webSetting;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setTheme(R.style.AppTheme);
        this.setContentView(R.layout.activity_main);

        webView = findViewById(R.id.activity_main_WebView);
        webSetting = webView.getSettings();
        webSetting.setJavaScriptEnabled(true);
        webSetting.setDisplayZoomControls(true);

        webView.loadUrl("file:///android_asset/Pobox/Login.html");
    }
}
