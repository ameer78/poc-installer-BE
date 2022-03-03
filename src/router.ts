import express from "express";
import { install } from "./controller";
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
  res.send('installer api version 1')
})
// define the about route
router.post('/install', install)


export default router;