import { 
  Form, 
  redirect, 
  useActionData,
  useLoaderData
} from 'react-router-dom'
import { login } from '../../api/auth'
import catchHome from '../../assets/catch_home.png'
import '../../App.css'
import './home.css'

export async function loader({ request }) {
  const params = new URL(request.url).searchParams;
  const message = params.get("message")
  return { message }
}

export async function action({ request }) {
  // const redirectTo = new URL(request.url).searchParams.get("redirectTo")
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')


  //If login fails or input is bad, return an error to be displayed to the user
  if (name && email) {
      const res = await login(name, email);
      if (res.status === 200) {
        console.log("Login successful");
        return redirect("/dogs?size=10");
      } else {
        console.log("Login failed", res.status)
        return new Error("Login failed");
      }
  } else {
    return new Error("Please enter both a name and email");
  }
}

export default function Home() {
  const data = useLoaderData();
  const errors = useActionData();

  return (
    <div className="home-page">
      <div className="home-page-content">
        <img src={catchHome} alt="Dog running happily" className="home-page-image" />
        <h1 className="home-page-title">Catch!</h1>
        <p className="home-page-tagline">Fetch a dog to take home!</p>
      </div>
      <div className="login-container">
        <div className="login-container-header">
          <p>Login to find your Catch!</p>
        </div>
        <div className="login-container-body">
            {data?.message && <h3 className="login-message">{data.message}</h3>}
            {errors?.message && <h3 className="login-error">{errors.message}</h3>}
            <Form
              method="POST"
              className="login-form"
            >
              <label className="form-label" htmlFor="name">Name</label>
              <input className="form-input" type="text" name="name" placeholder="John Smith" />

              <label className="form-label login-lower-input" htmlFor="email">Email</label>
              <input className="form-input" type="text" name="email" placeholder="email@example.com" />

              <button className="submit-button login-submit" type="submit">Submit</button>
            </Form>
        </div>
      </div>
    </div>
  )
}