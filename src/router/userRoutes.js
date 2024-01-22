import { Router } from "express";
import {getUsers, createUsers, updateUsers, deleteUsers, getUser} from '../controllers/usersController.js'

const router = Router()

router.get('/users', getUsers)

router.get('/user/:id', getUser)

router.post('/user', createUsers)

router.patch('/user/:id',updateUsers)

router.delete('/user/:id', deleteUsers)

export default router;