const { body,check,validationResult } = require('express-validator');
const validateUser = [
body('emp_id').isLength({ min: 3 }),
body('empname').isLength({ min: 4 }),
 body('salary').isLength({ min: 4 }),
body('age').isLength({ max: 2 }) ,
body('designation').isLength({ min: 4 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

module.exports = validateUser;