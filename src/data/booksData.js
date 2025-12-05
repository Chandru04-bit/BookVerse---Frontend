// ✅ src/data/booksData.js

// Featured books (named export)
export const featuredBooks = [
  {
    id: 101,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    img: "/assets/images/books/Book1.jpg",
    price: 299,
    originalPrice: 399,
    category: "Psychology",
    description:
      "A timeless guide on how our emotions and perceptions influence financial decisions.",
  },
  {
    id: 102,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    img: "/assets/images/books/Book2.jpg",
    price: 249,
    originalPrice: 349,
    category: "Fiction",
    description:
      "A powerful novel about racial injustice and moral growth in the Deep South.",
  },
  {
    id: 103,
    title: "The Alchemist",
    author: "Paulo Coelho",
    img: "/assets/images/books/Book3.jpg",
    price: 349,
    originalPrice: 449,
    category: "Drama",
    description:
      "A philosophical novel about pursuing one's dreams and discovering personal legend.",
  },
  {
    id: 104,
    title: "Deep Work",
    author: "Cal Newport",
    img: "/assets/images/books/Book4.jpg",
    price: 299,
    originalPrice: 399,
    category: "Science",
    description:
      "A guide to mastering focus in a distracted world, improving productivity and creativity.",
  },
];

// Full books list (default export)
const booksData = [
  {
    id: 1,
    title: "It Ends With Us",
    author: "Colleen Hoover",
    price: 399,
    description: "A novel about love, choices, and strength.",
    category: "Romance",
    stock: 10,
    img: "/assets/images/books/Book101.jpg",
  },
  {
    id: 2,
    title: "It Starts With Us",
    author: "Colleen Hoover",
    price: 449,
    description: "The sequel to 'It Ends With Us'.",
    category: "Romance",
    stock: 8,
    img: "/assets/images/books/Book102.jpg",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 349,
    description: "Guide to building better habits.",
    category: "Self-Help",
    stock: 12,
    img: "/assets/images/books/Book103.jpg",
  },
  {
    id: 4,
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    price: 399,
    description: "A surreal journey of love, fate, and destiny.",
    category: "Fiction",
    stock: 7,
    img: "/assets/images/books/Book104.jpg",
  },
  {
    id: 5,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 499,
    description: "The first book of the Harry Potter series.",
    category: "Fantasy",
    stock: 20,
    img: "/assets/images/books/Book105.jpg",
  },
  // Add more books here if needed
];

export default booksData; // default export for AuthorProfile.jsx
