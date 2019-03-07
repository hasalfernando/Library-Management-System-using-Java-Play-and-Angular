package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.DateTime;
import models.Book;
import models.Dvd;
import models.Reader;
import play.mvc.Controller;
import services.LibraryManager;
import services.WestminsterLibraryManager;
import play.libs.Json;
import play.mvc.*;

/**This controller controls all the actions involving a reader in it**/

public class ReaderController extends Controller {

    //To add a borrower for a book
    public Result borrowBook(){

        //To receive the body of the POST request sent from the front end
        JsonNode borrowBook = request().body().asJson();

        try { //Check whether reader id is valid

            Reader reader = Reader.find.byId(borrowBook.get("borrowBookCurReaderID").asInt());
            System.out.println(reader.getId());

            try { //Check whether the book isbn is valid

                Book book = Book.find.byId(borrowBook.get("borrowBookIsbn").asLong());

                if (book.getBorDate() == null) { //Check whether the book is already borrowed

                    LibraryManager manager = new WestminsterLibraryManager();
                    DateTime borDate = new DateTime(borrowBook.get("borrowBookBorDate").asText(), borrowBook.get("borrowBookBorTime").asText());
                    manager.addBorrower(book, reader, borDate); //add the borrower using the WestminsterLibraryManager

                    JsonNode jsonNode = Json.toJson("Book borrowed successfully");
                    return ok(jsonNode).as("application/json");
                }
                else { //Send the message to the frontend saying that the book is currently borrowed

                    JsonNode jsonNode = Json.toJson("Book is currently borrowed");
                    return ok(jsonNode).as("application/json");
                }

            }
            catch (NullPointerException ex) { //Send the message to the frontend to show its an invalid isbn

                JsonNode jsonNode = Json.toJson("No book in the library has that ISBN");
                return ok(jsonNode).as("application/json");
            }

        }
        catch (NullPointerException ex) { //Send the message to the frontend to show its an invalid reader id

            JsonNode jsonNode = Json.toJson("No user in the library system has that Id");
            return ok(jsonNode).as("application/json");
        }
    }

    //To add a borrower for the dvd
    public Result borrowDvd(){

        //To receive the body of the POST request sent from the front end
        JsonNode borrowDvd = request().body().asJson();

        try {

            Reader reader = Reader.find.byId(borrowDvd.get("borrowDvdCurReaderID").asInt());
            System.out.println(reader.getId());
            try {

                Dvd dvd = Dvd.find.byId(borrowDvd.get("borrowDvdBarcode").asLong());

                if (dvd.getBorDate() == null) { //Check whether the dvd is already borrowed

                    LibraryManager manager = new WestminsterLibraryManager();
                    DateTime borDate = new DateTime(borrowDvd.get("borrowDvdBorDate").asText(), borrowDvd.get("borrowDvdBorTime").asText());
                    manager.addBorrower(dvd, reader, borDate);

                    JsonNode jsonNode = Json.toJson("Dvd borrowed successfully");
                    return ok(jsonNode).as("application/json");
                }
                else { //Send the message to the front end saying the dvd is currently borrowed

                    JsonNode jsonNode = Json.toJson("Dvd is currently borrowed");
                    return ok(jsonNode).as("application/json");
                }
            }
            catch (NullPointerException ex) { //Send the message to the frontend to show its an invalid dvd barcode

                JsonNode jsonNode = Json.toJson("No dvd in the library has that Barcode");
                return ok(jsonNode).as("application/json");
            }
        }
        catch (NullPointerException ex) { //Send the message to the frontend to show its an invalid reader id

            JsonNode jsonNode = Json.toJson("No user in the library system has that Id");
            return ok(jsonNode).as("application/json");
        }

    }

    //To return a borrowed book
    public Result returnBook(){

        //Receive the POST request from the frontend carrying information about the returning book
        JsonNode returnBook = request().body().asJson();

        try {

            //Check if there is a book with that isbn
            Book book = Book.find.byId(returnBook.get("returnBookIsbn").asLong());

            if(book.getBorDate()!=null) { //If the book is not borrowed for the moment
                LibraryManager manager = new WestminsterLibraryManager();
                String penaltyFee = manager.returnItem(book, returnBook.get("returnBookRetDate").asText(), returnBook.get("returnBookRetTime").asText());

                JsonNode jsonNode = Json.toJson(penaltyFee);
                return ok(jsonNode).as("application/json");
            }
            else{ //Send message to the frontend saying the book is not borrowed for the moment
                JsonNode jsonNode = Json.toJson("This book is not currently borrowed");
                return ok(jsonNode).as("application/json");
            }
        }
        catch (NullPointerException ex){ //Send the message to the frontend to show that its an invalid isbn
            JsonNode jsonNode = Json.toJson("There is no book with that isbn in the library");
            return ok(jsonNode).as("application/json");
        }
    }


