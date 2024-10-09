import { ImageUploadEvent } from '@/types/cloudinary';
import { createContext, useEffect, useState } from 'react';

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({
  uwConfig,
  setPublicId,
  setImageUrl,
  setResponse,
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: ImageUploadEvent) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result);
            setImageUrl(result.info.secure_url); // Assuming setImageUrl takes the image URL
            setPublicId(result.info.public_id);
            setResponse(result.event);
          }
        }
      );

      document.getElementById('upload_widget')?.addEventListener(
        'click',
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        type="button"
        id="upload_widget"
        className=" bg-primary text-white font-medium text-sm py-2 px-3 cursor-pointer rounded-md"
        onClick={initializeCloudinaryWidget}
      >
        Upload receipt
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
