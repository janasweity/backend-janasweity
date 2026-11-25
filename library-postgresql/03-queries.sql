-- قراءة الكتب
SELECT id, title, genre
FROM books
ORDER BY id;

-- إضافة كتاب تجريبي
INSERT INTO books (title, author_id, genre)
VALUES ('Test Book', 1, 'Fantasy')
RETURNING id, title, genre;

-- تعديل الكتاب التجريبي
UPDATE books
SET genre = 'Adventure'
WHERE id = 4 AND title = 'Test Book'
RETURNING id, title, genre;

-- حذف الكتاب التجريبي
DELETE FROM books
WHERE id = 4 AND title = 'Test Book'
RETURNING id, title;

-- عرض كل كتاب مع اسم مؤلفه
SELECT books.title, authors.name AS author
FROM books
JOIN authors ON books.author_id = authors.id
ORDER BY books.id;

-- حساب عدد الكتب لكل مؤلف
SELECT authors.name AS author, COUNT(books.id) AS book_count
FROM authors
JOIN books ON books.author_id = authors.id
GROUP BY authors.id, authors.name
ORDER BY book_count DESC;

-- الصفحة الأولى
SELECT id, title
FROM books
ORDER BY id
LIMIT 2 OFFSET 0;

-- الصفحة الثانية
SELECT id, title
FROM books
ORDER BY id
LIMIT 2 OFFSET 2;