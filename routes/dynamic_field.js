const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const DynamicField = require('../models/DynamicField');

// @route     GET api/dynamic_field
// @desc      Get all dynamic fields
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const dynamicFields = await DynamicField.find().sort({
      date: -1,
    });
    res.json(dynamicFields);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route     POST api/dynamic_field
// @desc      Add new dynamic field
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {name, id, size} = req.body;

    try {
      const newDynamicField = new DynamicField({
        name,
        id,
        size
      });

      const dynamicField = await newDynamicField.save();

      res.json(dynamicField);

      
    } catch (err) {
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/dynamic_field/:id
// @desc      Update dynamic_field
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {name, id, size} = req.body;

  // Build contact object
  const dynamicFields = {};
  if (name) dynamicFields.name = name;
  if (id) dynamicFields.id = id;
  if (size) dynamicFields.size = size;

  try {
    let dynamic_field = await DynamicField.findById(req.params.id);

    if (!dynamic_field) return res.status(404).json({msg: 'Dynamic field not found'});

    dynamic_field = await DynamicField.findByIdAndUpdate(
      req.params.id,
      {$set: dynamicFields},
      {new: true},
    );

    res.json(dynamic_field);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route     DETAIL api/dynamic_field/:id
// @desc      Detail dynamic field
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    let dynamicFieldDetail = await DynamicField.findById(req.params.id);
    if (!dynamicFieldDetail) return res.status(404).json({msg: 'Dynamic field not found'});
    res.json(dynamicFieldDetail);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
