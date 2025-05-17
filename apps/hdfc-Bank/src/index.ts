import express from "express";
import db from "@repo/db/client";
import axios from "axios";
import {webhookURL} from "../../config"
const app = express();
import * as Cors from "cors";

app.use(Cors.default()); // Use Cors.default() instead of cors()
app.use(express.json())

app.get('/healthcheck', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      service: 'hdfc', // Change per service
      timestamp: new Date().toISOString()
    });
  });
  
app.post("/hdfcBank", async (req, res):Promise<any> => {
  const { token, userId, amount } = req.body;
  console.log("HDFC Bank Transaction Started");

  try 
  {
      const transaction = await db.onRampTransaction.findUnique({
          where: { userId: Number(userId), token }
      });

      if (!transaction || transaction.status !== "Processing") {
          return res.status(400).json({ message: "Invalid transaction status" });
      }

      const userBalance = await db.hDFCBank.findUnique({
          where: { userId: Number(userId) }
      });

      if (!userBalance || userBalance.amount < amount) {
          return res.status(400).json({ message: "Insufficient balance" });
      }

      await db.hDFCBank.update({
          where: { userId: Number(userId) },
          data: {
              amount: { decrement: Number(amount) },
              locked: { increment: Number(amount) }
          }
      });
      console.log("Amount Shi h locked bhi krdia. Ab webhook ko bolrhe")

      await axios.post(`${webhookURL}/hdfcWebhook`, { token, user_identifier: userId, amount });
      console.log("webhook se aagye sb badhiya")
      return res.json({ message: "Webhook triggered successfully" });
  } catch (error) {
      console.error("hdfcBank error:", error);
      return res.status(500).json({
         message: "hdfc mein aya kuch to" 
      });
  }
    
})

app.post("/hdfcBankWithdrawl", async (req, res): Promise<any> => {
    const { token, userId, amount } = req.body;

    try{

        console.log("hdfc mei aagya")

        const transaction = await db.offRampTransaction.findUnique({
            where: { userId: Number(userId), token }
        });
  
        if (!transaction || transaction.status !== "Processing") {
            return res.status(400).json({ message: "Invalid transaction status" });
        }

        await db.hDFCBank.update({
            where:{
                userId:Number(userId)
            },
            data:{
                locked:{
                    increment:Number(amount)
                }
            }
        })
        console.log("hdfc mei lock krdiya")

        await axios.post(`${webhookURL}/hdfcWebWithdrawl`, { token, user_identifier: userId, amount });
        console.log("webhook se aagye sb badhiya")
        return res.json({ message: "Webhook triggered successfully" });

    }
    catch (error) {
        console.error("HDFCBank error:", error);
        return res.status(500).json({
           message: "Hdfc mein aya kuch to" 
        });
    }
})

app.listen(3005);