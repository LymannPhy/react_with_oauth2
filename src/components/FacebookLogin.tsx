import React from 'react';

const FacebookLogin: React.FC = () => {
  const handleFacebookLogin = () => {
    const appId = "951278136768463"; 
    const redirectUri = `https://react-with-oauth2-u925-8h28n7mrv-lymannphys-projects.vercel.app/auth/facebook/callback`; 
    const scope = 'email public_profile';

    const facebookAuthUrl = `https://www.facebook.com/v14.0/dialog/oauth?` +
      `client_id=${encodeURIComponent(appId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}`;

    window.location.href = facebookAuthUrl;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
        <button
          onClick={handleFacebookLogin}
          className="flex items-center justify-center px-6 py-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.001 0C5.375 0 0 5.372 0 12c0 5.992 4.388 10.949 10.125 11.851v-8.378h-3.047v-3.473h3.047v-2.64c0-3.022 1.796-4.688 4.539-4.688 1.313 0 2.686.234 2.686.234v2.953h-1.514c-1.491 0-1.95.926-1.95 1.874v2.267h3.328l-.531 3.473h-2.797v8.378C19.612 22.95 24 17.993 24 12 24 5.372 18.627 0 12.001 0z"
            />
          </svg>
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default FacebookLogin;
