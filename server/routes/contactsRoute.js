const express = require('express')
const { getContacts, getContact, addContact, updateContact, deleteContact } = require('../controllers/contactsController')

const router = express.Router()


router.get('/', getContacts)
router.get('/:id', getContact)
router.post('/', addContact)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router