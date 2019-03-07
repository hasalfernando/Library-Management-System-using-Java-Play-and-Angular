package services;

import com.fasterxml.jackson.databind.JsonNode;
import models.*;

import java.util.List;

public interface LibraryManager {

    //Interface methods

    String addBook(long id, String name, String section, DateTime pubDate,String author);
    String addDvd(long id, String name, String section, DateTime pubDate,String producer,String actor,String languages,String subtitles);

    String removeBook(long id);
    String removeDvd(long id);

    String addReader(int id, String name, int mobile, String email);
    void addBorrower(Book book, Reader reader, DateTime borDate);
    void addBorrower(Dvd dvd, Reader reader, DateTime borDate);

    String returnItem(Book book,String returningDate, String returningTime);
    String returnItem(Dvd dvd,String returningDate, String returningTime);

    List<LibraryItem> generateReport(JsonNode dateBody);

    String reserveItem(Book book);
    String reserveItem(Dvd dvd);
}
