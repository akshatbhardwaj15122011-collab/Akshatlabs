export interface Light {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  baseIntensity: number;
  phase: number;
  speed: number;
}

class LightingEngine {
  lights: Light[] = [];
  mouseX = -1000;
  mouseY = -1000;
  width = 0;
  height = 0;
  subscribers = new Set<(lights: Light[], mx: number, my: number) => void>();
  private initialized = false;
  
  constructor() {
    // Initialization is deferred to avoid SSR issues
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Reduce number of lights on mobile for better performance
    const isMobile = this.width < 768;
    const numLights = isMobile ? 5 : 12;

    // Create lights
    for (let i = 0; i < numLights; i++) {
      this.lights.push({
        id: i,
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 150 + Math.random() * 200,
        r: 100 + Math.random() * 155, // 100-255
        g: 150 + Math.random() * 105, // 150-255
        b: 255,
        baseIntensity: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
      });
    }

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
      }
    }, { passive: true });
    
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });

    const loop = () => {
      this.update();
      this.subscribers.forEach(sub => sub(this.lights, this.mouseX, this.mouseY));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  update() {
    this.lights.forEach(l => {
      l.x += l.vx;
      l.y += l.vy;
      l.phase += l.speed;

      if (l.x < -l.radius) l.x = this.width + l.radius;
      if (l.x > this.width + l.radius) l.x = -l.radius;
      if (l.y < -l.radius) l.y = this.height + l.radius;
      if (l.y > this.height + l.radius) l.y = -l.radius;
    });
  }

  subscribe(callback: (lights: Light[], mx: number, my: number) => void) {
    if (!this.initialized) this.init();
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }
}

export const lightingEngine = new LightingEngine();
