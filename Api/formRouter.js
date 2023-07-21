const Form = require('../Database/model/formModel');

exports.saveFormData = async (req, res) => {
  const { firstName, role, lastName, contactNo, country, email, password } = req.body;

  try {
    const existingForm = await Form.findOne({ email });

    if (existingForm) {
      return res.send({ success: false, message: 'Email already exists' });
    }

    const newForm = new Form({ firstName, role, lastName, contactNo, country, email, password, fullName: `${firstName} ${lastName}` });
    await newForm.save();
    // const user = await Form.findOne({ email })
    res.send({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
