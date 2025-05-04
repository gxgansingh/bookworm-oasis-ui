
import { BookDetailsType } from '@/components/books/BookDetailsLayout';

const mockBooks: Record<string, BookDetailsType> = {
  "1": {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    status: 'available',
    category: 'Fiction',
    publisher: 'Viking',
    publishedDate: '2020-08-13',
    isbn: '9780525559474',
    pages: 304,
    language: 'English',
    format: 'Hardcover',
    edition: 'First Edition',
    dimensions: '5.7 x 1.1 x 8.5 inches',
    weight: '0.9 pounds',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Jane Smith',
        borrowDate: '2025-01-15',
        returnDate: '2025-02-15'
      },
      {
        id: 2,
        memberName: 'John Doe',
        borrowDate: '2024-11-10',
        returnDate: '2024-12-10'
      },
      {
        id: 3,
        memberName: 'Alice Johnson',
        borrowDate: '2024-09-05',
        returnDate: '2024-10-02'
      }
    ]
  },
  "2": {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'borrowed',
    category: 'Self-Help',
    publisher: 'Avery',
    publishedDate: '2018-10-16',
    isbn: '9780735211292',
    pages: 320,
    language: 'English',
    format: 'Hardcover',
    edition: 'First Edition',
    dimensions: '6.2 x 1.1 x 9.3 inches',
    weight: '1.1 pounds',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Robert Johnson',
        borrowDate: '2025-03-01',
        returnDate: null
      }
    ]
  },
  "3": {
    id: 3,
    title: 'Educated',
    author: 'Tara Westover',
    status: 'available',
    category: 'Memoir',
    publisher: 'Random House',
    publishedDate: '2018-02-20',
    isbn: '9780399590504',
    pages: 352,
    language: 'English',
    format: 'Hardcover',
    edition: 'First Edition',
    dimensions: '6.4 x 1.3 x 9.6 inches',
    weight: '1.3 pounds',
    description: 'Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara\'s older brothers became violent.',
    borrowingHistory: []
  },
  "4": {
    id: 4,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    status: 'reserved',
    category: 'Sci-Fi',
    publisher: 'Ballantine Books',
    publishedDate: '2021-05-04',
    isbn: '9780593135204',
    pages: 496,
    language: 'English',
    format: 'Hardcover',
    edition: 'First Edition',
    dimensions: '6.3 x 1.6 x 9.5 inches',
    weight: '1.6 pounds',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name, let alone the nature of his assignment or how to complete it.',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Michael Lee',
        borrowDate: '2024-12-15',
        returnDate: '2025-01-15'
      }
    ]
  },
  "5": {
    id: 5,
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'borrowed',
    category: 'Sci-Fi',
    publisher: 'Ace',
    publishedDate: '1965-08-01',
    isbn: '9780441172719',
    pages: 896,
    language: 'English',
    format: 'Mass Market Paperback',
    edition: 'Reissue Edition',
    dimensions: '4.2 x 1.6 x 7.5 inches',
    weight: '0.9 pounds',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Emily Chen',
        borrowDate: '2025-03-20',
        returnDate: null
      },
      {
        id: 2,
        memberName: 'Michael Johnson',
        borrowDate: '2025-01-15',
        returnDate: '2025-02-15'
      },
      {
        id: 3,
        memberName: 'Sarah Miller',
        borrowDate: '2024-10-10',
        returnDate: '2024-11-09'
      }
    ]
  },
  "6": {
    id: 6,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    status: 'available',
    category: 'Fiction',
    publisher: 'HarperOne',
    publishedDate: '1993-04-25',
    isbn: '9780062315007',
    pages: 208,
    language: 'English',
    format: 'Paperback',
    edition: '25th Anniversary Edition',
    dimensions: '5.3 x 0.6 x 8 inches',
    weight: '0.4 pounds',
    description: 'Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago\'s journey teaches us about the essential wisdom of listening to our hearts, recognizing opportunity and learning to read the omens strewn along life\'s path, and, most importantly, following our dreams.',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'David Wilson',
        borrowDate: '2024-11-05',
        returnDate: '2024-12-05'
      },
      {
        id: 2,
        memberName: 'Sophia Garcia',
        borrowDate: '2024-08-10',
        returnDate: '2024-09-10'
      }
    ]
  }
};

export const getBookDetails = (id: string): BookDetailsType | undefined => {
  return mockBooks[id];
};
