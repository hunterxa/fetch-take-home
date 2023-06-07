import { useLoaderData } from 'react-router-dom'
import { getDogs } from '../../api/search'
import './dogs.css'

export async function loader({ request }: { request: Request;}) {
  const params = new URL(request.url).searchParams;
  const res = await getDogs();
  return await res.json();
}

export default function Dogs() {
  const data = useLoaderData()
  {console.log(data)}
  return (
    <div>
        dogs
        
    </div>
  )
}