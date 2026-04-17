import { GoabBadge, GoabContainer, GoabGrid } from '@abgov/react-components'
import { Link } from 'react-router-dom'

export const HomeRoute = () => {

  return (
    <main>
      <h1>DS 2 Upgrade Scenarios</h1>
      <h3>
        A showcase of the design system components, pages, and other resources for service teams.  
      </h3>


      <ul>
        <li><Link to="/low-custom-low-debt">Low custom + Low debt</Link></li>
        <li><Link to="/low-custom-high-debt">Low custom + High debt</Link></li>
        
      </ul>

    </main>
  )
}
