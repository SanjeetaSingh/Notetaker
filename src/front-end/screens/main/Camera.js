import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

//Constants for the dimensions fo the camera screen
const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

/**
* Function creates the add photo screen that 
* uses the camera component to let users to take photos
* and save them locally to their gallery. 
* 
* @returns the camera user takes a photo with.
*/

const camera = function () {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    onHandlePermission();
  }, []);

  
  /**
   * Checking if the user has allowed camera access
   */
  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };


  /**
   * Boolean to notify that the camera is ready
   */
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  /**
   * Function is to flip the camera facing
   * back or facing forward.
   * 
   * @returns 
   */
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

  /**
   * Function lets the user take a photo and 
   * store the image to the users gallery after 
   * they are given permisson.
   */
  const takenPhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8, base64: true, skipProcessing: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const asset = await MediaLibrary.createAssetAsync(data.uri);

      //Saves the photo to gallery when photo is taken 
      const source = asset;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setIsCameraReady(true);
        alert("Your image you have taken is saved to your gallery!")
      } 
    }
  };

  /**
   * Function lets user cancel out of the preview
   */
  const backPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  //If the permission is denied then nothing to show
  if (hasPermission === null) {
    return <View />;
  }
  //The user is shown that they do not have access
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
        {/* If the camera previw is true then show the close button call on the function */}
        {isPreview && (
          <TouchableOpacity
            onPress={backPreview}
            style={styles.closeButton}
            activeOpacity={0.7}>
            <AntDesign name='close' size={32} color='#fff' />
          </TouchableOpacity>
        )}
        {/* If the camera preview is false then let the user take a image and call on the functions */}
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
    marginHorizontal: 8,
    marginBottom: 8,
    marginTop: 8,
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
  },
});

export default camera;