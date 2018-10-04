package main.com.pobox;

import android.annotation.SuppressLint;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;

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

        /*
        String htmlFilename = "index.html";
        AssetManager assetManager = getBaseContext().getAssets();
        try {
            InputStream inputStream = assetManager.open(htmlFilename, AssetManager.ACCESS_BUFFER);
            String htmlContentInStringFormat = StreamToString(inputStream);
            inputStream.close();
            webView.loadDataWithBaseURL(null, htmlContentInStringFormat, "text/html", "utf-8", null);
        } catch (IOException e) {
            e.printStackTrace();
        }
        */

        webView.loadUrl("file:///android_asset/index.html");
        //webView.loadUrl("file:///android_asset/bio10.html");
    }

    public static String StreamToString(InputStream inputStream) throws IOException {
        if (inputStream == null) {
            return "";
        } else {
            Writer writer = new StringWriter();
            char[] buffer = new char[1024];
            Reader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
            int n;
            while ((n = reader.read(buffer)) != -1) {
                writer.write(buffer, 0, n);
            }
            return writer.toString();
        }
    }
}
