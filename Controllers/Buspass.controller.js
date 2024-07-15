import Buspassmodel from '../Models/Buspass.model'

const calculateExpiryDate = (issueDate, passType) => {
    const date = new Date(issueDate);
    switch (passType) {
      case '1 month':
        date.setMonth(date.getMonth() + 1);
        break;
      case '3 months':
        date.setMonth(date.getMonth() + 3);
        break;
      case '6 months':
        date.setMonth(date.getMonth() + 6);
        break;
      case '1 year':
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        throw new Error('Invalid pass type');
    }
    return date;
};

const getPriceForPassType = (passType) => {
  const prices = {
    '1 month': 50,
    '3 months': 135,
    '6 months': 250,
    '1 year': 480,
  };

  return prices[passType];
};

export const getbuspassall = async (req, res) => {
    try {
      const busPasses = await Buspassmodel.find();
      res.status(200).send(busPasses);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
};

export const getbuspass = async (req, res) => {
    try {
      const busPass = await Buspassmodel.findById(req.params.id);
      if (!busPass) {
        return res.status(404).send({ error: 'Bus pass not found' });
      }
      res.status(200).send(busPass);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
};

export const Addnewbuspass = async (req, res) => {
    try {
      const { name, email, passType } = req.body;
      const issueDate = new Date();
      const expiryDate = calculateExpiryDate(issueDate, passType);
      const price = getPriceForPassType(passType);
  
      const busPass = new Buspassmodel({
        name,
        email,
        passType,
        issueDate,
        expiryDate,
        price
      });
  
      await busPass.save();
      res.status(201).send(busPass);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
};

export const Renewbuspass = async (req, res) => {
    try {
      const { passType } = req.body;
      const busPass = await Buspassmodel.findById(req.params.id);
  
      if (!busPass) {
        return res.status(404).send({ error: 'Bus pass not found' });
      }
  
      const newExpiryDate = calculateExpiryDate(busPass.expiryDate, passType);
      const newPrice = getPriceForPassType(passType);
  
      busPass.passType = passType;
      busPass.expiryDate = newExpiryDate;
      busPass.price = newPrice;
  
      await busPass.save();
      res.status(200).send(busPass);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
};
