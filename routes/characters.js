const express = require('express')
const router = express.Router()
const Character = require('../models/character')

router.get('/', async (req, res) => {
    try {
        const characters = await Character.find()
        res.json(characters)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getCharacter, (req, res) =>{
    res.send(req.character.name)
})

router.post('/', async (req, res) => {
    const character = new Character({
        name: req.body.name,
        characterType: req.body.characterType
    })

    try {
        const newCharacter = await character.save()
        res.status(201).json(newCharacter)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getCharacter,async(req, res) => {
    if(req.body.name != null) {
        req.character.name = req.body.name
    }
    if(req.body.characterType != null) {
        req.character.characterType = req.body.characterType
    }
    try {
        const updatedCharacter = await req.character.save()
        res.json(updatedCharacter)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getCharacter, async(req, res) => {
    try {
        await req.character.remove()
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getCharacter(req, res, next) {
    let character
    try {
        character = await Character.findById(req.params.id)
        if (character == null){
            return res.status(404).json({ message: 'Cannot find character :)' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.character = character
    next()
}


module.exports = router