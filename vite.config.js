import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [react(), yextSSG(), imagetools()],
});
