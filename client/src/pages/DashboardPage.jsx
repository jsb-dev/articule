import React, { useEffect } from 'react';
import Flow from '../components/diagram/Flow';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Get the user's diagram data from the database
  // set initialNodes and initialEdges based on what's returned

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    isAuthenticated && (
      <div>
        <section>
          <h1>Dashboard Page</h1>
        </section>
        <section
          style={{
            width: '80vw',
            height: '80vh',
          }}
        >
          {
            // <Flow intialNodes={} initialEdges={}/>
          }
        </section>
      </div>
    )
  );
}

export default DashboardPage;
