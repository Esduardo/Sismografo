import { Router } from "express";
import { AccessSignInEmail, AccessSignInPasswd, AccessSignUp, AccessSignUpUsername } from "../controllers/accessController.js";

const router = Router()

router.post('/signin-email/:email', AccessSignInEmail);
router.post('/signin-passwd', AccessSignInPasswd);
router.post('/signup-username/:username', AccessSignUpUsername)
router.post('/signup', AccessSignUp);

export default router;