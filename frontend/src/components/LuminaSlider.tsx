import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const THREE: any;

// Portfolio images from the project
import work1 from '@/assets/portfolio/work-1.jpg';
import work2 from '@/assets/portfolio/work-2.jpg';
import work3 from '@/assets/portfolio/work-3.jpg';
import work4 from '@/assets/portfolio/work-4.jpg';
import work5 from '@/assets/portfolio/work-5.jpg';
import work6 from '@/assets/portfolio/work-6.jpg';

const slides = [
  { title: "Ethereal Glow", description: "Мягкий, сияющий свет, освещающий душу.", media: work1 },
  { title: "Rose Mirage", description: "Затерянный в пустыне цветущих грёз.", media: work2 },
  { title: "Velvet Mystique", description: "Окутанный глубоким объятием ночи.", media: work3 },
  { title: "Golden Hour", description: "Мимолётный момент, когда мир покрыт золотом.", media: work4 },
  { title: "Midnight Dreams", description: "Где реальность исчезает и воображение взлетает.", media: work5 },
  { title: "Silver Light", description: "Холодный металлический блеск городского пульса.", media: work6 }
];

const LuminaSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadScripts = async () => {
      const loadScript = (src: string, globalName: string) => new Promise<void>((res, rej) => {
        if ((window as any)[globalName]) { res(); return; }
        if (document.querySelector(`script[src="${src}"]`)) {
          const check = setInterval(() => {
            if ((window as any)[globalName]) { clearInterval(check); res(); }
          }, 50);
          setTimeout(() => { clearInterval(check); rej(new Error(`Timeout waiting for ${globalName}`)); }, 10000);
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { setTimeout(() => res(), 100); };
        s.onerror = () => rej(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
      } catch (e) {
        console.error('Failed to load scripts:', e);
        return;
      }
      
      initApplication();
    };

    const initApplication = () => {
      const SLIDER_CONFIG = {
        settings: {
          transitionDuration: 2.5,
          autoSlideSpeed: 5000,
          globalIntensity: 1.0,
          speedMultiplier: 1.0,
          distortionStrength: 1.0,
          glassRefractionStrength: 1.0,
          glassChromaticAberration: 1.0,
          glassBubbleClarity: 1.0,
          glassEdgeGlow: 1.0,
          glassLiquidFlow: 1.0,
        }
      };

      let currentSlideIndex = 0;
      let isTransitioning = false;
      let shaderMaterial: any, renderer: any, scene: any, camera: any;
      let slideTextures: any[] = [];
      let texturesLoaded = false;
      let autoSlideTimer: any = null;
      let progressAnimation: any = null;
      let sliderEnabled = false;

      const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
      const PROGRESS_UPDATE_INTERVAL = 50;
      const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

      const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
      const fragmentShader = `
        uniform sampler2D uTexture1, uTexture2;
        uniform float uProgress;
        uniform vec2 uResolution, uTexture1Size, uTexture2Size;
        uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength;
        uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
        varying vec2 vUv;

        vec2 getCoverUV(vec2 uv, vec2 textureSize) {
          vec2 s = uResolution / textureSize;
          float scale = max(s.x, s.y);
          vec2 scaledSize = textureSize * scale;
          vec2 offset = (uResolution - scaledSize) * 0.5;
          return (uv * uResolution - offset) / scaledSize;
        }

        vec4 glassEffect(vec2 uv, float progress) {
          float time = progress * 5.0 * uSpeedMultiplier;
          vec2 uv1 = getCoverUV(uv, uTexture1Size);
          vec2 uv2 = getCoverUV(uv, uTexture2Size);
          float maxR = length(uResolution) * 0.85;
          float br = progress * maxR;
          vec2 p = uv * uResolution;
          vec2 c = uResolution * 0.5;
          float d = length(p - c);
          float nd = d / max(br, 0.001);
          float param = smoothstep(br + 3.0, br - 3.0, d);
          vec4 img;
          if (param > 0.0) {
            float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
            vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
            vec2 distUV = uv2 - dir * ro;
            distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
            float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
            img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
            if (uGlassEdgeGlow > 0.0) {
              float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
              img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
            }
          } else {
            img = texture2D(uTexture2, uv2);
          }
          vec4 oldImg = texture2D(uTexture1, uv1);
          if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
          return mix(oldImg, img, param);
        }

        void main() {
          gl_FragColor = glassEffect(vUv, uProgress);
        }
      `;

      const splitText = (text: string) => {
        return text.split('').map(char => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      };

      const updateContent = (idx: number) => {
        const titleEl = document.getElementById('luminaMainTitle');
        const descEl = document.getElementById('luminaMainDesc');
        if (titleEl && descEl) {
          gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
          gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });
          
          setTimeout(() => {
            titleEl.innerHTML = splitText(slides[idx].title);
            descEl.textContent = slides[idx].description;
            
            gsap.set(titleEl.children, { opacity: 0, y: 20 });
            gsap.set(descEl, { y: 20, opacity: 0 });
            gsap.to(titleEl.children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
            gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
          }, 500);
        }
      };

      const navigateToSlide = (targetIndex: number) => {
        if (isTransitioning || targetIndex === currentSlideIndex) return;
        stopAutoSlideTimer();
        quickResetProgress(currentSlideIndex);
        
        const currentTexture = slideTextures[currentSlideIndex];
        const targetTexture = slideTextures[targetIndex];
        if (!currentTexture || !targetTexture) return;

        isTransitioning = true;
        shaderMaterial.uniforms.uTexture1.value = currentTexture;
        shaderMaterial.uniforms.uTexture2.value = targetTexture;
        shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
        shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;
        
        updateContent(targetIndex);
        currentSlideIndex = targetIndex;
        updateCounter(currentSlideIndex);
        updateNavigationState(currentSlideIndex);
        
        gsap.fromTo(shaderMaterial.uniforms.uProgress, 
          { value: 0 },
          {
            value: 1,
            duration: TRANSITION_DURATION(),
            ease: "power2.inOut",
            onComplete: () => {
              shaderMaterial.uniforms.uProgress.value = 0;
              shaderMaterial.uniforms.uTexture1.value = targetTexture;
              shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
              isTransitioning = false;
              safeStartTimer(100);
            }
          }
        );
      };

      const handleSlideChange = () => {
        if (isTransitioning || !texturesLoaded || !sliderEnabled) return;
        navigateToSlide((currentSlideIndex + 1) % slides.length);
      };

      const createSlidesNavigation = () => {
        const nav = document.getElementById("luminaSlidesNav");
        if (!nav) return;
        nav.innerHTML = "";
        slides.forEach((slide, i) => {
          const item = document.createElement("div");
          item.className = `lumina-slide-nav-item${i === 0 ? " active" : ""}`;
          item.dataset.slideIndex = String(i);
          item.innerHTML = `
            <div class="lumina-slide-progress"><div class="lumina-slide-progress-fill"></div></div>
            <span class="lumina-slide-title">${slide.title}</span>
          `;
          item.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isTransitioning && i !== currentSlideIndex) {
              stopAutoSlideTimer();
              quickResetProgress(currentSlideIndex);
              navigateToSlide(i);
            }
          });
          nav.appendChild(item);
        });
      };

      const updateNavigationState = (idx: number) => {
        document.querySelectorAll(".lumina-slide-nav-item").forEach((el, i) => {
          el.classList.toggle("active", i === idx);
        });
      };

      const updateSlideProgress = (idx: number, prog: number) => {
        const el = document.querySelectorAll(".lumina-slide-nav-item")[idx]?.querySelector(".lumina-slide-progress-fill") as HTMLElement;
        if (el) {
          el.style.width = `${prog}%`;
          el.style.opacity = '1';
        }
      };

      const quickResetProgress = (idx: number) => {
        const el = document.querySelectorAll(".lumina-slide-nav-item")[idx]?.querySelector(".lumina-slide-progress-fill") as HTMLElement;
        if (el) {
          el.style.transition = "width 0.2s ease-out";
          el.style.width = "0%";
          setTimeout(() => el.style.transition = "width 0.1s ease, opacity 0.3s ease", 200);
        }
      };

      const updateCounter = (idx: number) => {
        const sn = document.getElementById("luminaSlideNumber");
        if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
        const st = document.getElementById("luminaSlideTotal");
        if (st) st.textContent = String(slides.length).padStart(2, "0");
      };

      const startAutoSlideTimer = () => {
        if (!texturesLoaded || !sliderEnabled) return;
        stopAutoSlideTimer();
        let progress = 0;
        const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
        progressAnimation = setInterval(() => {
          if (!sliderEnabled) { stopAutoSlideTimer(); return; }
          progress += increment;
          updateSlideProgress(currentSlideIndex, progress);
          if (progress >= 100) {
            clearInterval(progressAnimation);
            progressAnimation = null;
            if (!isTransitioning) handleSlideChange();
          }
        }, PROGRESS_UPDATE_INTERVAL);
      };

      const stopAutoSlideTimer = () => {
        if (progressAnimation) clearInterval(progressAnimation);
        if (autoSlideTimer) clearTimeout(autoSlideTimer);
        progressAnimation = null;
        autoSlideTimer = null;
      };

      const safeStartTimer = (delay = 0) => {
        stopAutoSlideTimer();
        if (sliderEnabled && texturesLoaded) {
          if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
          else startAutoSlideTimer();
        }
      };

      const loadImageTexture = (src: string) => new Promise((resolve, reject) => {
        const l = new THREE.TextureLoader();
        l.load(src, (t: any) => {
          t.minFilter = t.magFilter = THREE.LinearFilter;
          t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
          resolve(t);
        }, undefined, reject);
      });

      const initRenderer = async () => {
        const canvas = document.querySelector(".lumina-webgl-canvas") as HTMLCanvasElement;
        if (!canvas) return;
        
        const container = canvas.parentElement;
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTexture1: { value: null },
            uTexture2: { value: null },
            uProgress: { value: 0 },
            uResolution: { value: new THREE.Vector2(width, height) },
            uTexture1Size: { value: new THREE.Vector2(1, 1) },
            uTexture2Size: { value: new THREE.Vector2(1, 1) },
            uGlobalIntensity: { value: 1.0 },
            uSpeedMultiplier: { value: 1.0 },
            uDistortionStrength: { value: 1.0 },
            uGlassRefractionStrength: { value: 1.0 },
            uGlassChromaticAberration: { value: 1.0 },
            uGlassBubbleClarity: { value: 1.0 },
            uGlassEdgeGlow: { value: 1.0 },
            uGlassLiquidFlow: { value: 1.0 },
          },
          vertexShader,
          fragmentShader
        });
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));
        
        for (const s of slides) {
          try {
            slideTextures.push(await loadImageTexture(s.media));
          } catch {
            console.warn("Failed to load texture");
          }
        }
        
        if (slideTextures.length >= 2) {
          shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
          shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
          shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
          shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
          texturesLoaded = true;
          sliderEnabled = true;
          document.querySelector(".lumina-slider-wrapper")?.classList.add("loaded");
          safeStartTimer(500);
        }
        
        const render = () => {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
        };
        render();
        
        const handleResize = () => {
          if (!container || !renderer) return;
          const newWidth = container.clientWidth;
          const newHeight = container.clientHeight;
          renderer.setSize(newWidth, newHeight);
          shaderMaterial.uniforms.uResolution.value.set(newWidth, newHeight);
        };
        
        window.addEventListener("resize", handleResize);
      };
      
      createSlidesNavigation();
      updateCounter(0);
      
      const tEl = document.getElementById('luminaMainTitle');
      const dEl = document.getElementById('luminaMainDesc');
      if (tEl && dEl) {
        tEl.innerHTML = splitText(slides[0].title);
        dEl.textContent = slides[0].description;
        gsap.fromTo(tEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.5 });
        gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });
      }

      initRenderer();
      
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopAutoSlideTimer();
        else if (!isTransitioning) safeStartTimer();
      });
    };

    loadScripts();
  }, []);

  return (
    <section className="lumina-section">
      <div className="lumina-slider-wrapper" ref={containerRef}>
        {/* Counter */}
        <div className="lumina-counter">
          <span id="luminaSlideNumber" className="lumina-counter-current">01</span>
          <span className="lumina-counter-separator">/</span>
          <span id="luminaSlideTotal" className="lumina-counter-total">06</span>
        </div>

        {/* Canvas */}
        <div className="lumina-canvas-container">
          <canvas className="lumina-webgl-canvas"></canvas>
        </div>

        {/* Content Overlay */}
        <div className="lumina-content-overlay">
          <div className="lumina-text-content">
            <h2 id="luminaMainTitle" className="lumina-title"></h2>
            <p id="luminaMainDesc" className="lumina-description"></p>
          </div>
        </div>

        {/* Navigation */}
        <div id="luminaSlidesNav" className="lumina-slides-nav"></div>
      </div>
    </section>
  );
};

export default LuminaSlider;
