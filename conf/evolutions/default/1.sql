# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table author (
  id                            integer auto_increment not null,
  name                          varchar(255),
  constraint pk_author primary key (id)
);

create table library_item (
  item_type                     varchar(31) not null,
  id                            bigint auto_increment not null,
  name                          varchar(255),
  type                          varchar(255),
  section                       varchar(255),
  pubdate                       varchar(255),
  bordate                       varchar(255),
  bortime                       varchar(255),
  duedate                       varchar(255),
  bookedtilldate                varchar(255),
  burrowedtimes                 integer not null,
  keptfortime                   integer not null,
  averagekeepingdays            integer not null,
  reader                        integer,
  producer                      varchar(255),
  actor                         varchar(255),
  languages                     varchar(255),
  subtitles                     varchar(255),
  author                        varchar(255),
  constraint pk_library_item primary key (id)
);

create table reader (
  id                            integer auto_increment not null,
  name                          varchar(255),
  mobilenum                     integer not null,
  email                         varchar(255),
  constraint pk_reader primary key (id)
);

alter table library_item add constraint fk_library_item_reader foreign key (reader) references reader (id) on delete restrict on update restrict;
create index ix_library_item_reader on library_item (reader);


# --- !Downs

alter table library_item drop constraint if exists fk_library_item_reader;
drop index if exists ix_library_item_reader;

drop table if exists author;

drop table if exists library_item;

drop table if exists reader;

