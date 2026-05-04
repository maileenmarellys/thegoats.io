// ================================
// INIT
// ================================
document.addEventListener("DOMContentLoaded", function () {
  loadData();
  initTerminal();
  injectStyles();
  initCardGlow();
  initModalClose();
});

// ================================
// ESTILOS DINÁMICOS INYECTADOS
// ================================
function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `

    /* ── CARDS NEÓN HOVER ── */
    .feature-card:hover {
      border-color: #9fef00 !important;
      box-shadow: 0 0 0 1px #9fef00,
                  0 0 18px rgba(159,239,0,0.25),
                  0 18px 40px rgba(0,0,0,0.5) !important;
      transform: translateY(-5px);
    }
    .machine-card:hover {
      border-color: #9fef00 !important;
      box-shadow: 0 0 0 1px #9fef00,
                  0 0 18px rgba(159,239,0,0.3),
                  0 14px 32px rgba(0,0,0,0.6) !important;
      transform: translateY(-5px);
    }
    .track-card:hover {
      border-color: #9fef00 !important;
      box-shadow: 0 0 0 1px #9fef00,
                  0 0 18px rgba(159,239,0,0.2),
                  0 14px 36px rgba(0,0,0,0.4) !important;
      transform: translateY(-5px);
    }
    .lb-row:not(:first-child):hover {
      box-shadow: inset 0 0 0 1px rgba(159,239,0,0.15) !important;
    }
    .feature-card:hover .f-icon {
      background: rgba(159,239,0,0.16) !important;
      box-shadow: 0 0 16px rgba(159,239,0,0.2);
    }

    /* ── GLOW ANIMADO AL ENTRAR EN VIEWPORT ── */
    @keyframes cardGlowPulse {
      0%,100% { box-shadow: 0 0 0 1px #9fef00, 0 0 12px rgba(159,239,0,0.2); }
      50%      { box-shadow: 0 0 0 1px #9fef00, 0 0 28px rgba(159,239,0,0.5); }
    }
    .card-glow-active {
      border-color: #9fef00 !important;
      animation: cardGlowPulse 1.8s ease-in-out;
    }

    /* ── MODAL OVERLAY ── */
    #auth-modal {
      display: none;
      position: fixed;
      z-index: 2000;
      inset: 0;
      background: rgba(0,0,0,0.88);
      backdrop-filter: blur(8px);
      align-items: center;
      justify-content: center;
    }
    #auth-modal .modal-content {
      background: #0f0f0f;
      border: 1px solid rgba(159,239,0,0.35);
      border-radius: 18px;
      width: 90%;
      max-width: 420px;
      padding: 2.4rem 2.2rem 2rem;
      position: relative;
      box-shadow: 0 0 60px rgba(159,239,0,0.1), 0 40px 80px rgba(0,0,0,0.7);
      animation: modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes modalIn {
      from { opacity:0; transform:scale(0.88) translateY(20px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }

    /* Logo dentro del modal */
    .modal-logo {
      display:flex; align-items:center; gap:10px; margin-bottom:1.8rem;
    }
    .modal-logo-icon {
      width:34px; height:34px; background:#9fef00; border-radius:7px;
      display:flex; align-items:center; justify-content:center;
    }
    .modal-logo-icon svg { width:18px; height:18px; }
    .modal-logo-text {
      font-family:'Space Mono',monospace; font-size:13px;
      font-weight:700; color:#f8f8f8; letter-spacing:1px;
    }
    .modal-logo-text span { color:#9fef00; }

    /* Tabs */
    .modal-tabs {
      display:flex; background:#1a1a1a; border-radius:10px;
      padding:4px; margin-bottom:1.8rem; gap:4px;
    }
    .modal-tab {
      flex:1; padding:9px 0; text-align:center; border-radius:7px;
      font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:700;
      letter-spacing:0.5px; cursor:pointer; border:none;
      transition:all 0.25s; color:#6b7280; background:transparent;
    }
    .modal-tab.active {
      background:#9fef00; color:#000;
      box-shadow:0 0 16px rgba(159,239,0,0.4);
    }

    /* Campos */
    .modal-field { position:relative; margin-bottom:12px; }
    .modal-field-icon {
      position:absolute; left:13px; top:50%;
      transform:translateY(-50%); font-size:14px;
      pointer-events:none; opacity:0.55;
    }
    .modal-field input {
      width:100%; padding:12px 14px 12px 40px;
      background:#1a1a1a; border:1px solid rgba(255,255,255,0.08);
      border-radius:9px; color:#f8f8f8;
      font-family:'Rajdhani',sans-serif; font-size:15px;
      transition:border-color 0.2s,box-shadow 0.2s; outline:none;
    }
    .modal-field input:focus {
      border-color:#9fef00;
      box-shadow:0 0 0 3px rgba(159,239,0,0.12);
    }
    .modal-field input::placeholder { color:#4b5563; }

    /* Botón submit */
    .modal-submit {
      width:100%; padding:13px; background:#9fef00; color:#000;
      border:none; border-radius:9px;
      font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:700;
      letter-spacing:0.5px; cursor:pointer; margin-top:6px;
      transition:all 0.2s; position:relative; overflow:hidden;
    }
    .modal-submit:hover {
      background:#b5ff00; transform:translateY(-1px);
      box-shadow:0 6px 20px rgba(159,239,0,0.4);
    }
    .modal-submit:active { transform:scale(0.98); }
    .modal-submit.loading { color:transparent; pointer-events:none; }
    .modal-submit.loading::after {
      content:''; position:absolute;
      width:18px; height:18px; top:50%; left:50%;
      transform:translate(-50%,-50%);
      border:2px solid #000; border-top-color:transparent;
      border-radius:50%; animation:spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform:translate(-50%,-50%) rotate(360deg); } }

    /* Divider */
    .modal-divider {
      display:flex; align-items:center; gap:12px;
      margin:14px 0; font-size:11px; color:#4b5563;
      font-family:'Space Mono',monospace;
    }
    .modal-divider::before,.modal-divider::after {
      content:''; flex:1; height:1px; background:rgba(255,255,255,0.07);
    }

    /* Botones social */
    .modal-socials { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:4px; }
    .modal-social-btn {
      padding:10px 14px; background:#1a1a1a;
      border:1px solid rgba(255,255,255,0.08);
      border-radius:8px; color:#a4b1cd;
      font-family:'Rajdhani',sans-serif; font-size:13px; font-weight:600;
      cursor:pointer; transition:all 0.2s;
      display:flex; align-items:center; gap:8px; justify-content:center;
    }
    .modal-social-btn:hover {
      border-color:rgba(159,239,0,0.3); color:#f8f8f8; background:#222;
    }

    /* Hint */
    .modal-hint {
      text-align:center; margin-top:14px; font-size:13px;
      color:#4b5563; font-family:'Rajdhani',sans-serif;
    }
    .modal-hint a { color:#9fef00; text-decoration:none; font-weight:700; }
    .modal-hint a:hover { text-decoration:underline; }

    /* Cerrar */
    .close-modal {
      position:absolute; top:14px; right:16px;
      width:28px; height:28px; display:flex;
      align-items:center; justify-content:center;
      border-radius:50%; background:rgba(255,255,255,0.04);
      color:#6b7280; font-size:18px; cursor:pointer;
      border:1px solid rgba(255,255,255,0.07); transition:all 0.2s; line-height:1;
    }
    .close-modal:hover {
      background:rgba(159,239,0,0.1); color:#9fef00;
      border-color:rgba(159,239,0,0.3);
    }

    /* Nav usuario logueado */
    .nav-user {
      display:inline-flex; align-items:center; gap:8px;
      color:#9fef00; font-family:'Space Mono',monospace;
      font-size:12px; font-weight:700;
    }
    .user-dot {
      width:8px; height:8px; border-radius:50%;
      background:#9fef00; box-shadow:0 0 6px #9fef00;
      animation:upulse 2s infinite;
    }
    @keyframes upulse {
      0%,100% { opacity:1; box-shadow:0 0 6px #9fef00; }
      50%      { opacity:0.4; box-shadow:none; }
    }

    /* Toast */
    #htb-toast {
      position:fixed; bottom:2rem; right:2rem; z-index:9999;
      padding:13px 20px; border-radius:10px;
      font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:600;
      background:#111; transition:opacity 0.4s,transform 0.4s;
    }

    /* Lab modal */
    #lab-modal {
      display:none; position:fixed; z-index:2000; inset:0;
      background:rgba(0,0,0,0.88); backdrop-filter:blur(8px);
      align-items:center; justify-content:center;
    }
    #lab-modal .modal-content {
      animation:modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1);
    }
  `;
  document.head.appendChild(style);
  buildModal();
}

