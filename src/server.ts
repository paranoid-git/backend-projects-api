import "dotenv/config";
import app from "./app.ts";
import { info } from "./utils/logger.ts";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  info(`🚀 Server running on port ${PORT}`);
});
