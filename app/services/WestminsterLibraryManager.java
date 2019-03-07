package services;

import com.fasterxml.jackson.databind.JsonNode;
import io.ebean.DuplicateKeyException;
import models.*;
import io.ebean.Ebean;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

public class WestminsterLibraryManager implements LibraryManager {

    private int lateHours = 0;
    private List<LibraryItem> allItems = new ArrayList<>();
    private List<LibraryItem> dueItems = new ArrayList<>();
    private List<LibraryItem> overDueItems = new ArrayList<>();
    private List<Integer> gapList = new ArrayList<>();

    //Add a new book to the database
    @Override
    public String addBook(long id, String name, String section, DateTime pubDate,String author) {

        Book book = new Book();
        try {
            book.setId(id);
            book.setName(name);
            book.setType("Book");
            book.setSection(section);
            book.setPubDate(pubDate.getDate());
            book.setAuthor(author);
            Ebean.save(book);
            return "Record Entered successfully";
        } catch (DuplicateKeyException e) {
            return "Duplicate ISBN entry !";
        }
    }

    //Add a new dvd to the database
    @Override
    public String addDvd(long id, String name, String section, DateTime pubDate, String producer, String actor, String languages, String subtitles) {

        Dvd dvd = new Dvd();
        try {
            dvd.setId(id);
            dvd.setName(name);
            dvd.setType("Dvd");
            dvd.setSection(section);
            dvd.setPubDate(pubDate.getDate());
            dvd.setProducer(producer);
            dvd.setActor(actor);
            dvd.setLanguages(languages);
            dvd.setSubtitles(subtitles);
            Ebean.save(dvd);
            return "Record Entered successfully";
        }
        catch (DuplicateKeyException e) {
            return "Duplicate Barcode entry !";
        }
    }

    //Remove a book from the database
    @Override
    public String removeBook(long id) {

        try {
            Book book = Book.find.byId(id);
            Ebean.delete(book);
            return "Book deleted successfully";
        }
        catch (IllegalArgumentException ex){
            return "No book in the library has that ISBN";
        }
    }

    //Remove a dvd from the database
    @Override
    public String removeDvd(long id) {

        try {
            Dvd dvd = Dvd.find.byId(id);
            Ebean.delete(dvd);
            return "Dvd deleted successfully";
        }
        catch (IllegalArgumentException ex){
            return "No dvd in the library has that Barcode";
        }
    }

    //Add a new reader to the library system
    @Override
    public String addReader(int id, String name, int mobile, String email) {
        try {
            Reader reader = new Reader();
            reader.setId(id);
            reader.setName(name);
            reader.setMob(mobile);
            reader.setEmail(email);
            Ebean.save(reader);
            return "User Added !";
        }
        catch (DuplicateKeyException e) {
            return "User Id already exists !";
        }
    }

    //Add a borrower for a book
    @Override
    public void addBorrower(Book book, Reader reader, DateTime borDate) {

        book.setReader(reader);
        book.setBorDate(borDate.getDate());
        book.setBorTime(borDate.getTime());
        book.setDueDate(borDate.getDueDate(7));
        book.setBorrowedTimes(book.getBorrowedTimes()+1);

        //If the book is being borrowed for the first time
        if(book.getBorrowedTimes()==1) {
            book.setAverageKeepingDays(7);
            book.setBookedTillDate(book.getDueDate());
        }
        else {
            book.setBookedTillDate(borDate.getDueDate(book.getAverageKeepingDays()));
        }
        Ebean.save(book);
        Ebean.save(reader);
    }

    //Add a borrower for a dvd
    @Override
    public void addBorrower(Dvd dvd, Reader reader, DateTime borDate) {
        dvd.setReader(reader);
        dvd.setBorDate(borDate.getDate());
        dvd.setBorTime(borDate.getTime());
        dvd.setDueDate(borDate.getDueDate(3));
        dvd.setBorrowedTimes(dvd.getBorrowedTimes()+1);

        //If the dvd is being borrowed for the first time
        if(dvd.getBorrowedTimes()==1) {
            dvd.setAverageKeepingDays(3);
            dvd.setBookedTillDate(dvd.getDueDate());
        }
        else {
            dvd.setBookedTillDate(borDate.getDueDate(dvd.getAverageKeepingDays()));
        }
        Ebean.save(dvd);
        Ebean.save(reader);
    }

