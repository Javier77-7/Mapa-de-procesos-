const processDetails = {
  "Gestión Gerencial": {
    icon: "⚙️",
    tone: "blue",
    text: "Revisión de inventarios, reportes diarios y toma de decisiones estratégicas.",
    stats: {
      "Inventario Crítico": "Harina (15 kg)",
      "Ventas Hoy": "$450,000",
      Decisiones: "Pendiente pedido levadura"
    }
  },
  "Gestión de Calidad": {
    icon: "✅",
    tone: "blue",
    text: "Mejora continua, seguimiento de objetivos y evaluación de procesos según estándares.",
    stats: {
      Auditoría: "98% Cumplimiento",
      "No conformidades": "1",
      "Próxima Revisión": "15 de oct."
    }
  },
  "Alistamiento y Preparación": {
    icon: "🧾",
    tone: "orange",
    text: "Preparación inicial de insumos, mise en place y organización de trabajo.",
    stats: {
      "Insumos listos": "96%",
      "Tiempo alistamiento": "22 min",
      Estado: "En curso"
    }
  },
  "Elaboración de Masas": {
    icon: "🥣",
    tone: "orange",
    text: "Mezclado, amasado y control de fórmula para cada referencia.",
    stats: {
      "Lotes activos": "6",
      Hidratación: "Controlada",
      Estado: "Amasado"
    }
  },
  "Horneado y Estabilización": {
    icon: "🔥",
    tone: "orange",
    text: "Cocción por tiempos y temperaturas estándar, y estabilización post-horno.",
    stats: {
      "Temp. Horno": "180C",
      "Ciclos hoy": "14",
      Estado: "Producción"
    }
  },
  "Calidad Interna y Empaque": {
    icon: "📦",
    tone: "orange",
    text: "Control de calidad final, porcionado y empaque para venta y distribución.",
    stats: {
      "Conformes": "98%",
      "Reproceso": "2%",
      Estado: "Empacando"
    }
  },
  "Exhibición y Apertura": {
    icon: "🏪",
    tone: "orange",
    text: "Montaje de vitrina y alistamiento del punto para inicio de atención.",
    stats: {
      Vitrina: "Completa",
      "Hora apertura": "6:00 AM",
      Estado: "Abierto"
    }
  },
  "Servicio y Comercialización": {
    icon: "☕",
    tone: "orange",
    text: "Atención al cliente, venta y gestión comercial en mostrador y canales.",
    stats: {
      Trafico: "Medio",
      Conversion: "85%",
      Ticket: "$18,400"
    }
  },
  "Fidelización y Resolución": {
    icon: "🤝",
    tone: "orange",
    text: "Seguimiento posventa, retención y solución de PQRs.",
    stats: {
      "Nuevos miembros": "5",
      "PQRs abiertas": "0",
      Retencion: "92%"
    }
  },
  "Compras y Almacén": {
    icon: "🛒",
    tone: "gray",
    text: "Manejo eficiente de proveedores e insumos frescos.",
    stats: {
      Proveedores: "12",
      "Entregas Hoy": "2",
      "Días de stock": "4 días"
    }
  },
  "Gestión Financiera": {
    icon: "💳",
    tone: "gray",
    text: "Apertura/cierre de caja, control de flujo de efectivo y ventas.",
    stats: {
      "Caja Inicial": "$200,000",
      Gastos: "$45,000",
      Balance: "Positivo"
    }
  },
  "Mantenimiento y Aseo": {
    icon: "🛠️",
    tone: "gray",
    text: "Limpieza profunda y cuidado preventivo de maquinaria.",
    stats: {
      "Último Aseo": "Hace 2 h",
      "Equipos OK": "100%",
      "Próximo Mantenimiento": "En 3 días"
    }
  }
};

const strategic = ["Gestión Gerencial", "Gestión de Calidad"];
const operationalInternal = [
  "Alistamiento y Preparación",
  "Elaboración de Masas",
  "Horneado y Estabilización",
  "Calidad Interna y Empaque"
];
const operationalExternal = [
  "Exhibición y Apertura",
  "Servicio y Comercialización",
  "Fidelización y Resolución"
];
const support = ["Compras y Almacén", "Gestión Financiera", "Mantenimiento y Aseo"];

const modalEnabledProcesses = new Set([...operationalInternal, ...operationalExternal]);

let alertMode = false;