// ================================
// CONSTRUIR MODAL
// ================================
function buildModal() {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" onclick="closeAuth()">×</span>
      <div class="modal-logo">
        <div class="modal-logo-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#000"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="modal-logo-text">Hack<span>The</span>Box</span>
      </div>

      <div class="modal-tabs">
        <button class="modal-tab active" id="tab-login" onclick="switchTab('login')">Iniciar sesión</button>
        <button class="modal-tab" id="tab-register" onclick="switchTab('register')">Crear cuenta</button>
      </div>

      <div id="login-form">
        <div class="modal-socials">
          <button class="modal-social-btn" onclick="showToast('🔗 OAuth próximamente','warn')"> GitHub</button>
          <button class="modal-social-btn" onclick="showToast('🔗 OAuth próximamente','warn')"> Google</button>
        </div>
        <div class="modal-divider">o continúa con email</div>
        <div class="modal-field">
          <span class="modal-field-icon"></span>
          <input type="email" id="login-email" placeholder="Correo electrónico" />
        </div>
        <div class="modal-field">
          <span class="modal-field-icon"></span>
          <input type="password" id="login-pass" placeholder="Contraseña" />
        </div>
        <button class="modal-submit" id="btn-login" onclick="handleLogin()">Entrar →</button>
        <div class="modal-hint">¿No tienes cuenta? <a href="#" onclick="switchTab('register')">Regístrate gratis</a></div>
      </div>

      <div id="register-form" style="display:none;">
        <div class="modal-field">
          <span class="modal-field-icon"></span>
          <input type="text" id="reg-user" placeholder="Nombre de usuario (hacker alias)" />
        </div>
        <div class="modal-field">
          <span class="modal-field-icon"></span>
          <input type="email" id="reg-email" placeholder="Correo electrónico" />
        </div>
        <div class="modal-field">
          <span class="modal-field-icon"></span>
          <input type="password" id="reg-pass" placeholder="Contraseña (mín. 14 caracteres)" />
        </div>
        <button class="modal-submit" id="btn-register" onclick="handleRegister()">Crear cuenta →</button>
        <div class="modal-hint">¿Ya tienes cuenta? <a href="#" onclick="switchTab('login')">Inicia sesión</a></div>
      </div>
    </div>
  `;
}

// ================================
// TABS
// ================================
function switchTab(tab) {
  const isLogin = tab === "login";
  document.getElementById("login-form").style.display = isLogin ? "block" : "none";
  document.getElementById("register-form").style.display = isLogin ? "none" : "block";
  document.getElementById("tab-login").classList.toggle("active", isLogin);
  document.getElementById("tab-register").classList.toggle("active", !isLogin);
}

// ================================
// OPEN / CLOSE AUTH
// ================================
function openAuth(register = false) {
  const modal = document.getElementById("auth-modal");
  modal.style.display = "flex";
  switchTab(register ? "register" : "login");
}
function closeAuth() {
  document.getElementById("auth-modal").style.display = "none";
}
function toggleAuth(isRegister) { switchTab(isRegister ? "register" : "login"); }

function initModalClose() {
  document.getElementById("auth-modal")?.addEventListener("click", e => { if (e.target.id === "auth-modal") closeAuth(); });
  document.getElementById("lab-modal")?.addEventListener("click", e => { if (e.target.id === "lab-modal") closeLab(); });
}

// ================================
// REGISTER
// ================================
function handleRegister() {
  const user = document.getElementById("reg-user").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const pass = document.getElementById("reg-pass").value;
  const btn = document.getElementById("btn-register");
  if (!user || !email || !pass) { showToast("⚠️ Completa todos los campos", "warn"); return; }
  if (pass.length < 14) { showToast("❌ Contraseña: mínimo 14 caracteres", "error"); return; }
  btn.classList.add("loading");
  setTimeout(() => {
    btn.classList.remove("loading");
    localStorage.setItem("htb_user", JSON.stringify({ user, email }));
    showToast("✅ ¡Cuenta creada! Ahora inicia sesión", "success");
    switchTab("login");
  }, 1200);
}

// ================================
// LOGIN
// ================================
function handleLogin() {
  const email = document.getElementById("login-email").value.trim();
  const data = JSON.parse(localStorage.getItem("htb_user"));
  const btn = document.getElementById("btn-login");
  if (!data) { showToast("❌ No hay ningún usuario registrado", "error"); return; }
  if (data.email !== email) { showToast("❌ Correo incorrecto", "error"); return; }
  btn.classList.add("loading");
  setTimeout(() => {
    btn.classList.remove("loading");
    showToast("✅ ¡Bienvenido de vuelta, " + data.user + "!", "success");
    closeAuth();
    document.getElementById("admin-section").style.display = "block";
    document.querySelector(".nav-actions").innerHTML = `
      <span class="nav-user"><span class="user-dot"></span>${data.user}</span>
      <a href="#" class="btn-outline" onclick="logout()">Salir</a>
    `;
    setTimeout(() => document.getElementById("admin-section").scrollIntoView({ behavior: "smooth" }), 300);
  }, 1000);
}

// ================================
// LOGOUT
// ================================
function logout() {
  document.getElementById("admin-section").style.display = "none";
  document.querySelector(".nav-actions").innerHTML = `
    <a href="#" class="btn-outline" onclick="openAuth()">Iniciar sesión</a>
    <a href="#" class="btn-green"   onclick="openAuth(true)">Comenzar gratis →</a>
  `;
  showToast("👋 Sesión cerrada", "success");
}

// ================================
// GLOW EN CARDS AL ENTRAR EN PANTALLA
// ================================
function initCardGlow() {
  const cards = document.querySelectorAll(".feature-card, .machine-card, .track-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card-glow-active");
        setTimeout(() => entry.target.classList.remove("card-glow-active"), 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  cards.forEach(c => observer.observe(c));
}

// ================================
// TOAST
// ================================
function showToast(msg, type = "success") {
  let t = document.getElementById("htb-toast");
  if (!t) { t = document.createElement("div"); t.id = "htb-toast"; document.body.appendChild(t); }
  const c = { success: "#9fef00", error: "#f87171", warn: "#fbbf24" }[type] || "#9fef00";
  t.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;z-index:9999;
    background:#111;border:1px solid ${c};color:#fff;
    padding:13px 20px;border-radius:10px;
    font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;
    box-shadow:0 0 20px ${c}44;opacity:1;transform:translateY(0);
    transition:opacity 0.4s,transform 0.4s;
  `;
  t.textContent = msg;
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateY(10px)"; }, 3000);
}

