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
const fecha = document.getElementById("fecha");

fecha.textContent = "Sistema de Gestión de la Calidad Dinámico - " + new Date().toLocaleDateString("es-CO");

const CHARACTERIZATION_FIELDS = [
  { key: "process", label: "PROCESO", type: "textarea", rows: 2 },
  { key: "objective", label: "OBJETIVO", type: "textarea", rows: 2 },
  { key: "scope", label: "ALCANCE", type: "textarea", rows: 2 },
  { key: "responsible", label: "RESPONSABLE", type: "text" },
  { key: "workGroup", label: "GRUPO DE TRABAJO", type: "text" },
  { key: "internalSupplier", label: "PROVEEDOR INTERNO", type: "textarea", rows: 2 },
  { key: "internalClient", label: "CLIENTE INTERNO", type: "textarea", rows: 2 },
  { key: "supportProcesses", label: "PROCESOS DE SOPORTE", type: "textarea", rows: 2 },
  { key: "documents", label: "DOCUMENTOS", type: "textarea", rows: 2 },
  { key: "records", label: "REGISTROS", type: "textarea", rows: 2 },
  { key: "resources", label: "RECURSOS", type: "textarea", rows: 2 },
  { key: "indicator", label: "INDICADOR", type: "text" },
  { key: "target", label: "META", type: "text" }
];

const CHARACTERIZATION_STORAGE_KEY = "mapa-procesos-characterizations";

