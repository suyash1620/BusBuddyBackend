import express from 'express'
import { Addnewbuspass, Renewbuspass, getbuspass, getbuspassall } from '../Controllers/Buspass.controller';


const router=express.Router();


router.get('/busPass',getbuspassall)
router.get('/busPass/:id', getbuspass)
router.post('/addbusPass',Addnewbuspass)
router.put('/renewbusPass/:id',Renewbuspass)




export default router;