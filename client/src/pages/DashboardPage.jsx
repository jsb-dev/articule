import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function DashboardPage() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <h1>Root Page</h1>
      {isAuthenticated ? <p>Logged in</p> : <p>Not logged in</p>}
    </>
  );
}

export default DashboardPage;
