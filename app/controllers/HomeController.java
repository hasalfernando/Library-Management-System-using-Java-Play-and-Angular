package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.LibraryItem;
import play.libs.Json;
import play.mvc.*;
import services.*;

import java.util.List;

public class HomeController extends Controller {

    //Get all the library items
    public Result getAllItems(){

        List<LibraryItem> allItems = LibraryItem.find.all();

        return ok(Json.toJson(allItems)).as("application/json");
    }

    //Get all the overdue items sorted in the descending order according to the due date
    public Result getOverdueItems(){

        JsonNode dateBody = request().body().asJson();
        LibraryManager libraryManager = new WestminsterLibraryManager();
        List<LibraryItem> overDueItems = libraryManager.generateReport(dateBody);
        return ok(Json.toJson(overDueItems)).as("application/json");
    }

}