const strategicGrid = document.getElementById("strategicGrid");
const operationalInternalGrid = document.getElementById("operationalInternalGrid");
const operationalExternalGrid = document.getElementById("operationalExternalGrid");
const supportGrid = document.getElementById("supportGrid");
const modal = document.getElementById("modal");
const panelHead = document.getElementById("panelHead");
const panelTitle = document.getElementById("panelTitle");
const sheetProcess = document.getElementById("sheetProcess");
const characterForm = document.getElementById("characterForm");
const characterRows = document.getElementById("characterRows");
const versionField = document.getElementById("versionField");
const dateField = document.getElementById("dateField");
const pageField = document.getElementById("pageField");
const diagramHint = document.getElementById("diagramHint");
const diagramCanvas = document.getElementById("diagramCanvas");
const saveAllBtn = document.getElementById("saveAllBtn");
const fecha = document.getElementById("fecha");

fecha.textContent = "Sistema de Gestión de la Calidad Dinámico - " + new Date().toLocaleDateString("es-CO");

const CHARACTERIZATION_FIELDS = [
  { key: "objective", label: "OBJETIVO", type: "textarea", rows: 2 },
  { key: "scope", label: "ALCANCE", type: "textarea", rows: 2 },
  { key: "responsible", label: "RESPONSABLE", type: "text" },
  { key: "workGroup", label: "GRUPO DE TRABAJO", type: "text" },
  { key: "internalSupplier", label: "PROVEEDOR INTERNO", type: "text" },
  { key: "internalClient", label: "CLIENTE INTERNO", type: "text" },
  { key: "supportProcesses", label: "PROCESOS DE SOPORTE", type: "textarea", rows: 2 },
  { key: "documents", label: "DOCUMENTOS", type: "textarea", rows: 2 },
  { key: "records", label: "REGISTROS", type: "textarea", rows: 2 },
  { key: "resources", label: "RECURSOS", type: "textarea", rows: 2 },
  { key: "indicator", label: "INDICADOR", type: "text" },
  { key: "target", label: "META", type: "text" }
];

const CHARACTERIZATION_STORAGE_KEY = "mapa-procesos-characterizations";

function getTodayText() {
  return new Date().toLocaleDateString("es-CO");
}

