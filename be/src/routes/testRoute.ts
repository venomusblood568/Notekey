import express, { Response,Request} from "express";

const router = express.Router();

router.get("/testroute",(req:Request,res:Response) => {
    res.status(200).json({message:"Test Routes working fine!!!"});
})

export default router;