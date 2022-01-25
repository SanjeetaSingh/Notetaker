import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

// imports from internal files
import cameraStyle from '../../../style/main-screens/camera'

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
      const options = { quality: 0.8, base64: true, skipProcessing: true };
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
    return <Text style={cameraStyle.text}>No access to camera</Text>;
  }

  //Shows the camera fucntionalities and calls on the functions above
  return (
    <View style={cameraStyle.container}>
      <Camera
        ref={cameraRef}
        style={cameraStyle.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}

      />

      <View style={cameraStyle.container}>
        {/* If the camera previw is true then show the close button call on the function */}
        {isPreview && (
          <TouchableOpacity
            onPress={backPreview}
            style={cameraStyle.closeButton}
            activeOpacity={0.7}>
            <Ionicons name="close-circle-sharp" size={50} color="red" />
          </TouchableOpacity>
        )}
        {/* If the camera preview is false then let the user take a image and call on the functions */}
        {!isPreview && (
          <View style={cameraStyle.bottomButtonsContainer}>
            <TouchableOpacity disabled={!isCameraReady} onPress={flipCamera} style={cameraStyle.flip}>
              <MaterialIcons name='flip-camera-ios' size={30} color='white' />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} disabled={!isCameraReady} onPress={takenPhoto} style={cameraStyle.capture} >
              <Ionicons name="ios-radio-button-on-outline" size={90} color="white" />
            </TouchableOpacity>

          </View>
        )}
      </View>
    </View>
  );
}

export default camera;