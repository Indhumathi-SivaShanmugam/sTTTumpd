import { db } from "./src/firebase.js";  // Import the Firestore instance
import { doc, getDoc } from "firebase/firestore";

const getMatchDetails = async () => {
  try {
    const docRef = doc(db, "matches", "match_SNUvsSSN"); // Adjust collection/document name
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Match Data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching match details:", error);
  }
};

getMatchDetails();
