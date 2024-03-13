const { ToDoElement, ToDoCategory } = require("../models/ToDoModel");

const { body, param, validationResult } = require('express-validator');



// Walidacja dla pola przekazywanego na backend
const validateField = (field) => {
  return [
    field
      .notEmpty()
      .withMessage('Pole nie może być puste.')
      .custom((value) => !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(value))
      .withMessage('Pole nie może zawierać znaczników JavaScript.')
      .custom((value) => !/[!@#$%^&*(),.?":{}|<>]/g.test(value))
      .withMessage('Pole nie może zawierać znaków specjalnych.')
  ];
};

// Walidacja dla ID
const validateId = (paramName) => {
  return [
    param(paramName)
      .notEmpty()
      .withMessage('ID nie może być puste.')
      .isMongoId()
      .withMessage('Nieprawidłowe ID.')
  ];
};

// Walidacja dla zapytania z parametrem elementId i categoryId
const validateElementAndCategoryIds = () => {
  return [
    param('elementId')
      .notEmpty()
      .withMessage('ID elementu nie może być puste.')
      .isMongoId()
      .withMessage('Nieprawidłowe ID elementu.'),
    param('categoryId')
      .notEmpty()
      .withMessage('ID kategorii nie może być puste.')
      .isMongoId()
      .withMessage('Nieprawidłowe ID kategorii.')
  ];
};



// Get ToDoElement
module.exports.getToDoElement = [
  validateId('id'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
      const element = await ToDoElement.findById(id);
      res.send(element);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving ToDoElement.');
    }
  }
];


// Get all ToDoElements
module.exports.getToDoElements = async (req, res) => {
  try {
    const elements = await ToDoElement.find().exec();
    res.send(elements);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving ToDoElements.');
  }
};

// Save a new ToDoElement
module.exports.saveToDoElement = [
  body('name').customSanitizer((value) => value.trim()), // Usuwanie białych znaków z pola name
  body('description').customSanitizer((value) => value.trim()), // Usuwanie białych znaków z pola description
  validateField(body('name')), // Walidacja pola name
  validateField(body('description')), // Walidacja pola description
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    const element = new ToDoElement({ name, description });

    element
      .save()
      .then((data) => {
        console.log('Added Successfully...');
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error saving ToDoElement.');
      });
  }
];

// Delete a ToDoElement
module.exports.deleteToDoElement = [
  validateId('id'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    console.log('id ---> ', id);

    ToDoElement.findByIdAndDelete(id)
      .then(() => res.status(201).send('ToDoElement deleted successfully.'))
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error deleting ToDoElement.');
      });
  }
];

// Update a ToDoElement
module.exports.updateToDoElement = [
  validateId('id'),
  body('name').customSanitizer((value) => value.trim()), // Usuwanie białych znaków z pola name
  body('description').customSanitizer((value) => value.trim()), // Usuwanie białych znaków z pola description
  validateField(body('name')), // Walidacja pola name
  validateField(body('description')), // Walidacja pola description
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description } = req.body;

    ToDoElement.findByIdAndUpdate(id, { name, description })
      .then(() => res.status(201).send('ToDoElement updated successfully.'))
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error updating ToDoElement.');
      });
  }
];


// Get ToDoCategory
module.exports.getToDoCategory = [
  validateId('id'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
      const category = await ToDoCategory.findById(id);
      res.send(category);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving ToDoCategory.');
    }
  }
];

//Get ToDoCategory where element id is
module.exports.getToDoCategoryByElementID = [
  validateId('element_id'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { element_id } = req.params;
    try {
      const category = await ToDoCategory.findOne({ elements: element_id });
      res.send(category);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving ToDoCategory.');
    }
  }
];



// Get all ToDoCategories
module.exports.getToDoCategories = async (req, res) => {
    try {
        const categories = await ToDoCategory.find().exec();
        res.send(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving ToDoCategories.");
    }
};

// Save a new ToDoCategory
module.exports.saveToDoCategory = (req, res) => {
    const { name, description } = req.body;

    const category = new ToDoCategory({ name, description });

    category.save()
        .then((data) => {
            console.log("Added Successfully...");
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error saving ToDoCategory.");
        });
};

// Delete a ToDoCategory
module.exports.deleteToDoCategory = (req, res) => {
    const { id } = req.params;

    console.log('id ---> ', id);

    ToDoCategory.findByIdAndDelete(id)
        .then(() => res.status(201).send("ToDoCategory deleted successfully."))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error deleting ToDoCategory.");
        });
};

// Update a ToDoCategory
module.exports.updateToDoCategory = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    ToDoCategory.findByIdAndUpdate(id, { name, description })
        .then(() => res.status(201).send("ToDoCategory updated successfully."))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error updating ToDoCategory.");
        });
};

// Add a new element to an existing category
module.exports.addNewElementToCategory = (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
  
    ToDoCategory.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).send("Category not found.");
        }
  
        const newElement = new ToDoElement({ name, description });
  
        newElement.save()
          .then((element) => {
            category.elements.push(element);
            category.save()
              .then(() => res.status(201).send("New element added to category successfully."))
              .catch((err) => {
                console.log(err);
                res.status(500).send("Error adding new element to category.");
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error saving new element.");
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving category.");
      });
  };


// Add an element to an existing category
module.exports.addToDoElementToCategory = (req, res) => {
    const { elementId, categoryId } = req.params;
  
    ToDoCategory.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).send("Category not found.");
        }
  
        ToDoElement.findById(elementId)
          .then((element) => {
            if (!element) {
              return res.status(404).send("Element not found.");
            }
  
            category.elements.push(element);
            category.save()
              .then(() => res.status(201).send("Element added to category successfully."))
              .catch((err) => {
                console.log(err);
                res.status(500).send("Error adding element to category.");
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error retrieving element.");
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving category.");
      });
  };
