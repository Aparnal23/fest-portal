# FestPortal'26

College fest portal: sign up, sign in, browse events, book a spot, view/cancel your passes.

```
fest-portal/
├── client/   React + Vite frontend
└── server/   Express + MongoDB API
```

## Run on Linux Mint (VS Code)

### 1. Install Node.js 22 and VS Code (one time)
```bash
sudo apt update
sudo apt install -y curl unzip
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v        # should print v22.x
```
VS Code: download the `.deb` from https://code.visualstudio.com, then
```bash
sudo apt install ./code_*.deb
```

### 2. Open the project
```bash
cd ~/Downloads
unzip fest-portal.zip
cd fest-portal
code .
```

### 3. Database
Either use a free MongoDB Atlas cluster, or install MongoDB locally.
Put your connection string in `server/.env` (see `server/.env.example`).

### 4. Start the server (VS Code terminal 1: Ctrl+`)
```bash
cd server
npm install
npm run seed      # adds the sample events
npm run dev       # API on http://localhost:5000
```

### 5. Start the client (terminal 2: click the + in the terminal panel)
```bash
cd client
npm install
npm run dev       # open http://localhost:5173
```

## Try it
1. **Join** → create an account
2. **Sign in**
3. **Events** → search / filter → **Grab a spot**
4. **My Passes** → see or cancel bookings
5. **☾ Night** toggles dark mode (remembered on reload)
