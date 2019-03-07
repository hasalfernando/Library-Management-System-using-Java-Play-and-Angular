package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Book;
import models.DateTime;
import io.ebean.Ebean;
import models.Dvd;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.LibraryManager;
import services.WestminsterLibraryManager;

public class DvdController extends Controller {

    //Add a dvd to the library database
    public Result addDvd() {

        JsonNode dvdBody = request().body().asJson();
        LibraryManager libraryManager = new WestminsterLibraryManager();

        long isbn = dvdBody.get("dBarcode").asLong();
        DateTime pubDate = new DateTime(dvdBody.get("dPubDate").asText());
        String message = libraryManager.addDvd(isbn,dvdBody.get("dTitle").asText(),dvdBody.get("dSector").asText(),pubDate,dvdBody.get("dProducer").asText(),dvdBody.get("dActor").asText(),dvdBody.get("dLanguages").asText(),dvdBody.get("dSubs").asText());

        JsonNode jsonNode = Json.toJson(message);
        return ok(jsonNode).as("application/json");
    }

    //Remove a dvd from the library database
    public Result removeDvd() {

        JsonNode dvdBody = request().body().asJson();
        LibraryManager libraryManager = new WestminsterLibraryManager();

        long barcode = dvdBody.get("rDvdBarcode").asLong();
        String message = libraryManager.removeDvd(barcode);

        JsonNode jsonNode = Json.toJson(message);
        return ok(jsonNode).as("application/json");
    }

    //Get the number of dvds in the library
    public Result getDvdCols() {

        int count = Ebean.find(Dvd.class).findCount();
        JsonNode jsonNode = Json.toJson(Integer.toString(count));
        return ok(jsonNode).as("application/json");

    }




}
