INSERT INTO authors (name)
VALUES ('J.R.R. Tolkien'), ('Frank Herbert');

INSERT INTO books (title, author_id, genre)
VALUES
    ('The Hobbit', 1, 'Fantasy'),
    ('The Fellowship of the Ring', 1, 'Fantasy'),
    ('Dune', 2, 'Sci-Fi');

INSERT INTO loans (book_id, borrower_name, borrowed_on, returned_on)
VALUES
    (1, 'Jana', '2025-11-20', NULL),
    (3, 'Omar', '2025-11-21', '2025-11-24');
    