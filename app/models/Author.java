package models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "author")
public class Author {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;
/*
    @ManyToMany
    @Column(name = "books")
    private List<Book> books;
*/
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
/*
    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }*/
}
