import {pool} from '../db.js'
import bcrypt from 'bcrypt'  

export const AccessSignInEmail = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [req.params.email])
        if(rows.length <= 0){
            return res.status(404).json({
                message: 'User not Found'
            })
        } 
        const isTrue = true;
        res.json({isTrue})
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
export const AccessSignInPasswd = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [req.body.email])
        if(rows.length <= 0) return res.status(404).json({
            message: 'User not Found'
        })
        const isMatch = await bcrypt.compare(req.body.passwd, rows[0].passwd);
        if (!isMatch) {
            return res.status(404).json({
                message: 'User not found or incorrect password'
            });
        } else {
            const isTrue = true;
            res.json({isTrue})
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const AccessSignUpUsername = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [req.params.username])
        if(rows.length === 0){
            const isTrue = false;
            res.json({isTrue})
        }  
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const AccessSignUp =  async (req, res) => { 
    try {
        const passwd = await bcrypt.hash(req.body.passwd, 10);
        const [rows] = await pool.query('INSERT INTO users (username, email, passwd, phone) VALUES (?,?,?,?)',[req.body.username, req.body.email, passwd, req.body.phone])
        return res.status(200).json({
            message: 'Yeih :)'
        })
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