function loadCharacterizationStore() {
  try {
    const raw = localStorage.getItem(CHARACTERIZATION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function saveCharacterizationStore() {
  localStorage.setItem(CHARACTERIZATION_STORAGE_KEY, JSON.stringify(characterizationStore));
}

function encodeStateToUrl(state) {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach(function (byte) {
    binary += String.fromCharCode(byte);
  });
  return encodeURIComponent(btoa(binary));
}

function decodeStateFromUrl(encoded) {
  const binary = atob(decodeURIComponent(encoded));
  const bytes = Uint8Array.from(binary, function (char) {
    return char.charCodeAt(0);
  });
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

function applyStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("state");
  if (!encoded) {
    return;
  }

  try {
    const sharedState = decodeStateFromUrl(encoded);
    if (sharedState && typeof sharedState === "object") {
      characterizationStore = { ...characterizationStore, ...sharedState };
      saveCharacterizationStore();
    }
  } catch (error) {
    // Keep local state if shared URL is malformed.
  }
}

function updateShareUrl() {
  const encoded = encodeStateToUrl(characterizationStore);
  const target = window.location.origin + window.location.pathname + "?state=" + encoded;
  window.history.replaceState({}, "", target);
}


function buildCharacterizationDefaults(title) {
  const details = processDetails[title];
  const isStrategic = details.tone === "blue";

  return {
    version: "1",
    date: getTodayText(),
    page: "1 DE 2",
    objective: details.text,
    scope: "Aplica a las actividades del proceso " + title.toLowerCase() + ".",
    responsible: isStrategic ? "Gerencia / Calidad" : "Responsable del proceso",
    workGroup: isStrategic ? "Equipo administrativo" : "Equipo operativo",
    internalSupplier: "Proceso anterior / proveedores internos",
    internalClient: "Area usuaria / siguiente proceso",
    supportProcesses: "Compras y Almacén, Gestión Financiera y Mantenimiento y Aseo",
    documents: "Procedimiento, instructivo y formatos asociados.",
    records: "Registro de control, bitácora y evidencias.",
    resources: "Personal, equipos, insumos y sistema de información.",
    indicator: "Cumplimiento del proceso (%)",
    target: ">= 95%",
    diagramHtml: ""
  };
}

function getCharacterization(title) {
  if (!characterizationStore[title]) {
    characterizationStore[title] = buildCharacterizationDefaults(title);
  }

  const defaults = buildCharacterizationDefaults(title);
  characterizationStore[title] = { ...defaults, ...characterizationStore[title] };
  return characterizationStore[title];
}

function setCharacterizationField(title, field, value) {
  const current = getCharacterization(title);
  current[field] = value;
  characterizationStore[title] = current;
  saveCharacterizationStore();
}

function createFieldRow(processTitle, field) {
  const row = document.createElement("label");
  row.className = "field-row";

  const label = document.createElement("span");
  label.textContent = field.label;

  const control = field.type === "textarea" ? document.createElement("textarea") : document.createElement("input");
  if (field.type !== "textarea") {
    control.type = "text";
  } else {
    control.rows = field.rows || 2;
  }
  control.value = getCharacterization(processTitle)[field.key] || "";
  control.dataset.field = field.key;
  control.dataset.title = processTitle;

  control.addEventListener("input", function (event) {
    setCharacterizationField(processTitle, field.key, event.target.value);
  });

  row.appendChild(label);
  row.appendChild(control);
  return row;
}

function cleanModalText(value) {
  return String(value).replace(/[→➜➞⇢↗↘➝]/g, "").trim();
}

let characterizationStore = loadCharacterizationStore();
let activeProcessTitle = "";
applyStateFromUrl();

function createCard(title) {
  const details = processDetails[title];
  const modalEnabled = modalEnabledProcesses.has(title);
  const card = document.createElement("article");
  card.className = "card " + details.tone;
  if (modalEnabled) {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
  } else {
    card.classList.add("card-static");
  }

  const icon = document.createElement("div");
  icon.className = "card-icon";
  icon.textContent = details.icon;

  const name = document.createElement("div");
  name.className = "card-title";
  name.textContent = title;

  card.appendChild(icon);
  card.appendChild(name);

  if (title === "Control Calidad" && alertMode) {
    card.classList.add("danger");
    const warning = document.createElement("div");
    warning.className = "warn";
    warning.textContent = "REVISIÓN NECESARIA";
    card.appendChild(warning);
  }

  if (modalEnabled) {
    const open = function () {
      openModal(title);
    };

    card.addEventListener("click", open);
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  }

  return card;
}

function renderCards() {
  strategicGrid.innerHTML = "";
  operationalInternalGrid.innerHTML = "";
  operationalExternalGrid.innerHTML = "";
  supportGrid.innerHTML = "";

  strategic.forEach(function (title) {
    strategicGrid.appendChild(createCard(title));
  });

  operationalInternal.forEach(function (title) {
    operationalInternalGrid.appendChild(createCard(title));
  });

  operationalExternal.forEach(function (title) {
    operationalExternalGrid.appendChild(createCard(title));
  });

  support.forEach(function (title) {
    supportGrid.appendChild(createCard(title));
  });
}

function openModal(title) {
  const details = processDetails[title];
  activeProcessTitle = title;
  panelTitle.textContent = cleanModalText(details.icon + " " + title);
  sheetProcess.textContent = cleanModalText(title);
  diagramHint.textContent = "Pega aquí tu diagrama de flujo o imagen del proceso: " + cleanModalText(title) + " (Ctrl+V).";
  versionField.value = getCharacterization(title).version;
  dateField.value = getCharacterization(title).date;
  pageField.value = getCharacterization(title).page;

  versionField.oninput = function (event) {
    setCharacterizationField(title, "version", event.target.value);
  };

  dateField.oninput = function (event) {
    setCharacterizationField(title, "date", event.target.value);
  };

  pageField.oninput = function (event) {
    setCharacterizationField(title, "page", event.target.value);
  };

  characterRows.innerHTML = "";
  CHARACTERIZATION_FIELDS.forEach(function (field) {
    characterRows.appendChild(createFieldRow(title, field));
  });

  diagramCanvas.innerHTML = getCharacterization(title).diagramHtml || "";

  if (details.tone === "blue") {
    panelHead.style.background = "#eff6ff";
  } else if (details.tone === "orange") {
    panelHead.style.background = "#fff7ed";
  } else {
    panelHead.style.background = "#f9fafb";
  }

  modal.classList.add("show");
  document.body.classList.add("modal-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
  modal.setAttribute("aria-hidden", "true");
}

diagramCanvas.addEventListener("input", function () {
  if (!activeProcessTitle) {
    return;
  }
  setCharacterizationField(activeProcessTitle, "diagramHtml", diagramCanvas.innerHTML);
});

saveAllBtn.addEventListener("click", function () {
  saveCharacterizationStore();
  updateShareUrl();
  alert("Información guardada correctamente. El enlace actual ya contiene los datos guardados.");
});

document.getElementById("closeTop").addEventListener("click", closeModal);
document.getElementById("closeBottom").addEventListener("click", closeModal);
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

renderCards();
