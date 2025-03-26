# sTTTump'd

sTTTump'd is a **live cricket match tracking** platform developed for **university-level** cricket events. It provides real-time score updates using Firebase and is designed to display live match details, including scores, wickets, overs, run rates, and toss decisions. The project ensures offline accessibility by caching previously fetched data.

## Scope
- Provides **real-time** updates for live cricket matches.
- Stores and retrieves match data from **Firebase Firestore**.
- Implements **offline support** using IndexedDB and the Cache API.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Firebase Firestore
- **Offline Support:** Service Workers, IndexedDB
- **Animations & Icons:** Framer Motion, React Icons

## Current Progress
✅ Real-time Firestore integration  
✅ Live data updates for matches  
✅ Offline support (caches last fetched data)  
✅ Admin panel for match updates  
🔜 Multi-match tracking & improved UI  

## Future Enhancements
- **Multi-match setup** to support multiple ongoing matches.
- **Enhanced offline functionality**, ensuring smoother data retrieval without connectivity.
- **Better data visualization** with graphs and detailed insights.
- **Push notifications** for live score updates.
- **WhatsApp bot** for match reminders and highlights.

## Live Demo
Check out the live version here: [sTTTump'd on Vercel](https://stttumpd.vercel.app/)

