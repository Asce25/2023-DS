package com.asce;

import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello World - JEAN MORENO DESAROLLO DE SOFTWARE ");
    }
}