    //Return a book
    @Override
    public String returnItem(Book book,String returningDate, String returningTime) {

        int keptHours = 0;
        double bookPenaltyFee = 0;

        String bookDueDate = book.getDueDate();
        String bookDueTime = book.getBorTime();

        keptHours = new DateTime(book.getBorDate(),book.getBorTime(),returningDate,returningTime).getLateHours();

        book.setKeptForTime(book.getKeptForTime()+keptHours);
        book.setAverageKeepingDays(book.getKeptForTime()/24);


        bookPenaltyFee = generatePenalty(bookDueDate,bookDueTime,returningDate,returningTime);

        book.setReader(null);
        book.setBorDate(null);
        book.setBorTime(null);
        book.setDueDate(null);
        Ebean.save(book);

        if(bookPenaltyFee==0.0) {
            return "Book returned within the given time. Well done !";
        }
        else{
            DecimalFormat df = new DecimalFormat("#.00");
            return "Book submitted after "+ this.lateHours+" Hours. \nPenalty Fee = £ "+df.format(bookPenaltyFee);
        }
    }

    //Generate penalty for late submissions
    private double generatePenalty(String dueDate, String dueTime, String retDate, String retTime) {

        double penaltyFee= 0;

        this.lateHours = new DateTime(dueDate,dueTime,retDate,retTime).getLateHours();

        if(this.lateHours>72){
            penaltyFee = (72*0.2) + ((this.lateHours-72)*0.5);
        }
        else if(this.lateHours>0){
            penaltyFee = this.lateHours*0.2;
        }
        else{
            penaltyFee= 0;
        }

        return penaltyFee;
    }

    //Return dvd
    @Override
    public String returnItem(Dvd dvd,String returningDate, String returningTime) {

        int keptHours = 0;
        double dvdPenaltyFee = 0;

        String dvdDueDate = dvd.getDueDate();
        String dvdDueTime = dvd.getBorTime();

        keptHours = new DateTime(dvd.getBorDate(),dvd.getBorTime(),returningDate,returningTime).getLateHours();

        dvd.setKeptForTime(dvd.getKeptForTime()+keptHours);
        dvd.setAverageKeepingDays(dvd.getKeptForTime()/24);

        dvdPenaltyFee = generatePenalty(dvdDueDate,dvdDueTime,returningDate,returningTime);

        dvd.setReader(null);
        dvd.setBorDate(null);
        dvd.setBorTime(null);
        dvd.setDueDate(null);
        Ebean.save(dvd);

        if(dvdPenaltyFee==0.0) {
            return "Dvd returned within the given time. Well done !";
        }
        else{
            DecimalFormat df = new DecimalFormat("#.00");
            return "Dvd submitted after "+ this.lateHours+" Hours. \nPenalty Fee = £ "+df.format(dvdPenaltyFee);
        }
    }

    //Generate a report of overdue items
    @Override
    public List<LibraryItem> generateReport(JsonNode dateBody) {

        allItems = LibraryItem.find.all();

        for(int i = 0; i<allItems.size(); i++){
            if(allItems.get(i).getDueDate() != null){
                dueItems.add(allItems.get(i));
            }
        }

        for(int i = 0; i<dueItems.size(); i++){
            gapList.add(i,new DateTime(dueItems.get(i).getDueDate(),dueItems.get(i).getBorTime(),dateBody.get("curDate").asText(),dateBody.get("curTime").asText()).getLateHours());
        }

        reverseSorter(gapList,dueItems);

        for(int i = 0; i<gapList.size();i++){
            if(gapList.get(i)>0){
                overDueItems.add(dueItems.get(i));
            }
        }

        return overDueItems;
    }

    //Reserve a book for a reader for 7 days
    @Override
    public String reserveItem(Book book) {

        String newReserveDate = new DateTime(book.getBookedTillDate()).getNewReserveDate(7);
        book.setBookedTillDate(newReserveDate);
        book.save();
        return "Book reserved till: "+book.getBookedTillDate();
    }

    //Reserve a dvd for a reader for 3 days
    @Override
    public String reserveItem(Dvd dvd) {

        String newReserveDate = new DateTime(dvd.getBookedTillDate()).getNewReserveDate(3);
        dvd.setBookedTillDate(newReserveDate);
        dvd.save();
        return "Dvd reserved till: "+dvd.getBookedTillDate();
    }

    //Method to sort the overdue items in the descending order considering the overdue period
    private void reverseSorter(List<Integer> gapList, List<LibraryItem> allItems){

        // Iterate the unsorted list one by one
        for (int i = 0; i < gapList.size()-1; i++) {
            // Find the maximum element in unsorted list
            int max = i;
            for (int j = i + 1; j < gapList.size(); j++) {

                if (gapList.get(j).compareTo(gapList.get(max)) > 0) {
                    max = j;

                }
            }

            /** Swap the maximum element with the first element of the
            int list and do the LibraryItem list in the same order **/

            int temp = gapList.get(max);
            LibraryItem tempLI = allItems.get(max);
            gapList.set(max,gapList.get(i));
            allItems.set(max,allItems.get(i));
            gapList.set(i,temp);
            allItems.set(i,tempLI);
        }
    }

}
