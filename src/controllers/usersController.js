import {pool} from '../db.js'
import { jsonResponse } from '../lib/jsonResponse.js'

export const getUsers = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM users')
        res.send(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getUser = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    console.log(rows)
    if(rows.length <= 0) return res.status(404).json({
        message: 'User not Found'
    })
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createUsers =  async (req, res) => {    
    const{username, email, passwd, phone} = req.body
    console.log(req.body)
    try {
        const [rows] = await pool.query('INSERT INTO users (username, email, passwd, phone) VALUES (?,?,?,?)',[username, email, passwd, phone])
        res.send({
            id: rows.insertId,
            username,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteUsers = async (req, res) => {
    console.log(req.body)
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id])

    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'User not Found'
    })
    res.status(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
} 

export const updateUsers = async (req, res) => {
    console.log(req.body)
    const {id} = req.params
    const {username, email, passwd, phone} = req.body

    try {
        const [result] = await pool.query('UPDATE users SET username = IFNULL(?, username), email = IFNULL(?, email), passwd = IFNULL(?, passwd), phone = IFNULL(?, phone)  WHERE id = ?', [username, email, passwd, phone, id])

    console.log(result)

    if(result.affectedRows === 0) return res.status(404).json({
        message: 'User not found'
    })
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const getAccessLogin = async (req, res) => {
    console.log(req.body)
    try {
    console.log(req.params.id)
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
    console.log(rows)
    if(rows.length <= 0) return res.status(404).json({
        message: 'User not Found'
    })
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}