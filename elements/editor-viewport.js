Polymer
({
  is: "editor-viewport",

  // member variables
  properties:
  {
    width: { type: Number, value: 0 },
    height: { type: Number, value: 0 },
    renderer: { type: Object, value: new THREE.WebGLRenderer() },
    scene: { type: Object, value: new THREE.Scene() },
    camera: { type: Object, value: new THREE.PerspectiveCamera() },
    mesh: { type: Object, value: new THREE.Mesh() }
  },

  // public methods
  init: function()
  {
    this.width = this.offsetWidth;
    this.height = this.offsetHeight;

    this.init_renderer(this.width, this.height);
    this.init_camera(60.0, this.width / this.height, 0.1, 1000.0);
    this.init_scene();
  },

  init_renderer: function(width, height)
  {
    this.renderer.setSize(width, height);

    this.appendChild(this.renderer.domElement);
  },

  init_camera: function(fov, aspect, near, far, position)
  {
    this.camera.fov = fov;
    this.camera.aspect = aspect;
    this.camera.near = near;
    this.camera.far = far;
    this.camera.updateProjectionMatrix();

    this.camera.position.copy(new THREE.Vector3(0.0, 0.0, 10.0));
  },

  init_scene: function()
  {
    var geometry = new THREE.BoxGeometry(3.0, 3.0, 3.0);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.mesh.geometry = geometry;
    this.mesh.material = material;

    this.scene.add(this.mesh);
  },

  render: function() { this.renderer.render(this.scene, this.camera); },

  // fires when the element is inserted into the document
  attached: function()
  {
    this.init();
    this.render();
  }
});