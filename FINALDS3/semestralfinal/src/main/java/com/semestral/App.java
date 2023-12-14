package com.semestral;

import static spark.Spark.*;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        // Configura el directorio de recursos estáticos
        staticFiles.location("/public");

        get("/semestralds", (request, response) -> {
            return renderContent("/public/index.html");
        });
    }

    private static Object renderContent(String path) {
        try (InputStream stream = App.class.getResourceAsStream(path)) {
            if (stream != null) {
                try (Scanner scanner = new Scanner(stream, StandardCharsets.UTF_8.name())) {
                    return scanner.useDelimiter("\\A").next();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al renderizar contenido. Consulta los registros para obtener más detalles.";
        }
        return "Error al renderizar contenido.";
    }
}