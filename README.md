# Furaffinity Custom Image Viewer

Library for creating image elements on Furaffinity. Also see this Script on Github as [Furaffinity-Submission-Image-Viewer](https://greasyfork.org/de/scripts/492931-furaffinity-submission-image-viewer)

## How to use

- `@require` this script with the following url "https://github.com/Midori-Dragon/Furaffinity-Submission-Image-Viewer/blob/main/Furaffinity-Submission-Image-Viewer.user.js"
  <br/>
- Create a new Custom Image Viewer:
  ```
  const baseElem = document.createElement("div");
  const faImageViewer = new CustomImageViewer(imgSrc, prevSrc);
  faImageViewer.load(baseElem);
  ```
- _Optional:_ Subscribe to Events:
  ```
  faImageViewer.onImageLoad(() => doSomthing()); // occurs if the image is fully loaded
  faImageViewer.onImageLoadStart(() => doSomthing()); // occurs if the image started loading
  faImageViewer.onPreviewImageLoad(() => doSomthing()); // occurs if the preview image fully loaded
  ```

## Documentation

### CustomImageViewer

The CustomImageViewer class contains following Properties:
- `imageUrl` - the image url
- `previewUrl` - the preview image url
- `parentContainer` - the parent container on which the image will be created
- `faImage` - the image element
- `faImagePreview` - the preview image element
- `onImageLoad` - the callback for when the image is fully loaded
- `onImageLoadStart` - the callback for when the image starts loading
- `onPreviewImageLoad` - the callback for when the preview image is fully loaded
- `hasReset` - if the image has been reset

Functions:
- `load()` - starts loading the image
- `reset()` - resets the image
