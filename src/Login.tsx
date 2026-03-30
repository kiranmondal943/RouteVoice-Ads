import React from 'react';

export default function Login() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>RouteVoice Ads</h1>
      <p>Please sign in to continue</p>
      <button onClick={() => window.location.href = '/'}>Mock Login</button>
    </div>
  );
}
