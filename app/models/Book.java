package models;

import io.ebean.Finder;
import javax.persistence.*;

@Entity
@Table(name = "Book")
@DiscriminatorValue("book")
public class Book extends LibraryItem{

    //To store all author names
    @Column(name = "author")
    private String author;

    //To find using ebean
    public static Finder<Long, Book> find = new Finder<>(Book.class);

    //Accessor methods
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

}
