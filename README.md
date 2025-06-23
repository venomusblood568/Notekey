#  NoteKey

NoteKey is a secure, minimal notes app built with **OTP-based login** and **Auth0 integration**. Write, store, and manage your thoughts seamlessly.

---

## Live URLs

-  **Backend**: [https://notekey.onrender.com](https://notekey.onrender.com)  
-  **Frontend**: [https://notekey-duck.vercel.app](https://notekey-duck.vercel.app)

---

## Local Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/notekey.git
cd notekey
```

---

### 2. **Set Up the Backend**

```bash
cd backend
npm install
```

#### Create a `.env` file inside `/backend` with the following:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_CONNECTION=email
```

Then start the server:

```bash
npm run dev
```

---

### 3. **Set Up the Frontend**

```bash
cd ../frontend
npm install
```

Then run:

```bash
npm run dev
```

---

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS  
- **Backend**: Express.js, MongoDB, JWT  
- **Auth**: Auth0 (with OTP and Google login)  
- **Hosting**: Vercel (frontend), Render (backend)