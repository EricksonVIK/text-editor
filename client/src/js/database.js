import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () =>
  // creating a new database "jate" version 1
  openDB('jate', 1, {
    // add database schema
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create new object store for data and give it id
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Put function to add to indexedDB
export const putDb = async (content) => {
  console.log("Add to database");
  // create a connection
  const jateDB = await openDB('jate', 1);
  // creat new transaction
  const tx = jateDB.transaction("jate", "readwrite");
  // open up object store
  const store = tx.objectStore('jate');
  // use add()
  const request = store.add(content);
  // confirmation of addition
  const result = await request;
  console.log("Content added to database", result);
}

// Get function from indexedDB
export const getDb = async () => {
  console.log("GET from the jate database");
// create connection to database
  const jateDB = await openDB("jate", 1);
    // create new transaction with privileges
  const tx = jateDB.transaction("jate", "readonly");
  // open up desired object storage
  const store = tx.objectStore("jate");
  // use getAll()
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result;
}
initdb();
