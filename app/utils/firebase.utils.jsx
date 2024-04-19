import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6ek-s2v3RLJ4u4Tvld3jETgZcKBZ8luA",
  authDomain: "ether-clothing-db.firebaseapp.com",
  projectId: "ether-clothing-db",
  storageBucket: "ether-clothing-db.appspot.com",
  messagingSenderId: "429477406957",
  appId: "1:429477406957:web:a51262fc30b1b50be944e4"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();


googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const addDocument = async (document, field) => {
  try{
    await setDoc(doc(db, 'categories', document),{
      items: [
        {
          id: "newID",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg",
          name: "new Product",
          price: 0,
        }
      ],
      title: `${document[0].toUpperCase()}${document.slice(1)}`,
    });
  } catch(e){
    console.error("Error adding document: ", e);
  }
}

export const getDocument = async (collection, document) => {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {
    return docSnap.data();
  } else {
    alert("No such document!")
  }
}

export const updateDocument = async (collection, document, items) => {
  const docRef = doc(db, collection, document);
  await updateDoc(docRef, {items});
}

export const getCategories = async () => {
  const catAndDocs = await getCategoriesAndDocuments();
  const categoriesArray = []
  catAndDocs?.map((doc) => {
    categoriesArray.push({'value': doc.title, 'label': doc.title})
  });
  return categoriesArray;
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);