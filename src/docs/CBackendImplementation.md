
# C Backend Implementation

## Setup and Installation

### Prerequisites
- GCC compiler
- MySQL development libraries
- libmicrohttpd (for HTTP server)
- libjansson (for JSON handling)

### Compilation
```bash
gcc -o library_server main.c db_conn.c routes.c auth.c -lmysqlclient -lmicrohttpd -ljansson
```

## Core Components

### 1. Database Connection (db_conn.c)
```c
#include <mysql/mysql.h>
#include <stdio.h>
#include <stdlib.h>

MYSQL *conn;

int db_connect() {
    conn = mysql_init(NULL);
    if (conn == NULL) {
        fprintf(stderr, "mysql_init() failed\n");
        return 1;
    }
    
    if (mysql_real_connect(conn, "localhost", "dbuser", "password", 
                          "library_db", 0, NULL, 0) == NULL) {
        fprintf(stderr, "Connection error: %s\n", mysql_error(conn));
        mysql_close(conn);
        return 1;
    }
    
    return 0;
}

void db_disconnect() {
    mysql_close(conn);
}

// Example query function
MYSQL_RES* execute_query(const char *query) {
    if (mysql_query(conn, query)) {
        fprintf(stderr, "Query error: %s\n", mysql_error(conn));
        return NULL;
    }
    
    return mysql_store_result(conn);
}
```

### 2. HTTP Server (main.c)
```c
#include <microhttpd.h>
#include <string.h>
#include <stdio.h>
#include "routes.h"
#include "db_conn.h"

#define PORT 8000

static int request_handler(void *cls, struct MHD_Connection *connection,
                          const char *url, const char *method,
                          const char *version, const char *upload_data,
                          size_t *upload_data_size, void **con_cls) {
    
    struct MHD_Response *response;
    int ret;
    
    // Handle CORS preflight
    if (strcmp(method, "OPTIONS") == 0) {
        response = MHD_create_response_from_buffer(0, NULL, 
                                         MHD_RESPMEM_PERSISTENT);
        MHD_add_response_header(response, "Access-Control-Allow-Origin", "*");
        MHD_add_response_header(response, "Access-Control-Allow-Methods", 
                               "GET, POST, PUT, DELETE, OPTIONS");
        MHD_add_response_header(response, "Access-Control-Allow-Headers", 
                               "Content-Type, Authorization");
        ret = MHD_queue_response(connection, MHD_HTTP_OK, response);
        MHD_destroy_response(response);
        return ret;
    }
    
    // Route requests
    char *response_data = route_request(url, method, upload_data);
    
    response = MHD_create_response_from_buffer(strlen(response_data),
                                      (void*) response_data,
                                      MHD_RESPMEM_MUST_COPY);
    
    MHD_add_response_header(response, "Content-Type", "application/json");
    MHD_add_response_header(response, "Access-Control-Allow-Origin", "*");
    
    ret = MHD_queue_response(connection, MHD_HTTP_OK, response);
    MHD_destroy_response(response);
    free(response_data);
    
    return ret;
}

int main() {
    struct MHD_Daemon *daemon;
    
    // Connect to database
    if (db_connect() != 0) {
        return 1;
    }
    
    // Start HTTP server
    daemon = MHD_start_daemon(MHD_USE_SELECT_INTERNALLY, PORT, NULL, NULL,
                             &request_handler, NULL, MHD_OPTION_END);
    
    if (daemon == NULL) {
        db_disconnect();
        return 1;
    }
    
    printf("Server running on port %d\n", PORT);
    
    // Run until signal interrupts
    getchar();
    
    MHD_stop_daemon(daemon);
    db_disconnect();
    
    return 0;
}
```

