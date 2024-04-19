// ==UserScript==
// @name        Furaffinity-Submission-Image-Viewer
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.0.1
// @author      Midori Dragon
// @description Library for creating custom image elements on Furaffinity
// @icon        https://www.furaffinity.net/themes/beta/img/banners/fa_logo.png?v2
// @homepageURL https://greasyfork.org/de/scripts/492931-furaffinity-submission-image-viewer
// @supportURL  https://greasyfork.org/de/scripts/492931-furaffinity-submission-image-viewer/feedback
// @license     MIT
// ==/UserScript==

// jshint esversion: 8

(() => {
    class CustomImageViewer {
        constructor(imageUrl, previewUrl) {
            this.imageUrl = imageUrl;
            this.previewUrl = previewUrl;
            this.parentContainer;
            this.faImage;
            this.faImagePreview;

            this.onImageLoad;
            this.onImageLoadStart;
            this.onPreviewImageLoad;

            this.reset();
            this.hasReset = true;
        }

        reset() {
            if (!this.faImage) {
                this.faImage = document.createElement('img', { is: 'fa-image' });
                this.faImage.addEventListener("load", () => {
                    this.faImagePreview.parentNode.removeChild(this.faImagePreview);
                    this.parentContainer.appendChild(this.faImage);
                    this.faImage.style.visibility = "visible";
                    this.hasReset = false;
                    if (this.onImageLoad)
                        this.onImageLoad();
                });
            }
            this.faImage.src = this.imageUrl;
            this.faImage.dataPreviewSrc = this.previewUrl;
            this.faImage.style.visibility = "hidden";
            this.faImage.style.objectFit = "cover";

            if (this.previewUrl) {
                if (!this.faImagePreview)
                    this.faImagePreview = document.createElement('img', { is: 'fa-image' });
                this.faImagePreview.src = this.previewUrl;
                this.faImagePreview.style.objectFit = "cover";
                this.faImagePreview.style.imageRendering = "pixelated";
                this.faImagePreview.addEventListener("load", () => {
                    if (this.onPreviewImageLoad)
                        this.onPreviewImageLoad();
                });
            }
        }

        async load(parentContainer) {
            if (parentContainer)
                this.parentContainer = parentContainer;
            if (this.hasReset === false)
                this.reset();

            const invisibleContainer = document.createElement('div');
            invisibleContainer.style.width = "0px";
            invisibleContainer.style.height = "0px";
            invisibleContainer.style.overflow = "hidden";
            invisibleContainer.appendChild(this.faImage);
            document.body.appendChild(invisibleContainer);
            if (this.previewUrl) {
                await new Promise((resolve, reject) => {
                    const intervalId = setInterval(() => {
                        if (this.faImage.offsetWidth != 0) {
                            clearInterval(intervalId);
                            this.faImagePreview.style.width = this.faImage.offsetWidth + "px";
                            this.faImagePreview.style.height = this.faImage.offsetHeight + "px";
                            parentContainer.appendChild(this.faImagePreview);
                            if (this.onImageLoadStart)
                                this.onImageLoadStart();
                            resolve();
                        }
                    }, 10);
                });
            }
        }
    }

    class FAImage extends HTMLImageElement {
        constructor() {
            super();
        }

        get dataFullviewSrc() {
            return this.getAttribute('data-fullview-src');
        }
        set dataFullviewSrc(value) {
            this.setAttribute('data-fullview-src', value);
        }

        get dataPreviewSrc() {
            return this.getAttribute('data-preview-src');
        }
        set dataPreviewSrc(value) {
            this.setAttribute('data-preview-src', value);
        }

        set src(value) {
            super.src = value;
            this.dataFullviewSrc = value;
        }
    }
    customElements.define('fa-image', FAImage, { extends: 'img' });
    window.CustomImageViewer = CustomImageViewer;
})();