// ================================
// AGREGAR CONTENIDO
// ================================
function addItem() {
  const title = document.getElementById("new-title").value;
  const url = document.getElementById("new-url").value;
  const type = document.getElementById("new-type").value;
  if (!title || !url) { showToast("⚠️ Llena todos los campos", "warn"); return; }
  const container = document.getElementById("user-content-list");
  const card = document.createElement("div");
  card.className = "machine-card";
  let content = "";
  if (type === "video") {
    const id = getYouTubeID(url);
    content = id
      ? `<iframe width="100%" height="180" src="https://www.youtube.com/embed/${id}" allowfullscreen style="border:none;display:block;"></iframe>`
      : `<a href="${url}" target="_blank" class="btn-outline" style="display:block;margin:1rem;text-align:center;">Ver video</a>`;
  } else {
    content = `<a href="${url}" target="_blank" class="btn-outline" style="display:block;margin:1rem;text-align:center;">Abrir Lab</a>`;
  }
  card.innerHTML = `
    <div class="machine-img" style="background:linear-gradient(135deg,#0a1628,#0f2942);height:auto;padding:0;">${content}</div>
    <div class="machine-info"><h4>${title}</h4></div>
  `;
  container.appendChild(card);
  saveData();
  showToast("✅ Contenido agregado", "success");
  document.getElementById("new-title").value = "";
  document.getElementById("new-url").value = "";
}

