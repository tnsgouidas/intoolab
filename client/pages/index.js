import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Welcome {currentUser.email}</h1> : <h1>you need to log in</h1>
};

LandingPage.getInitialProps = async (context) => {
  console.log('LANDINGPAGE')
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;