### 3. API Routes (routes.c)
```c
#include <jansson.h>
#include <string.h>
#include <stdio.h>
#include "db_conn.h"

// Get all books
char* get_books() {
    MYSQL_RES *result = execute_query("SELECT * FROM books");
    if (result == NULL) {
        return strdup("{\"error\": \"Database query failed\"}");
    }
    
    json_t *books = json_array();
    MYSQL_ROW row;
    
    while ((row = mysql_fetch_row(result))) {
        json_t *book = json_object();
        json_object_set_new(book, "id", json_integer(atoi(row[0])));
        json_object_set_new(book, "title", json_string(row[1]));
        json_object_set_new(book, "author", json_string(row[2]));
        json_object_set_new(book, "publisher", 
                           row[3] ? json_string(row[3]) : json_null());
        json_object_set_new(book, "status", json_string(row[9]));
        
        json_array_append_new(books, book);
    }
    
    mysql_free_result(result);
    
    json_t *response = json_object();
    json_object_set_new(response, "books", books);
    
    char *json_str = json_dumps(response, JSON_INDENT(2));
    json_decref(response);
    
    return json_str;
}

// Get book by ID
char* get_book(const char *book_id) {
    char query[256];
    sprintf(query, "SELECT * FROM books WHERE id = %s", book_id);
    
    MYSQL_RES *result = execute_query(query);
    if (result == NULL) {
        return strdup("{\"error\": \"Database query failed\"}");
    }
    
    MYSQL_ROW row = mysql_fetch_row(result);
    if (row == NULL) {
        mysql_free_result(result);
        return strdup("{\"error\": \"Book not found\"}");
    }
    
    json_t *book = json_object();
    json_object_set_new(book, "id", json_integer(atoi(row[0])));
    json_object_set_new(book, "title", json_string(row[1]));
    json_object_set_new(book, "author", json_string(row[2]));
    json_object_set_new(book, "publisher", 
                       row[3] ? json_string(row[3]) : json_null());
    json_object_set_new(book, "publishedDate", 
                       row[4] ? json_string(row[4]) : json_null());
    json_object_set_new(book, "pages", 
                       row[5] ? json_integer(atoi(row[5])) : json_null());
    json_object_set_new(book, "language", 
                       row[6] ? json_string(row[6]) : json_null());
    json_object_set_new(book, "category", 
                       row[7] ? json_string(row[7]) : json_null());
    json_object_set_new(book, "description", 
                       row[8] ? json_string(row[8]) : json_null());
    json_object_set_new(book, "status", json_string(row[9]));
    
    mysql_free_result(result);
    
    // Get borrowing history
    sprintf(query, "SELECT t.id, m.name, t.transaction_date, t.return_date "
                  "FROM transactions t "
                  "JOIN members m ON t.member_id = m.id "
                  "WHERE t.book_id = %s "
                  "ORDER BY t.transaction_date DESC", book_id);
    
    result = execute_query(query);
    if (result == NULL) {
        char *json_str = json_dumps(book, JSON_INDENT(2));
        json_decref(book);
        return json_str;
    }
    
    json_t *history = json_array();
    
    while ((row = mysql_fetch_row(result))) {
        json_t *record = json_object();
        json_object_set_new(record, "id", json_integer(atoi(row[0])));
        json_object_set_new(record, "memberName", json_string(row[1]));
        json_object_set_new(record, "borrowDate", json_string(row[2]));
        json_object_set_new(record, "returnDate", 
                           row[3] ? json_string(row[3]) : json_null());
        
        json_array_append_new(history, record);
    }
    
    mysql_free_result(result);
    
    json_object_set_new(book, "borrowingHistory", history);
    
    char *json_str = json_dumps(book, JSON_INDENT(2));
    json_decref(book);
    
    return json_str;
}

// Route request to appropriate handler
char* route_request(const char *url, const char *method, const char *data) {
    // Route: /api/books
    if (strcmp(url, "/api/books") == 0 && strcmp(method, "GET") == 0) {
        return get_books();
    }
    
    // Route: /api/books/{id}
    if (strncmp(url, "/api/books/", 11) == 0 && strcmp(method, "GET") == 0) {
        const char *book_id = url + 11;
        return get_book(book_id);
    }
    
    // Default response for unmatched routes
    return strdup("{\"error\": \"Not found\"}");
}
```

### 4. Frontend Integration (src/utils/api.ts)

<lov-write file_path="src/utils/api.ts">
/**
 * API utilities for connecting to the C backend
 */

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

export async function fetchBookDetails(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    throw error;
  }
}

// This function would be used in a production environment.
// Currently, the getBookDetails function in bookUtils.ts is used
// to provide mock data for development.
export async function getBookDetailsFromAPI(id: string) {
  try {
    return await fetchBookDetails(id);
  } catch (error) {
    console.error('Error in getBookDetailsFromAPI:', error);
    return null;
  }
}
