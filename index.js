// Create a new THREE.Scene object and set its alpha property to true.
const scene = new THREE.Scene();
scene.alpha = true;

// Create a new THREE.PerspectiveCamera object with specified parameters.
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

// Create a new THREE.WebGLRenderer object with alpha set to true.
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Set the size of the renderer to match the window's inner dimensions.
renderer.setSize(window.innerWidth, window.innerHeight);

// Append the renderer's DOM element to the document body.
document.body.appendChild(renderer.domElement);

// Create a new THREE.GLTFLoader object.
const loader = new THREE.GLTFLoader();

// Define a variable "model" to hold the loaded 3D model later.
let model;

// Define an asynchronous function "loadModelAndTextures" to load the 3D model and textures.
async function loadModelAndTextures() {
	try {
		// Load the 3D model file './350zrachels.glb' using the GLTFLoader and await for it to finish loading.
		const gltf = await loader.loadAsync('./car.glb');
		// Assign the loaded model to the "model" variable.
		model = gltf.scene;
		// Add the loaded model to the scene.
		scene.add(model);
		console.log(gltf);
		// Set the camera's position to z = 5.
		camera.position.z = 5;

		// Create an OrbitControls object to enable camera movement and attach it to the renderer's DOM element.
		new THREE.OrbitControls(camera, renderer.domElement);

		// Create a new DirectionalLight object with white color (0xffffff) and intensity 14.0.
		const light = new THREE.DirectionalLight(0xffffff, 5.0);

		// Set the position of the light to (2, 10, 1) and the target position to (0, 0, 0).
		light.position.set(2, 10, 1);
		light.target.position.set(0, 0, 0);

		// Add the light and its target to the scene.
		scene.add(light);
		scene.add(light.target);

		// Define an "animate" function that renders the scene using the renderer and camera and calls itself recursively with requestAnimationFrame to create animation.
		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}

		// Call the "animate" function to start the animation loop.
		animate();
	} catch (error) {
		// Catch and log any errors that occur during loading.
		console.error('Error loading the model:', error);
	}
}

// Call the "loadModelAndTextures" function to initiate the loading of the 3D model and textures.
loadModelAndTextures();
