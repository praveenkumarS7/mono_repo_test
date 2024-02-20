
const Joi = require('joi');

const person = [
  { id: 0, name: "Luiz", age: 32 },
  { id: 1, name: "Peter", age: 26 },
];

const searchPeople = (req, res, next) => {
  if (!req.query.name) return next();

  const results = person.filter((person) =>
    person.name.includes(req.query.name)
  );
  return res.status(200).json(results);
};

const getAllPeople = (req, res, next) => {
  console.log("Olá, " + req.headers.username + " | Boas vindas!");
  return res.status(200).json(person);
};

const getById = (req, res, next) => {
  const { id } = req.params;
  const result = person.find((person) => person.id === parseInt(id, 10));

  if (!result) {
    return next({ status: 404, message: "Person not found" });
  }

  return res.status(200).json(result);
};

const createPeople = (req, res, next) => {
  const { name, age } = req.body;
  const id = person.length;

  person.push({ id, name, age });

  res.status(201).json({ id, name, age });
};

const testFunc = (req, res, next) => {
  console.log("testFunc ");
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_password: Joi.ref("password"),
    access_token: [Joi.string(), Joi.number()],
    birth_year: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  })
    .with("username", "birth_year")
    .xor("password", "access_token")
    .with("password", "repeat_password");

  const result = schema.validate({ username: "abc", birth_year: 1994 });

  res.status(201).json(result);
};

module.exports = {
  createPeople,
  searchPeople,
  getAllPeople,
  getById,
  testFunc
};
