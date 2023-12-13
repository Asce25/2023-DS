package com.semestral;

import static spark.Spark.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.Scanner;

public class App {
    private static final String PIRAMIDES_DIRECTORY = "piramides";
    private static final String DATABASE_URL = "jdbc:sqlite:piramides.db";

    public static void main(String[] args) {
        staticFiles.location("/public");

        // Crear tabla en la base de datos si no existe
        try (Connection connection = DriverManager.getConnection(DATABASE_URL)) {
            Statement statement = connection.createStatement();
            statement.execute("CREATE TABLE IF NOT EXISTS piramides (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "ruta TEXT," +
                    "suma INTEGER);");
        } catch (SQLException e) {
            e.printStackTrace();
        }

        get("/semestralds", (request, response) -> {
            int[][] piramideArray = generarPiramide(5); // Cambia el tamaño según sea necesario

            // Guardar la pirámide en la base de datos y obtener el ID generado
            int piramideId = guardarPiramideEnBaseDeDatos(piramideArray);

            // Renderizar el archivo HTML con la pirámide y la información de la base de datos
            return renderContent("/public/index.html", piramideArray, piramideId);
        });
    }

    private static Object renderContent(String path, int[][] piramideArray, int piramideId) {
        try (InputStream stream = App.class.getResourceAsStream(path)) {
            if (stream != null) {
                try (Scanner scanner = new Scanner(stream, StandardCharsets.UTF_8.name())) {
                    String content = scanner.useDelimiter("\\A").next();
                    content = content.replace("$PIRAMIDE_ARRAY$", convertirPiramideAString(piramideArray));
                    content = content.replace("$PIRAMIDE_ID$", String.valueOf(piramideId));
                    return content;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Error al renderizar contenido.";
    }

    private static String convertirPiramideAString(int[][] piramideArray) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int[] fila : piramideArray) {
            for (int valor : fila) {
                stringBuilder.append(valor).append(" ");
            }
            stringBuilder.append("<br>"); // Agrega un salto de línea HTML para una mejor visualización
        }
        return stringBuilder.toString();
    }

    private static int[][] generarPiramide(int niveles) {
        // Lógica para generar la pirámide según tu implementación actual
        // ...

        // Aquí se retorna un ejemplo simple
        int[][] piramideArray = new int[niveles][];
        for (int i = 0; i < niveles; i++) {
            piramideArray[i] = new int[i + 1];
            for (int j = 0; j <= i; j++) {
                piramideArray[i][j] = i + j;
            }
        }

        return piramideArray;
    }

    private static int guardarPiramideEnBaseDeDatos(int[][] piramideArray) {
        int piramideId = -1;

        try (Connection connection = DriverManager.getConnection(DATABASE_URL);
             PreparedStatement statement = connection.prepareStatement("INSERT INTO piramides (ruta, suma) VALUES (?, ?);", Statement.RETURN_GENERATED_KEYS)) {

            // Calcular la ruta y suma de la pirámide
            ResultadoPiramide resultado = calcularRutaMasAlta(piramideArray);

            // Guardar la información en la base de datos
            statement.setString(1, resultado.ruta.toString());
            statement.setInt(2, resultado.suma);

            statement.executeUpdate();

            // Obtener el ID generado
            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                piramideId = generatedKeys.getInt(1);
            }

            // Resaltar la mejor ruta
            resaltarMejorRuta(resultado.ruta, piramideArray);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return piramideId;
    }

    private static ResultadoPiramide calcularRutaMasAlta(int[][] niveles) {
      
        int mejorSuma = 0;
        Ruta mejorRuta = new Ruta();
        for (int nivel = niveles.length - 1; nivel >= 0; nivel--) {
            .
        }

        return new ResultadoPiramide(mejorRuta, mejorSuma);
    }

    private static void resaltarMejorRuta(Ruta ruta, int[][] piramideArray) {
       
    }

    private static class ResultadoPiramide {
        Ruta ruta;
        int suma;

        ResultadoPiramide(Ruta ruta, int suma) {
            this.ruta = ruta;
            this.suma = suma;
        }
    }

    private static class Ruta {
      
    }
}




