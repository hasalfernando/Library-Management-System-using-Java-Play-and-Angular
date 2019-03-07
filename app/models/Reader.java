package models;

import io.ebean.Finder;

import javax.persistence.*;


@Entity
@Table(name = "reader")
public class Reader {

    //To store reader's id
    @Id
    @Column(name = "id")
    private int id;

    //To store reader's name
    @Column(name = "name")
    private String name;

    //To store reader's mobile number
    @Column(name = "mobileNum")
    private int mob;

    //To store reader's email address
    @Column(name = "email")
    private String email;

    //To find the class using ebean
    public static Finder<Integer, Reader> find = new Finder<>(Reader.class);

    //Accessor methods
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

    public int getMob() {
        return mob;
    }

    public void setMob(int mob) {
        this.mob = mob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