function getYouTubeID(url) {
  const m = url.match(/(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/);
  return m ? m[1] : null;
}
function saveData() { localStorage.setItem("htb_content", document.getElementById("user-content-list").innerHTML); }
function loadData() {
  const d = localStorage.getItem("htb_content");
  if (d) document.getElementById("user-content-list").innerHTML = d;
}

// ================================
// MODAL LAB
// ================================
const labsData = {
  "Lame": ["🔍 Escaneo con Nmap", "💥 Exploit Samba CVE-2007-2447", "👑 Root shell"],
  "Blue": ["🔍 Escaneo de puertos", "💥 EternalBlue MS17-010", "🎯 Acceso como SYSTEM"],
  "Active": ["🔍 Reconocimiento SMB", "🔑 GPP Password decrypt", "🎭 Kerberoasting → Admin"],
  "Inject": ["🔍 LFI Discovery", "☕ Spring Cloud RCE", "👑 Root via sudo"],
  "Offshore": ["🌐 Enumeración de red", "🔗 Pivoting multi-hop", "🏆 Domain Compromise"],
  "Spider": ["🕷️ SSTI en Flask", "🔓 Bypass filtros", "👑 Root shell"],
  "Cerberus": ["🔍 SNMP enum", "💣 Fibra exploit", "🛡️ Bypass AppArmor"],
  "Sorcerer": ["📡 Recon web avanzado", "🔮 Chain de exploits", "🏆 Domain Admin"]
};

document.addEventListener("click", function (e) {
  const card = e.target.closest(".machine-card");
  if (!card) return;
  const name = card.querySelector("h4")?.innerText;
  if (!labsData[name]) return;
  document.getElementById("lab-title").innerText = "⚙️ " + name;
  document.getElementById("lab-steps").innerHTML = labsData[name]
    .map((s, i) => `
      <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;
        background:rgba(159,239,0,0.04);border:1px solid rgba(159,239,0,0.1);
        border-radius:8px;margin-bottom:10px;">
        <span style="font-family:'Space Mono',monospace;color:#9fef00;font-size:11px;min-width:22px;">0${i + 1}</span>
        <span style="font-size:15px;">${s}</span>
      </div>`).join("");
  const lm = document.getElementById("lab-modal");
  lm.style.display = "flex";
  lm.style.alignItems = "center";
  lm.style.justifyContent = "center";
});

function closeLab() { document.getElementById("lab-modal").style.display = "none"; }

// ================================
// TERMINAL
// ================================
function initTerminal() {
  const termLines = [
    { text: "$ nmap -sV -sC 10.10.10.3", cls: "t-green" },
    { text: "Starting Nmap scan...", cls: "t-gray" },
    { text: "PORT    STATE  SERVICE   VERSION", cls: "t-yellow" },
    { text: "22/tcp  open   ssh       OpenSSH 4.7", cls: "t-white" },
    { text: "445/tcp open   smb       [VULNERABLE]", cls: "t-red" },
    { text: "$ searchsploit Samba 3.0.20", cls: "t-green" },
    { text: "CVE-2007-2447 — Command Injection ✔", cls: "t-purple" },
    { text: "$ python exploit.py 10.10.10.3 445", cls: "t-green" },
    { text: "Sending payload...", cls: "t-gray" },
    { text: "Connection received! ✔", cls: "t-blue" },
    { text: "root@lame:/# id", cls: "t-green" },
    { text: "uid=0(root) gid=0(root) groups=0", cls: "t-yellow" },
  ];
  const output = document.getElementById("terminal-output");
  if (!output) return;
  let i = 0;
  function nextLine() {
    if (i >= termLines.length) { setTimeout(() => { output.innerHTML = ""; i = 0; nextLine(); }, 4000); return; }
    const span = document.createElement("span");
    span.className = "t-line " + termLines[i].cls;
    span.textContent = termLines[i].text;
    output.appendChild(span);
    output.scrollTop = output.scrollHeight;
    i++;
    setTimeout(nextLine, 400);
  }
  setTimeout(nextLine, 700);
}

// ================================
// FONDO HERO
// ================================
function changeBG(type) {
  const hero = document.getElementById("hero");
  const f = {
    hex: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
    space: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')",
    matrix: "url('https://w0.peakpx.com/wallpaper/306/70/HD-wallpaper-matrix-code.jpg')"
  };
  hero.style.backgroundImage = f[type];
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
}