const processDetails = {
  "Gestion Gerencial": {
    icon: "⚙️",
    tone: "blue",
    text: "Revision de inventarios, reportes diarios y toma de decisiones estrategicas.",
    stats: {
      "Inventario Critico": "Harina (15kg)",
      "Ventas Hoy": "$450,000",
      Decisiones: "Pendiente pedido levadura"
    }
  },
  "Gestion de Calidad": {
    icon: "✅",
    tone: "blue",
    text: "Mejora continua, seguimiento de objetivos y evaluacion de procesos segun estandares.",
    stats: {
      Auditoria: "98% Cumplimiento",
      "No conformidades": "1",
      "Proxima Revision": "15 de Oct"
    }
  },
  "Produccion Panaderia": {
    icon: "👨‍🍳",
    tone: "orange",
    text: "Transformacion de insumos en productos de panaderia de alta calidad.",
    stats: {
      "Lotes Hoy": "12",
      Merma: "2%",
      Estado: "Horneando Pan de Queso"
    }
  },
  "Control Calidad": {
    icon: "🔎",
    tone: "orange",
    text: "Verificacion de requerimientos de higiene, sabor y textura.",
    stats: {
      "Temp. Horno": "180C",
      Higiene: "Aprobado",
      "Pruebas Sabor": "10/10"
    }
  },
  Comercializacion: {
    icon: "🏬",
    tone: "orange",
    text: "Estrategias de venta y distribucion en el punto de venta de Valledupar.",
    stats: {
      Trafico: "Medio",
      Conversion: "85%",
      Promocion: "2x1 en Galletas"
    }
  },
  "Servicio al Cliente": {
    icon: "🧑‍💼",
    tone: "orange",
    text: "Atencion directa y personalizada a los requerimientos de los clientes.",
    stats: {
      Espera: "3 min",
      Satisfaccion: "4.8/5",
      Personal: "3 activos"
    }
  },
  "Fidelizacion Resolucion": {
    icon: "🤝",
    tone: "orange",
    text: "Mantenimiento de relaciones a largo plazo y manejo de PQRs.",
    stats: {
      "Nuevos Miembros": "5",
      "PQRs Abiertas": "0",
      Retencion: "92%"
    }
  },
  "Compras y Almacen": {
    icon: "🛒",
    tone: "gray",
    text: "Manejo eficiente de proveedores e insumos frescos.",
    stats: {
      Proveedores: "12",
      "Entregas Hoy": "2",
      "Dias Stock": "4 dias"
    }
  },
  "Gestion Financiera": {
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
      "Ultimo Aseo": "Hace 2h",
      "Equipos OK": "100%",
      "Proximo Mantenimiento": "En 3 dias"
    }
  }
};

const strategic = ["Gestion Gerencial", "Gestion de Calidad"];
const operational = [
  "Produccion Panaderia",
  "Control Calidad",
  "Comercializacion",
  "Servicio al Cliente",
  "Fidelizacion Resolucion"
];
const support = ["Compras y Almacen", "Gestion Financiera", "Mantenimiento y Aseo"];

let alertMode = false;

const strategicGrid = document.getElementById("strategicGrid");
const operationalGrid = document.getElementById("operationalGrid");
const supportGrid = document.getElementById("supportGrid");
const toggleAlert = document.getElementById("toggleAlert");
const modal = document.getElementById("modal");
const panelHead = document.getElementById("panelHead");
const panelTitle = document.getElementById("panelTitle");
const panelDesc = document.getElementById("panelDesc");
const panelStats = document.getElementById("panelStats");
const fecha = document.getElementById("fecha");

fecha.textContent = "Sistema de Gestion de la Calidad Dinamico - " + new Date().toLocaleDateString("es-CO");

function createCard(title) {
  const details = processDetails[title];
  const card = document.createElement("article");
  card.className = "card " + details.tone;
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

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
    warning.textContent = "REVISION NECESARIA";
    card.appendChild(warning);
  }

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

  return card;
}

function renderCards() {
  strategicGrid.innerHTML = "";
  operationalGrid.innerHTML = "";
  supportGrid.innerHTML = "";

  strategic.forEach(function (title) {
    strategicGrid.appendChild(createCard(title));
  });

  operational.forEach(function (title) {
    operationalGrid.appendChild(createCard(title));
  });

  support.forEach(function (title) {
    supportGrid.appendChild(createCard(title));
  });
}

function openModal(title) {
  const details = processDetails[title];
  panelTitle.textContent = details.icon + " " + title;
  panelDesc.textContent = '"' + details.text + '"';

  if (details.tone === "blue") {
    panelHead.style.background = "#eff6ff";
  } else if (details.tone === "orange") {
    panelHead.style.background = "#fff7ed";
  } else {
    panelHead.style.background = "#f9fafb";
  }

  panelStats.innerHTML = "";
  Object.entries(details.stats).forEach(function (entry) {
    const item = document.createElement("div");
    item.className = "stat";

    const key = document.createElement("span");
    key.textContent = entry[0];

    const value = document.createElement("strong");
    value.textContent = entry[1];

    item.appendChild(key);
    item.appendChild(value);
    panelStats.appendChild(item);
  });

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

toggleAlert.addEventListener("click", function () {
  alertMode = !alertMode;
  toggleAlert.classList.toggle("alert", alertMode);
  toggleAlert.textContent = alertMode ? "Simulando Alerta" : "Modo Normal";
  renderCards();
});

document.getElementById("closeTop").addEventListener("click", closeModal);
document.getElementById("closeBottom").addEventListener("click", closeModal);
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

renderCards();
