var Promise = require('promise-polyfill'),
    THREE = require('three');

var { loading } = require('../view/notification');

var ImagePromise = function (url) {
    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        var img = new Image();
        var asyncId = loading.start();

        xhr.addEventListener('load', function () {
            if (this.status === 200) {
                var blob = this.response;
                img.addEventListener('load', function () {
                    loading.stop(asyncId);
                    window.URL.revokeObjectURL(img.src); // Clean up after ourselves.
                    resolve(img);
                });
                img.src = window.URL.createObjectURL(blob);
            } else {
                loading.stop(asyncId);
                reject(Error(xhr.statusText));
            }
        });

        xhr.addEventListener('error', function() {
            loading.stop(asyncId);
            reject(Error("Network Error"));
        });

        xhr.addEventListener('abort', function() {
            loading.stop(asyncId);
            reject(Error("Aborted"));
        });

        xhr.send();
    });
};

var TexturePromise = function (url) {
    var texture = new THREE.Texture(undefined, new THREE.UVMapping());
    texture.sourceFile = url;

    return ImagePromise(url).then(function(image) {
            texture.image = image;
            texture.needsUpdate = true;
            return texture;
    });
};

var MaterialPromise = function(url) {
    return TexturePromise(url).then(function (texture) {
        return new THREE.MeshBasicMaterial({map: texture});
    });
};

module.exports = MaterialPromise;
