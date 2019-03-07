package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.DateTime;
import io.ebean.Ebean;
import models.Book;
import play.libs.Json;
import play.mvc.*;
import services.LibraryManager;
import services.WestminsterLibraryManager;

public class BookController extends Controller{

    //Add a book to the library database
    public Result addBook() {

        JsonNode bookBody = request().body().asJson();
        LibraryManager libraryManager = new WestminsterLibraryManager();

        long isbn = bookBody.get("bIsbn").asLong();
        DateTime pubDate = new DateTime(bookBody.get("bPubDate").asText());
        String message = libraryManager.addBook(isbn,bookBody.get("bTitle").asText(),bookBody.get("bSector").asText(),pubDate,bookBody.get("bAuthor").asText());

        JsonNode jsonNode = Json.toJson(message);
        return ok(jsonNode).as("application/json");
    }

    //Remove book from the library database
    public Result removeBook() {

        JsonNode bookBody = request().body().asJson();
        LibraryManager libraryManager = new WestminsterLibraryManager();

        long isbn = bookBody.get("rBookIsbn").asLong();
        String message = libraryManager.removeBook(isbn);

        JsonNode jsonNode = Json.toJson(message);
        return ok(jsonNode).as("application/json");
    }

    //Get the number of books in the database
    public Result getBookCols() {

        int count = Ebean.find(Book.class).findCount();
        JsonNode jsonNode = Json.toJson(Integer.toString(count));
        return ok(jsonNode).as("application/json");
    }

}
