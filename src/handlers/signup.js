const fetch = require("node-fetch")
const bcrypt = require("bcryptjs")

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
  const api_url = process.env.HASURA_BASE_URL || "https://fine-koi-82.hasura.app/v1/graphql"
  console.log("api_url: ",  api_url);
  const fetchResponse = await fetch(
    api_url,
    {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        query: HASURA_OPERATION,
        variables
      })
    }
  );

  return await fetchResponse.json();
};
  

// Request Handler
const handler = async (req, res) => {

  // get request input
  const { names, username, password } = req.body.input;

  // run some business logic
  let hashPassword = await bcrypt.hash(password, 10);

  // execute the Hasura operation
  const { data, errors } = await execute({ names, username, password: hashPassword }, req.headers);

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json({message: errors[0].message})
  }

  // success
  return res.status(201).json({
    id: data.insert_user_one.id,
    username: data.insert_user_one.username,
    names: data.insert_user_one.names
  })

};


module.exports = { handler }