import { App } from "./app";

const PORT = process.env.PORT || 4000;
const app = new App().app

app.listen(PORT, () => console.log(`Server is running on https://localhost:${PORT}!`));