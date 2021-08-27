import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

//Constants for the dimensions fo the camera screen
const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

  /**
  * Function creates the add photo screen that 
  * uses the camera component to let use to take photos
  * and save them. 
  * 
  * @returns the camera user takes a photo with.
  */

const camera = function(){
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    onHandlePermission();
  }, []);

  //Checking if the user has allowed camera access
  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  //Boolean to notify that the camera is ready
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  //Flips the camera 
  const flipCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  //Function lets the user take a photo
  const takenPhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };

  //Lets the user cancel out of the preview
  const backPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  //If the permission is denied then nothing to show
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  //Shows the camera fucntionalities and calls on the functions above
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />
      <View style={styles.container}>
        {isPreview && (
          <TouchableOpacity
            onPress={backPreview}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <AntDesign name='close' size={32} color='#fff' />
          </TouchableOpacity>
        )}
        {!isPreview && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity disabled={!isCameraReady} onPress={flipCamera}>
              <MaterialIcons name='flip-camera-ios' size={28} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={takenPhoto}
              style={styles.capture}
            />
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Styling for the camera screen.
 */
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    marginHorizontal:8,
    marginBottom:8,
    marginTop:8,
  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AC4F8',
    opacity: 0.7
  },
  capture: {
    backgroundColor: 'white',
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30,
  }
});

export default camera;