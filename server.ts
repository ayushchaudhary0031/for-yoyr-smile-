import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parser
  app.use(express.json());

  // API Check Route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
  });

  // API Endpoint to send real SMTP emails securely
  app.post("/api/send-email", async (req, res) => {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields (to, subject, html)" 
      });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;

    // Handle missing configuration gracefully
    if (!smtpUser || !smtpPassword) {
      console.log(`[SMTP SIMULATED] To: ${to} | Subject: ${subject}`);
      return res.json({
        success: true,
        simulated: true,
        message: "SMTP user/password not configured in environment variables. Simulated successfully.",
        details: { to, subject }
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });

      const info = await transporter.sendMail({
        from: `"Surya Dental Speciality Clinic" <${smtpUser}>`,
        to: to,
        subject: subject,
        html: html,
      });

      console.log(`[SMTP SENT] Real email sent successfully! MessageID: ${info.messageId}`);
      return res.json({
        success: true,
        simulated: false,
        messageId: info.messageId,
        message: `Real transaction notification successfully dispatched online to ${to}!`
      });
    } catch (error: any) {
      console.error("[SMTP ERROR] Failed to send email via NodeMailer:", error);
      return res.status(500).json({
        success: false,
        simulated: false,
        error: error.message || "SMTP transmission failure",
        message: "Email dispatch failed. Please check your SMTP configuration and Gmail app password."
      });
    }
  });

  // Vite middleware for rendering the React application
  if (process.env.NODE_ENV !== "production") {
    console.log("Mounting Vite dev server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production build from dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("FATAL: Failed to start express-vite integration server:", err);
});
