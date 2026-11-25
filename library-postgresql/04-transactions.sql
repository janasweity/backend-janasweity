-- COMMIT بيثبّت إضافة الكتاب
BEGIN;

INSERT INTO books (title, author_id, genre)
VALUES ('Transaction Demo', 1, 'Fantasy');

COMMIT;

SELECT id, title, genre
FROM books
WHERE title = 'Transaction Demo';

-- ROLLBACK بيلغي تغيير التصنيف
BEGIN;

UPDATE books
SET genre = 'Adventure'
WHERE id = 5 AND title = 'Transaction Demo';

ROLLBACK;

-- المفروض يضل التصنيف Fantasy
SELECT id, title, genre
FROM books
WHERE id = 5 AND title = 'Transaction Demo';