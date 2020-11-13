const fetch = require("node-fetch")
const bcrypt = require("bcryptjs")

const HASURA_OPERATION = `
    query ($username: String!) {
        user(where: {username: {_eq: $username}}){
            password
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

const handler = async (req, res) => {

    console.log( req.body );
    // get request input
    const { username, password } = req.body.input;
    
    // execute the Hasura operation
    const { data, errors } = await execute({ username }, req.headers);
    
    // if Hasura operation errors, then throw error
    if (errors) {
        return res.status(400).json({message: errors[0].message})
    }
    
    // run some business logic
    let granted = false
    if (data.user.length > 0) granted = await bcrypt.compare(password, data.user[0].password)

    // success
    return res.json({
        granted: granted
    })
  
};
  
  
module.exports = { handler }