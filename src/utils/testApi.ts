import api from '../api/axios';

export const testApiEndpoints = async () => {
  try {
    // Test public endpoint
    const pingResponse = await api.get('/test/ping');
    console.log('Ping test:', pingResponse.data);

    // Test protected endpoint (requires authentication)
    const protectedResponse = await api.get('/test/protected');
    console.log('Protected endpoint test:', protectedResponse.data);

    return {
      success: true,
      ping: pingResponse.data,
      protected: protectedResponse.data
    };
  } catch (error) {
    console.error('API test failed:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};