const FIXED_PROCESS_CHARACTERIZATIONS = {
  "Alistamiento y Preparación": {
    version: "1",
    date: "7/04/2026",
    page: "1 DE 7",
    process: "Producción de Panadería y Repostería.",
    objective:
      "Asegurar la correcta disponibilidad y estado de materias primas, equipos e insumos antes de iniciar la producción.",
    scope: "Desde la recepción de insumos hasta su organización para producción.",
    responsible: "Panadero Jefe.",
    workGroup: "Jefe encargado, panaderos.",
    internalSupplier:
      "Interno: Área de compras, almacenamiento\nExterno: Proveedores de harina, azúcar, levadura, mantequilla, huevos, insumos y materiales de empaque",
    internalClient: "Interno: Área de producción (elaboración de masas)\nExterno: No aplica",
    supportProcesses: "Limpieza y desinfección, Control de calidad, Almacenamiento e inventarios, Gestión de compras",
    documents: "Órdenes de compra, Manual de Buenas Prácticas de Manufactura, Fichas técnicas de materias primas",
    records:
      "Registro de condiciones de almacenamiento, Registro de inspección de insumos, Registro de recepción de materias",
    resources: "Tecnológicos, Físicos, Humanos.",
    indicator: "Tiempo de alistamiento",
    target: "Cumplir el 100% del proceso de verificación, Mantener tiempos de alistamiento dentro del estándar establecido",
    diagramHtml: ""
  },
  "Elaboración de Masas": {
    version: "1",
    date: "7/04/2026",
    page: "2 DE 7",
    process: "Elaboración de masas para productos de panadería y repostería.",
    objective:
      "Garantizar la correcta preparación de las masas mediante el uso de recetas estandarizadas, asegurando calidad, consistencia y uniformidad en los productos.",
    scope: "Desde la dosificación de ingredientes hasta el formado de las masas listas para horneado.",
    responsible: "Panadero jefe.",
    workGroup: "Panaderos, auxiliares de producción.",
    internalSupplier: "Interno: Área de alistamiento y preparación\nExterno: Proveedores de materias primas",
    internalClient: "Interno: Área de horneado y estabilización\nExterno: No aplica directamente",
    supportProcesses: "Control de calidad, Almacenamiento, Limpieza y desinfección.",
    documents: "Recetas estandarizadas, Procedimientos operativos, Fichas técnicas de productos.",
    records: "Control de lote de producción, Control de dosificación de ingredientes.",
    resources: "Tecnológicos, Físicos, Humanos.",
    indicator: "% de cumplimiento de recetas estándar, Tiempo de preparación de masa.",
    target: "Cumplimiento del 100% de recetas estandarizadas, Cumplir tiempos estándar de producción.",
    diagramHtml: ""
  },
  "Horneado y Estabilización": {
    version: "1",
    date: "7/04/2026",
    page: "3 DE 7",
    process: "Horneado y estabilización de productos de panadería y repostería.",
    objective:
      "Garantizar la estabilidad antes del empaque de los productos mediante el control de tiempo y temperatura, asegurando su calidad, textura, sabor.",
    scope: "Desde el ingreso de las masas al horno hasta su enfriamiento y estabilización para el proceso de empaque.",
    responsible: "Panadero jefe.",
    workGroup: "Panaderos, auxiliares de producción.",
    internalSupplier: "Interno: Área de elaboración de masas\nExterno: No aplica",
    internalClient: "Interno: Área de calidad y empaque\nExterno: No aplica directamente",
    supportProcesses: "Mantenimiento de equipos, control de calidad, limpieza y desinfección (BPM)",
    documents: "Parámetros de horneado (tiempo y temperatura), fichas técnicas de productos, manual de BPM.",
    records: "Registro de temperatura del horno, control de tiempos de horneado, registro de producción por lote.",
    resources: "Humanos, panaderos y operarios.",
    indicator: "Porcentaje de productos correctamente horneados, número de productos quemados o crudos.",
    target: "Cumplimiento de parámetros de horneado, garantizar tiempos de enfriamiento estándar.",
    diagramHtml: ""
  },
  "Calidad Interna y Empaque": {
    version: "1",
    date: "7/04/2026",
    page: "4 DE 7",
    process: "Control de calidad interna y empaque de productos de panadería y repostería.",
    objective:
      "Garantizar que los productos cumplan con los estándares de calidad, inocuidad, presentación y empaque antes de su comercialización.",
    scope: "Desde la inspección del producto terminado hasta su empaque, etiquetado y almacenamiento para la venta.",
    responsible: "Panadero jefe.",
    workGroup: "Auxiliar y panadero jefe.",
    internalSupplier: "Interno: área de horneado y estabilización.\nExterno: proveedores de empaques y etiquetas.",
    internalClient: "Interno: Área de calidad y empaque\nExterno: Cliente final",
    supportProcesses: "Control de calidad, almacenamiento, gestión de inventarios, limpieza y desinfección (BPM), mantenimiento de equipos",
    documents: "Procedimientos de inspección y empaque.",
    records: "Registro de control de calidad, registro de productos rechazados.",
    resources: "Humanos, panaderos y operarios",
    indicator:
      "Porcentaje de productos conformes, número de productos rechazados, porcentaje de cumplimiento en inspección de calidad",
    target: "Cumplimiento de la inspección de calidad, trazabilidad garantizada",
    diagramHtml: ""
  },
  "Exhibición y Apertura": {
    version: "1",
    date: "7/04/2026",
    page: "5 DE 7",
    process: "Exhibición y apertura del punto de venta de productos de panadería y repostería",
    objective:
      "Garantizar la correcta presentación, organización y disponibilidad de los productos para atraer al cliente y facilitar su compra",
    scope:
      "Desde la apertura del establecimiento hasta la correcta disposición y rotación de los productos en vitrinas",
    responsible: "Jefe encargado",
    workGroup: "Jefe encargado, auxiliar",
    internalSupplier: "Interno: área de calidad\nExterno: no aplica",
    internalClient: "Interno: área de ventas\nExterno: clientes del punto de venta",
    supportProcesses: "Marketing, gestión de inventarios, limpieza y desinfección, control de calidad",
    documents: "Manual de exhibición, procedimientos de apertura, políticas de rotación de productos",
    records: "Control de inventario en vitrina, registro de apertura, control de productos vencidos, registro de limpieza",
    resources: "Humanos, panaderos y operarios",
    indicator: "Porcentaje de cumplimiento de exhibición correcta, tiempo de apertura del punto de venta, nivel de rotación de productos",
    target: "Apertura puntual diaria, rotación óptima de productos, disponibilidad de productos",
    diagramHtml: ""
  },
  "Servicio y Comercialización": {
    version: "1",
    date: "7/04/2026",
    page: "6 DE 7",
    process: "Servicio y comercialización de productos de panadería y repostería.",
    objective:
      "Garantizar una atención oportuna y cordial al cliente mediante la recepción, asesoría, toma de pedido, cobro y entrega del producto, asegurando satisfacción y una experiencia de compra adecuada.",
    scope:
      "Desde la recepción del cliente en el punto de venta hasta la entrega del pedido, pago y servicio en mesa cuando aplique.",
    responsible: "Gerente.",
    workGroup: "Cajero y empleado de servicio o mesero.",
    internalSupplier:
      "Interno: Proceso de exhibición y apertura; proceso de calidad interna y empaque.\nExterno: No aplica.",
    internalClient: "Interno: Proceso de fidelización y resolución.\nExterno: Cliente final.",
    supportProcesses: "Gestión financiera, control de calidad, limpieza y desinfección, gestión de inventarios.",
    documents:
      "Procedimiento de atención al cliente, políticas comerciales, instructivo de manejo del sistema POS, protocolo de servicio.",
    records: "Registro de ventas, facturas o tickets, control de pedidos, registro de pagos.",
    resources: "Humanos, físicos y tecnológicos.",
    indicator:
      "Tiempo de atención al cliente, porcentaje de pedidos entregados correctamente, nivel de satisfacción del cliente.",
    target:
      "Cumplir con la atención oportuna del 100% de los clientes, entregar correctamente los pedidos y mantener altos niveles de satisfacción.",
    diagramHtml: ""
  },
  "Fidelización y Resolución": {
    version: "1",
    date: "7/04/2026",
    page: "7 DE 7",
    process: "Fidelización y resolución de clientes de la Panadería del 12.",
    objective:
      "Atención de quejas, aplicación de soluciones, agradecimiento por la compra y promoción de la recompra, fortaleciendo la relación comercial con la panadería.",
    scope:
      "Desde la finalización de la venta o prestación del servicio hasta la atención de quejas, seguimiento de la satisfacción y ejecución de acciones de fidelización al cliente.",
    responsible: "Empleado de servicio / mesero.",
    workGroup: "Empleado de servicio, cajero y gerente general cuando se requiera la resolución de casos especiales.",
    internalSupplier: "Interno: Proceso de servicio y comercialización.\nExterno: No aplica.",
    internalClient:
      "Interno: Gestión gerencial y gestión de calidad, como procesos que pueden usar la información para mejora.\nExterno: Cliente final.",
    supportProcesses: "Gestión de calidad, gestión gerencial, gestión financiera, limpieza y desinfección.",
    documents:
      "Protocolo de atención al cliente, procedimiento para manejo de quejas y reclamos, políticas de fidelización, instructivo de servicio.",
    records:
      "Registro de quejas y reclamos, registro de satisfacción del cliente, control de clientes frecuentes, registro de acciones correctivas frente al servicio.",
    resources: "Humanos, físicos y tecnológicos.",
    indicator:
      "Nivel de satisfacción del cliente, número de quejas atendidas, porcentaje de reclamos resueltos, porcentaje de clientes recurrentes.",
    target:
      "Atender el 100% de las quejas y reclamos, mantener altos niveles de satisfacción y promover la recompra y fidelización del cliente.",
    diagramHtml: ""
  }
};

