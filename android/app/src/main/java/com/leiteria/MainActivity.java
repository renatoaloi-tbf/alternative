package com.leiteria;

import android.os.Bundle;
import com.reactnativenavigation.controllers.SplashActivity;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import android.view.Gravity;
import android.widget.LinearLayout;
import android.support.v4.content.ContextCompat;

public class MainActivity extends SplashActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    @Override
    public LinearLayout createSplashLayout() {
        final float scale = getResources().getDisplayMetrics().density;
        LinearLayout view = new LinearLayout(this);
        view.setBackground(ContextCompat.getDrawable(this, R.drawable.screen));
        return view;
    }
}
