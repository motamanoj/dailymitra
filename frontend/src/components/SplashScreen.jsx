import React from 'react';
import LoadingScreen from './LoadingScreen';

/**
 * SplashScreen wrapper for backward compatibility with existing routes/components.
 * Directly delegates to the new LoadingScreen component.
 */
const SplashScreen = (props) => {
  return <LoadingScreen {...props} />;
};

export default SplashScreen;