function isFixedCharacterizationProcess(title) {
  return Boolean(FIXED_PROCESS_CHARACTERIZATIONS[title]);
}

const PROCESS_DIAGRAMS = {
  "Alistamiento y Preparación": "img/control%20de%20inventario%20y%20alistamiento.png",
  "Elaboración de Masas": "img/preparacion%20y%20mezcla%20de%20masa.jpg",
  "Horneado y Estabilización": "img/proceso%20de%20horneado.jpg",
  "Calidad Interna y Empaque": "img/inspencion%20y%20comerlizacion.jpg",
  "Exhibición y Apertura": "img/apertura%20de%20establecimiento.jpg",
  "Servicio y Comercialización": "img/proceso%20de%20servicio%20al%20cliente.png",
  "Fidelización y Resolución": "img/fedelizacion.png"
};

function isDiagramLockedProcess(title) {
  return Boolean(PROCESS_DIAGRAMS[title]);
}

function buildFixedDiagramHtml(title) {
  const imagePath = PROCESS_DIAGRAMS[title];
  if (!imagePath) {
    return "";
  }
  return "<img class='diagram-image diagram-fixed' src='" + imagePath + "' alt='Diagrama de flujo de " + title.toLowerCase() + "' data-diagram-title='" + title + "' crossorigin='anonymous' />";
}

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


