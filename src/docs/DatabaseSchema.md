
# MySQL Database Schema

## Tables

### 1. books
```sql
CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255),
  published_date DATE,
  pages INT,
  language VARCHAR(50),
  category VARCHAR(100),
  description TEXT,
  status ENUM('available', 'borrowed', 'reserved') DEFAULT 'available'
);
```

### 2. members
```sql
CREATE TABLE members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  join_date DATE NOT NULL,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);
```

### 3. transactions
```sql
CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT NOT NULL,
  member_id INT NOT NULL,
  type ENUM('checkout', 'return', 'reserve') NOT NULL,
  transaction_date DATETIME NOT NULL,
  due_date DATE,
  return_date DATE,
  status ENUM('active', 'completed', 'overdue') NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (member_id) REFERENCES members(id)
);
```

### 4. fines
```sql
CREATE TABLE fines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  payment_date DATE,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);
```

## Indexes
```sql
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_transactions_book_id ON transactions(book_id);
CREATE INDEX idx_transactions_member_id ON transactions(member_id);
CREATE INDEX idx_transactions_status ON transactions(status);
```

## Triggers
```sql
-- Update book status when borrowed
DELIMITER //
CREATE TRIGGER after_transaction_insert
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
  IF NEW.type = 'checkout' THEN
    UPDATE books SET status = 'borrowed' WHERE id = NEW.book_id;
  ELSEIF NEW.type = 'return' THEN
    UPDATE books SET status = 'available' WHERE id = NEW.book_id;
  ELSEIF NEW.type = 'reserve' THEN
    UPDATE books SET status = 'reserved' WHERE id = NEW.book_id;
  END IF;
END //
DELIMITER ;

-- Calculate fines when book is returned late
DELIMITER //
CREATE TRIGGER after_transaction_update
AFTER UPDATE ON transactions
FOR EACH ROW
BEGIN
  IF NEW.return_date IS NOT NULL AND NEW.return_date > NEW.due_date THEN
    INSERT INTO fines (transaction_id, amount)
    VALUES (NEW.id, DATEDIFF(NEW.return_date, NEW.due_date) * 0.50);
  END IF;
END //
DELIMITER ;
```
