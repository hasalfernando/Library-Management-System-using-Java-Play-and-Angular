package models;

import io.ebean.Finder;

import javax.persistence.*;

@Entity
@Table(name = "DVD")
@DiscriminatorValue("dvd")
public class Dvd extends LibraryItem{

    //To store the name of the producer
    @Column(name = "producer")
    private String producer;

    //To store names of actors
    @Column(name = "actor")
    private String actor;

    //To store names of available languages
    @Column(name = "languages")
    private String languages;

    //To store available subtitles
    @Column(name = "subtitles")
    private String subtitles;

    //To find using ebean
    public static Finder<Long, Dvd> find = new Finder<>(Dvd.class);

    //Accessor methods
    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public String getSubtitles() {
        return subtitles;
    }

    public void setSubtitles(String subtitles) {
        this.subtitles = subtitles;
    }
}
