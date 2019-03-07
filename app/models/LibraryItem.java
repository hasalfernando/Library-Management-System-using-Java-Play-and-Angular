package models;

import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "item_type")
public class LibraryItem extends Model {

    //To store the isbn or the dvd barcode
    @Id
    @Column(name = "id")
    private long id;

    //To store the name of book or dvd
    @Column(name = "name")
    private String name;

    //To store whether it is a dvd or a book
    @Column(name = "type")
    private String type;

    //To store in which section the item is in
    @Column(name = "section")
    private String section;

    //To store the publication date
    @Column(name = "pubDate")
    private String pubDate;

    //To store the borrow date
    @Column(name = "borDate")
    private String borDate;

    //To store the borrowing time
    @Column(name = "borTime")
    private String borTime;

    //To store when the item is due from the borrower
    @Column(name = "dueDate")
    private String dueDate;

    //To store until which date the item is reserved
    @Column(name = "bookedTillDate")
    private String bookedTillDate;

    //To store the burrowed number of times
    @Column(name = "burrowedTimes")
    private int borrowedTimes;

    //To store the kept number of days
    @Column(name = "keptForTime")
    private int keptForTime;

    //To store the average keeping time
    @Column(name = "averageKeepingDays")
    private int averageKeepingDays;

    //To store the current reader of the book
    @ManyToOne
    @JoinColumn(name = "reader", referencedColumnName = "id")
    private Reader reader;

    //To find the class using ebean
    public static Finder<Long, LibraryItem> find = new Finder<>(LibraryItem.class);

    //Accessor methods
    public long getId() {
        return id;
    }

    public void setId(long isbn) {
        this.id = isbn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getPubDate() {
        return pubDate;
    }

    public void setPubDate(String pubDate) {
        this.pubDate = pubDate;
    }

    public String getBorDate() {
        return borDate;
    }

    public void setBorDate(String borDate) {
        this.borDate = borDate;
    }

    public String getBorTime() {
        return borTime;
    }

    public void setBorTime(String borTime) {
        this.borTime = borTime;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getBookedTillDate() {
        return bookedTillDate;
    }

    public void setBookedTillDate(String bookedTillDate) {
        this.bookedTillDate = bookedTillDate;
    }

    public Reader getReader() {
        return reader;
    }

    public void setReader(Reader reader) {
        this.reader = reader;
    }

    public int getBorrowedTimes() {
        return borrowedTimes;
    }

    public void setBorrowedTimes(int burrowedTimes) {
        this.borrowedTimes = burrowedTimes;
    }

    public int getKeptForTime() {
        return keptForTime;
    }

    public void setKeptForTime(int keptForTime) {
        this.keptForTime = keptForTime;
    }

    public int getAverageKeepingDays() {
        return averageKeepingDays;
    }

    public void setAverageKeepingDays(int averageKeepingDays) {
        this.averageKeepingDays = averageKeepingDays;
    }
}
