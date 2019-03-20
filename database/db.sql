Create database Nodejs;

use Nodejs;

create table users(
    id int(22) not null ,
    us varchar(44) not null,
    password varchar(44) not null,
    namep varchar(55) not null

);

Alter table users
    add primary key(id);

Alter table users
    modify id int(11) not null auto_increment, auto_increment=2;

Describe users;    

create table links(
    id int(15) not null  auto_increment, auto_increment=2,
    title varchar(44) not null,
    url varchar (255) not null,
    description text,
    user_id int(11),
    created_At Timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) reference user(id)

);

alter table links
    add primary key (id);