    //To return a borrowed dvd by the user
    public Result returnDvd(){

        //Receive the POST request from the frontend carrying information about the returning dvd
        JsonNode returnDvd = request().body().asJson();

        try {

            //Check whether the barcode is valid
            Dvd dvd = Dvd.find.byId(returnDvd.get("returnDvdBarcode").asLong());

            if(dvd.getBorDate()!=null) {
                LibraryManager manager = new WestminsterLibraryManager();
                String penaltyFee = manager.returnItem(dvd, returnDvd.get("returnDvdRetDate").asText(), returnDvd.get("returnDvdRetTime").asText());

                JsonNode jsonNode = Json.toJson(penaltyFee);
                return ok(jsonNode).as("application/json");
            }
            else { //Send message to the frontend saying the dvd is not borrowed for the moment
                JsonNode jsonNode = Json.toJson("This dvd is not currently borrowed");
                return ok(jsonNode).as("application/json");
            }
        }
        catch (NullPointerException ex){ //Send the message to the frontend to show that its an invalid barcode
            JsonNode jsonNode = Json.toJson("There is no dvd with that barcode in the library");
            return ok(jsonNode).as("application/json");
        }

    }

    //To check the booked till date of an unavailable book for a reservation
    public Result reserveBookInfo(){

        JsonNode reserveBookInfo = request().body().asJson();

        try { //Check whether it is a valid isbn
            Book book = Book.find.byId(reserveBookInfo.get("reserveBookIsbn").asLong());

            if(book.getBorDate()!=null) { //Check whether the book is borrowed

                String bookedTillDate = book.getBookedTillDate();

                JsonNode jsonNode = Json.toJson("The book is approximately booked till : " + bookedTillDate + ".\nReserve for 7 days after that ?");
                return ok(jsonNode).as("application/json");
            }
            else{
                JsonNode jsonNode = Json.toJson("This book is currently available");
                return ok(jsonNode).as("application/json");
            }
        }
        catch (NullPointerException ex){ //Send the message to the frontend to show that its an invalid isbn

            JsonNode jsonNode = Json.toJson("There is no book with that isbn in the library");
            return ok(jsonNode).as("application/json");
        }


    }

    //To confirm a reservation for a book
    public Result confirmReserveBookInfo(){

        JsonNode reserveBookInfo = request().body().asJson();

        try { //Check whether it is a valid isbn
            Book book = Book.find.byId(reserveBookInfo.get("reserveBookIsbn").asLong());

            LibraryManager libraryManager = new WestminsterLibraryManager();
            String message = libraryManager.reserveItem(book);

            JsonNode jsonNode = Json.toJson(message);
            return ok(jsonNode).as("application/json");
        }
        catch (NullPointerException ex){ //Send the message to the frontend to show that its an invalid isbn

            JsonNode jsonNode = Json.toJson("There is no book with that isbn in the library");
            return ok(jsonNode).as("application/json");
        }
   }

    public Result reserveDvdInfo(){

        JsonNode reserveBookInfo = request().body().asJson();

        try { //confirm whether it is a valid barcode
            Dvd dvd = Dvd.find.byId(reserveBookInfo.get("reserveDvdBarcode").asLong());

            if(dvd.getBorDate()!=null) {
                String bookedTillDate = dvd.getBookedTillDate();

                JsonNode jsonNode = Json.toJson("The dvd is approximately booked till : " + bookedTillDate + ".\nReserve for 3 days after that ?");
                return ok(jsonNode).as("application/json");
            }
            else{
                JsonNode jsonNode = Json.toJson("This dvd is currently available");
                return ok(jsonNode).as("application/json");
            }
        }
        catch (NullPointerException ex){ //Send the message to the frontend to show that its an invalid isbn

            JsonNode jsonNode = Json.toJson("There is no dvd with that barcode in the library");
            return ok(jsonNode).as("application/json");
        }
    }

    //To confirm a reservation for a book
    public Result confirmReserveDvdInfo(){

        JsonNode reserveDvdInfo = request().body().asJson();

        try { //Check whether it is a valid isbn
            Dvd dvd = Dvd.find.byId(reserveDvdInfo.get("reserveDvdBarcode").asLong());

            LibraryManager libraryManager = new WestminsterLibraryManager();
            String message = libraryManager.reserveItem(dvd);

            JsonNode jsonNode = Json.toJson(message);
            return ok(jsonNode).as("application/json");
        }
        catch (NullPointerException ex){ //Send the message to the frontend to show that its an invalid isbn

            JsonNode jsonNode = Json.toJson("There is no dvd with that barcode in the library");
            return ok(jsonNode).as("application/json");
        }
    }

    //Add a new reader to the system
    public Result register() {

        JsonNode readerBody = request().body().asJson();

        LibraryManager libraryManager = new WestminsterLibraryManager();

        String message = libraryManager.addReader(readerBody.get("readerId").asInt(),readerBody.get("readerName").asText(),readerBody.get("mobile").asInt(),readerBody.get("email").asText());
        JsonNode jsonNode = Json.toJson(message);
        return ok(jsonNode).as("application/json");

    }


}