function buildCharacterizationDefaults(title) {
  if (isFixedCharacterizationProcess(title)) {
    const defaults = { ...FIXED_PROCESS_CHARACTERIZATIONS[title] };
    if (isDiagramLockedProcess(title)) {
      defaults.diagramHtml = buildFixedDiagramHtml(title);
    }
    return defaults;
  }
  
  if (isDiagramLockedProcess(title)) {
    const details = processDetails[title];
    const isStrategic = details.tone === "blue";
    const defaults = {
      version: "1",
      date: getTodayText(),
      page: "1 DE 2",
      process: details.text,
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
      diagramHtml: buildFixedDiagramHtml(title)
    };
    return defaults;
  }

  const details = processDetails[title];
  const isStrategic = details.tone === "blue";

  return {
    version: "1",
    date: getTodayText(),
    page: "1 DE 2",
    process: details.text,
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
  if (isFixedCharacterizationProcess(title)) {
    const fixed = buildCharacterizationDefaults(title);
    const current = characterizationStore[title] || {};

    if (isDiagramLockedProcess(title)) {
      characterizationStore[title] = {
        ...fixed,
        diagramHtml: fixed.diagramHtml
      };
      saveCharacterizationStore();
      return characterizationStore[title];
    }

    characterizationStore[title] = {
      ...fixed,
      diagramHtml: current.diagramHtml || fixed.diagramHtml || ""
    };
    return characterizationStore[title];
  }
  
  if (isDiagramLockedProcess(title)) {
    const fixed = buildCharacterizationDefaults(title);
    characterizationStore[title] = {
      ...fixed,
      diagramHtml: fixed.diagramHtml
    };
    saveCharacterizationStore();
    return characterizationStore[title];
  }

  if (!characterizationStore[title]) {
    characterizationStore[title] = buildCharacterizationDefaults(title);
  }

  const defaults = buildCharacterizationDefaults(title);
  characterizationStore[title] = { ...defaults, ...characterizationStore[title] };
  return characterizationStore[title];
}

function setCharacterizationField(title, field, value) {
  if (isDiagramLockedProcess(title) && field === "diagramHtml") {
    return;
  }

  if (isFixedCharacterizationProcess(title) && field !== "diagramHtml") {
    return;
  }

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

  if (isFixedCharacterizationProcess(processTitle)) {
    control.readOnly = true;
  }

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

function fileToDataUrl(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function () {
      reject(new Error("No se pudo leer la imagen pegada."));
    };
    reader.readAsDataURL(file);
  });
}

function removeWhiteBackgroundFromDataUrl(dataUrl) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("No se pudo procesar la imagen."));
        return;
      }

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const whiteThreshold = 242;

      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];

        if (red >= whiteThreshold && green >= whiteThreshold && blue >= whiteThreshold) {
          pixels[index + 3] = 0;
        }
      }

      context.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = function () {
      reject(new Error("No se pudo cargar la imagen pegada."));
    };
    image.src = dataUrl;
  });
}

