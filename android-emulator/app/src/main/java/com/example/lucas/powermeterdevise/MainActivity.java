package com.example.lucas.powermeterdevise;

import android.content.DialogInterface;
import android.os.Handler;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class  MainActivity extends AppCompatActivity {
    EditText url;
    EditText mensuration;
    Button button_send_mensurations;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initialize_view_components();
        button_click();
    }

    public void initialize_view_components() {
        button_send_mensurations = (Button) findViewById(R.id.button);
        mensuration = (EditText) findViewById(R.id.editText2);
        url = (EditText) findViewById(R.id.editText3);
    }

    private void button_click() {
        button_send_mensurations.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) { request_mensurations(v); }
        });
    }

    private String mensuration() {
        // if(no_lleno_EditText)
        if(mensuration.getText().toString().trim().length() == 0){ return "Empty mensuration"; }
        else{ return mensuration.getText().toString(); }
    }

    private String url(){
        // if(no_lleno_EditText)
        if(url.getText().toString().trim().length() == 0){ return "Incomplete"; }
        else{ return url.getText().toString(); }
    }

    private void request_mensurations(View v){
        DialogInterface.OnClickListener dialogClickListener = new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                switch (which){
                    case DialogInterface.BUTTON_POSITIVE:
                        send_mensurations_to_url();
                        Toast.makeText(MainActivity.this, "Enviando", Toast.LENGTH_SHORT).show();
                        break;

                    case DialogInterface.BUTTON_NEGATIVE:
                        Toast.makeText(MainActivity.this, "Cancelado", Toast.LENGTH_SHORT).show();
                        break;
                }
            }
        };

        AlertDialog.Builder builder = new AlertDialog.Builder(v.getContext());
        builder.setTitle("Confirmar operacion");
        builder.setMessage("Desea enviar mediciones con el valor" + mensuration.toString() + " a la URL:" + url)
                .setPositiveButton("OK", dialogClickListener)
                .setNegativeButton("NO", dialogClickListener)
                .show();
    }

    private void send_mensurations_to_url(){
        new Handler().postDelayed(
                new Runnable() { public void run() { CallAPI.requestHttp(url(), mensuration()); } },
                1000
        );
    }
}
