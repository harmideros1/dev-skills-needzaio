const fetch = require("node-fetch")

const HASURA_OPERATION = `
mutation signUp ($names: String!, $username: String!, $password: String!){
  insert_user_one(object: {
    names: $names,
    username: $username,
    password: $password
  }) {
    id
    names
    password
    username
  }
}
`;

// execute the parent operation in Hasura
const execute = async (variables, reqHeaders) => {
  const fetchResponse = await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: 'POST',
      headers: reqHeaders || {},
      body: JSON.stringify({
        query: HASURA_OPERATION,
        variables
      })
    }
  );
  return await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};
  

// Request Handler
const handler = async (req, res) => {

  // get request input
  const { names, username, password } = req.body.input;

  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await execute({ names, username, password }, req.headers);

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json({message: errors[0].message})
  }

  // success
  return res.status(201).json({
    ...data.insert_user_one
  })

};


module.exports = { handler }