function insertDiagramImage(dataUrl) {
  diagramCanvas.innerHTML = "";
  const image = document.createElement("img");
  image.src = dataUrl;
  image.alt = "Diagrama del proceso";
  image.className = "diagram-image";
  diagramCanvas.appendChild(image);
  diagramCanvas.dispatchEvent(new Event("input", { bubbles: true }));
}

let characterizationStore = loadCharacterizationStore();
let activeProcessTitle = "";

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
  const isFixed = isFixedCharacterizationProcess(title);
  const diagramLocked = isDiagramLockedProcess(title);
  activeProcessTitle = title;
  panelTitle.textContent = cleanModalText(details.icon + " " + title);
  sheetProcess.textContent = cleanModalText(title);
  diagramHint.textContent = diagramLocked
    ? "Diagrama fijo para este proceso."
    : "Pega aquí tu diagrama de flujo o imagen del proceso: " + cleanModalText(title) + " (Ctrl+V).";
  versionField.value = getCharacterization(title).version;
  dateField.value = getCharacterization(title).date;
  pageField.value = getCharacterization(title).page;
  versionField.readOnly = isFixed;
  dateField.readOnly = isFixed;
  pageField.readOnly = isFixed;

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
  diagramCanvas.setAttribute("contenteditable", diagramLocked ? "false" : "true");
  diagramCanvas.classList.toggle("locked", diagramLocked);

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

  if (diagramLocked) {
    setTimeout(function () {
      const img = diagramCanvas.querySelector(".diagram-image");
      if (img && img.naturalWidth > 0) {
        processFixedDiagramImage(img);
      } else if (img) {
        img.addEventListener(
          "load",
          function () {
            processFixedDiagramImage(img);
          },
          { once: true }
        );
      }
    }, 150);
  }
}

function processFixedDiagramImage(imgElement) {
  const processImage = function () {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = imgElement.naturalWidth || imgElement.width;
      canvas.height = imgElement.naturalHeight || imgElement.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      ctx.drawImage(imgElement, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r > 230 && g > 230 && b > 230) {
          data[i + 3] = 0;
        } else if (r > 245 && g > 245 && b > 245) {
          data[i + 3] = Math.max(0, 255 - (r + g + b - 690) / 3);
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const newDataUrl = canvas.toDataURL("image/png", 0.95);
      imgElement.src = newDataUrl;
      imgElement.style.filter = "contrast(1.1) brightness(1.02)";
    } catch (error) {
      console.error("Error procesando imagen:", error);
    }
  };

  if (imgElement.complete && imgElement.naturalHeight !== 0) {
    processImage();
  } else {
    imgElement.onload = processImage;
  }
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

  if (isDiagramLockedProcess(activeProcessTitle)) {
    return;
  }

  setCharacterizationField(activeProcessTitle, "diagramHtml", diagramCanvas.innerHTML);
});

diagramCanvas.addEventListener("paste", async function (event) {
  if (isDiagramLockedProcess(activeProcessTitle)) {
    event.preventDefault();
    return;
  }

  if (!event.clipboardData) {
    return;
  }

  const items = Array.from(event.clipboardData.items || []);
  const imageItem = items.find(function (item) {
    return item.type && item.type.indexOf("image/") === 0;
  });

  if (!imageItem) {
    return;
  }

  event.preventDefault();

  try {
    const file = imageItem.getAsFile();
    if (!file) {
      return;
    }

    const rawDataUrl = await fileToDataUrl(file);
    const cleanedDataUrl = await removeWhiteBackgroundFromDataUrl(rawDataUrl);
    insertDiagramImage(cleanedDataUrl);
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("closeTop").addEventListener("click", closeModal);
document.getElementById("closeBottom").addEventListener("click", closeModal);
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

renderCards();
