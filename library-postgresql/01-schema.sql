CREATE TABLE authors (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE books (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    author_id integer NOT NULL REFERENCES authors(id),
    genre text NOT NULL
);

CREATE TABLE loans (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id integer NOT NULL REFERENCES books(id),
    borrower_name text NOT NULL,
    borrowed_on date NOT NULL DEFAULT CURRENT_DATE,
    returned_on date,
    CHECK (returned_on IS NULL OR returned_on >= borrowed_on)
);