# React Product Manager with JSON Server

This is a simple React application for managing products using CRUD operations, with a JSON Server backend. The application allows you to view, add, edit, and delete products.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdellah-belcaid/React-Crud-Json-Server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-product-manager
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

### Setting Up the JSON Server Backend

To install JSON Server globally, you can use the following command in your terminal:

```bash
  npm install -g json-server
```

This will install JSON Server globally on your machine, allowing you to use the `json-server` command from anywhere in your terminal.

After installing JSON Server globally, you can set up the backend for your project. Here's how you can do it:

1. Create a db.json file in your project directory. This file will act as your database and hold your JSON data.

2. Add the data to your db.json file. For example, you can add the following data to simulate products:

   ```bash
   {
   "products": [
    { "id": 1, "name": "Product 1", "price": 10, "quantity": 20, "checked": false },
    { "id": 2, "name": "Product 2", "price": 15, "quantity": 15, "checked": true },
    // Add more products as needed
       ]
   }
   ```

3. Open a new terminal window and navigate to your project directory.

4. Start the JSON Server using the following command:

```bash
json-server --watch db.json --port 3001
```

This command will start the JSON Server on port 3001 and watch the db.json file for changes.

Now your JSON Server backend is set up and running globally. You can use this server to fetch and manipulate data in your React application

### Running the Application

1. Return to the project root directory.
2. Start the development server for the React application:

```bash
npm start
```

This will start the development server and open the app in your default web browser. You can access it at http://localhost:3000.

3. Use the navigation links in the header to navigate between the different sections of the app: Home, Products, and New Product.

4. In the Products section, you can view the list of products, edit their details, mark them as checked/unchecked, and delete them.

5. In the New Product section, you can add a new product by filling in the required details and clicking the "Add Product" button.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request