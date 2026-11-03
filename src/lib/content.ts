export type ContentSection = { title: string; text: string; points?: string[] };
export const applications = [
  {
    slug: "educacion",
    title: "Educación",
    number: "01",
    summary:
      "Espacios para aprender. Un sistema para desarrollar infraestructura educativa con equipos profesionales.",
    detail:
      "Escuelas, aulas y edificios de apoyo necesitan integrar arquitectura, estructura, instalaciones y uso cotidiano. VBT aporta un sistema de muros que se incorpora al proyecto desde su definición.",
    priorities: [
      "Coordinar modulación, vanos e instalaciones desde el proyecto.",
      "Definir acabados y mantenimiento según el uso de cada espacio.",
      "Organizar el suministro y el montaje con el equipo de obra.",
    ],
    projectSlugs: ["escuela-dominguez", "escuela-godoy-cruz"],
  },
  {
    slug: "salud",
    title: "Salud",
    number: "02",
    summary:
      "Infraestructura de atención, con soluciones de muro coordinadas con las necesidades de cada establecimiento.",
    detail:
      "Los proyectos de salud exigen resolver circulación, instalaciones, higiene y mantenimiento como un conjunto. La selección del sistema y los acabados se evalúa con los responsables del establecimiento y sus profesionales.",
    priorities: [
      "Coordinar instalaciones y reservas antes del hormigonado.",
      "Especificar acabados compatibles con los procedimientos de limpieza.",
      "Evaluar cada configuración dentro de los requisitos del proyecto.",
    ],
    projectSlugs: ["centros-salud-panama"],
  },
  {
    slug: "institucional",
    title: "Institucional",
    number: "03",
    summary:
      "Edificios públicos y espacios de trabajo que responden a programas específicos.",
    detail:
      "Oficinas, laboratorios y edificios institucionales reúnen usos y exigencias diferentes. VBT se integra a una solución proyectada para cada programa, con sus detalles y responsabilidades definidos.",
    priorities: [
      "Establecer los requerimientos de uso antes de elegir la configuración.",
      "Documentar la solución estructural y los encuentros.",
      "Coordinar a proyectistas, constructores y proveedores.",
    ],
    projectSlugs: ["laboratorio-balistico-mendoza"],
  },
  {
    slug: "industrial",
    title: "Industria",
    number: "04",
    summary:
      "Muros para proyectos industriales, coordinados con la operación, la estructura y las instalaciones.",
    detail:
      "En un edificio industrial, cerramientos, circulación e instalaciones deben responder al proceso que alojan. El sistema se evalúa según las acciones, la exposición y las condiciones particulares de esa operación.",
    priorities: [
      "Definir exposición y condiciones de servicio.",
      "Coordinar encuentros con la estructura del edificio.",
      "Planificar suministro, ejecución y mantenimiento.",
    ],
    projectSlugs: ["naves-canada"],
  },
  {
    slug: "comercial",
    title: "Comercial",
    number: "05",
    summary:
      "Arquitectura para trabajar, recibir y prestar servicios, con una solución adaptada al proyecto.",
    detail:
      "Locales, oficinas y edificios de servicios requieren flexibilidad de programa y claridad en su ejecución. VBT puede evaluarse como parte de un proyecto que resuelva estructura, instalaciones, imagen y operación.",
    priorities: [
      "Estudiar distribución, aberturas y posibilidades de adaptación.",
      "Coordinar las instalaciones y terminaciones del local.",
      "Definir el alcance de suministro y la ejecución con el constructor.",
    ],
    projectSlugs: [],
  },
  {
    slug: "residencial",
    title: "Residencial",
    number: "06",
    summary:
      "Desde una vivienda hasta un desarrollo. Tecnología VBT y empresas que la llevan a obra.",
    detail:
      "Proyectos individuales, conjuntos y vivienda social comparten la necesidad de un alcance claro. VBT aporta tecnología y conecta la demanda con profesionales y empresas que construyen con el sistema.",
    priorities: [
      "Distinguir suministro del sistema y vivienda completa.",
      "Definir terreno, proyecto, permisos y servicios.",
      "Identificar quién cotiza, construye y responde por cada parte.",
    ],
    projectSlugs: ["viviendas-panama", "costa-paradiso"],
  },
];

export const projects = [
  {
    slug: "escuela-dominguez",
    title: "Escuela Francisco Javier Domínguez",
    location: "Junín, Mendoza · Argentina",
    sector: "educacion",
    category: "Educación",
    summary:
      "Una nueva infraestructura educativa en Junín, incorporada a los antecedentes de VBT.",
    story:
      "El nuevo edificio de la escuela Francisco Javier Domínguez fue inaugurado en 2026. Es uno de los proyectos educativos señalados por VBT para mostrar la aplicación del sistema en infraestructura de uso público.",
    collaboration:
      "La información pública identifica a Indari Construcciones SA como contratista. VBT participa desde el ámbito de la tecnología constructiva; el alcance de cada equipo se documenta en la ficha del proyecto.",
    source:
      "https://prensa.mendoza.gob.ar/cornejo-inauguro-en-junin-una-escuela-construida-en-solo-seis-meses-con-un-innovador-sistema-constructivo/",
    sourceLabel: "Gobierno de Mendoza · inauguración",
    note: "La referencia al sistema VBT fue aportada por el equipo. Consultanos por la documentación del proyecto.",
  },
  {
    slug: "escuela-godoy-cruz",
    title: "Escuela Club Deportivo Godoy Cruz",
    location: "Coquimbito, Mendoza · Argentina",
    sector: "educacion",
    category: "Educación",
    summary:
      "Un antecedente de infraestructura educativa vinculado al Club Deportivo Godoy Cruz Antonio Tomba.",
    story:
      "La escuela en el predio del Club Deportivo Godoy Cruz reúne una aplicación educativa del sistema. La inauguración fue comunicada por el municipio en abril de 2025, que menciona la participación de Vision Building Tech.",
    collaboration:
      "Cada obra combina el trabajo del comitente, el equipo profesional y las empresas participantes. Consultanos para conocer el alcance específico de provisión y acompañamiento.",
    source:
      "https://www.godoycruz.gob.ar/costarelli-participo-la-inauguracion-la-nueva-escuela-predio-godoy-cruz/",
    sourceLabel: "Municipalidad de Godoy Cruz",
    note: "Las prestaciones y plazos se evalúan según la configuración y la etapa de obra considerada.",
  },
  {
    slug: "laboratorio-balistico-mendoza",
    title: "Laboratorio de Huellas Balísticas",
    location: "Mendoza · Argentina",
    sector: "institucional",
    category: "Institucional",
    summary:
      "Una aplicación del sistema en infraestructura especializada de la provincia de Mendoza.",
    story:
      "El proyecto del Laboratorio Provincial de Huellas Balísticas fue presentado públicamente en 2025. La comunicación provincial identifica el sistema Vision Building Technologies, con encofrado permanente y hormigón armado.",
    collaboration:
      "La función del edificio exige coordinación entre arquitectura, equipamiento, instalaciones y responsables técnicos. VBT se integra al proyecto desde su solución de muros.",
    source:
      "https://prensa.mendoza.gob.ar/mendoza-lider-en-argentina-tendra-el-primer-laboratorio-balistico-conectado-a-interpol/",
    sourceLabel: "Gobierno de Mendoza · presentación del proyecto",
    note: "El nombre describe el uso del laboratorio. No expresa una clasificación de resistencia balística de los muros.",
  },
  {
    slug: "centros-salud-panama",
    title: "Infraestructura de salud en Panamá",
    location: "Panamá",
    sector: "salud",
    category: "Salud",
    summary:
      "Experiencia en establecimientos de atención, entre las aplicaciones identificadas por el equipo VBT.",
    story:
      "El equipo VBT identifica proyectos de centros de salud en Panamá entre sus antecedentes. Esta experiencia permite conversar sobre coordinación de instalaciones, superficies y soluciones adaptadas a edificios de atención.",
    collaboration:
      "La selección de materiales y detalles se realiza con los profesionales y responsables de cada establecimiento. Consultanos por antecedentes comparables a tu proyecto.",
    source: "https://visionlatam.com/",
    sourceLabel: "VBT · aplicaciones",
    note: "Solicitá la ficha específica para conocer establecimiento, participantes y alcance de suministro.",
  },
  {
    slug: "viviendas-panama",
    title: "Vivienda en Panamá",
    location: "Panamá",
    sector: "residencial",
    category: "Residencial",
    summary:
      "El recorrido residencial incluye antecedentes de vivienda social y proyectos identificados por VBT en Panamá.",
    story:
      "El portfolio de VBT incluye el antecedente Techos de Esperanza en Panamá. La tecnología se incorpora a proyectos de vivienda con una definición concreta del alcance, la provisión y los equipos constructores.",
    collaboration:
      "El suministro del sistema y la ejecución de una vivienda son roles diferentes. Cada ficha comercial debe identificar al responsable del proyecto y del contrato de construcción.",
    source: "https://visionlatam.com/proyectos/",
    sourceLabel: "VBT · portfolio",
    note: "La referencia no atribuye a VBT la totalidad del programa Techos de Esperanza.",
  },
  {
    slug: "costa-paradiso",
    title: "Costa Paradiso",
    location: "Puerto Viejo · Costa Rica",
    sector: "residencial",
    category: "Residencial",
    summary:
      "Un antecedente residencial internacional incluido en el portfolio de VBT.",
    story:
      "Costa Paradiso, en Puerto Viejo, Costa Rica, forma parte de las referencias residenciales publicadas por VBT. Su inclusión amplía la conversación sobre arquitectura, contexto y aplicación del sistema.",
    collaboration:
      "Los proyectos internacionales requieren leer el alcance de cada participante y sus condiciones locales. La experiencia de un caso no sustituye la evaluación técnica de una obra nueva.",
    source: "https://visionlatam.com/proyectos/",
    sourceLabel: "VBT · portfolio",
    note: "Consultanos por el alcance del sistema y la documentación disponible de este antecedente.",
  },
  {
    slug: "naves-canada",
    title: "Naves industriales Vision Group",
    location: "Canadá",
    sector: "industrial",
    category: "Industria",
    summary:
      "Una referencia de aplicación industrial incluida en el portfolio de VBT.",
    story:
      "Las naves industriales de Vision Group en Canadá aparecen entre los antecedentes publicados por VBT. El caso abre una línea de aplicaciones donde el muro debe responder al uso, la exposición y la operación del edificio.",
    collaboration:
      "La experiencia del fabricante, el proveedor local y el constructor debe identificarse por separado. Consultanos para revisar un antecedente comparable al uso industrial que estás evaluando.",
    source: "https://visionlatam.com/proyectos/",
    sourceLabel: "VBT · portfolio",
    note: "No se atribuyen superficies, capacidades ni prestaciones industriales sin la ficha específica.",
  },
];

export const resources: {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sections: ContentSection[];
}[] = [
  {
    slug: "entender-el-sistema",
    title: "Entender la tecnología VBT",
    category: "Entender",
    summary:
      "Los materiales, las funciones y las dos familias que dan forma al muro.",
    sections: [
      {
        title: "Un muro, materiales con funciones diferentes",
        text: "VBT utiliza perfiles de PVC como encofrado permanente para ejecutar muros de hormigón armado in situ. Los perfiles dan forma al conjunto y permanecen como parte del sistema. El hormigón y las armaduras conforman el elemento resistente definido por el proyecto.",
      },
      {
        title: "VBT80 y VBT150",
        text: "VBT80 se ensambla mediante deslizamiento vertical de sus componentes. VBT150 utiliza un encastre horizontal. Las piezas y procedimientos son propios de cada familia; no son intercambiables.",
        points: [
          "VBT150 es una denominación comercial del sistema de seis pulgadas.",
          "La selección de la familia depende de la solución proyectada.",
          "El montaje debe seguir la documentación correspondiente al producto suministrado.",
        ],
      },
      {
        title: "Del concepto al proyecto",
        text: "Para evaluar una aplicación se estudian geometría, acciones, apoyos, aberturas, instalaciones, exposición y requisitos locales. Una explicación del sistema permite comprenderlo; la documentación de proyecto define cómo se utiliza en cada obra.",
      },
    ],
  },
  {
    slug: "proyectar-con-vbt",
    title: "Proyectar con VBT",
    category: "Proyectar",
    summary:
      "Qué conviene coordinar antes de definir la solución y solicitar una propuesta.",
    sections: [
      {
        title: "La información de partida",
        text: "Una consulta con ubicación, uso, planos y estado del proyecto permite orientar la evaluación. También es útil identificar al equipo profesional, al constructor y el alcance que se busca contratar.",
        points: [
          "Ubicación, programa y etapa de desarrollo.",
          "Planos o esquema de geometría y aberturas.",
          "Instalaciones relevantes y exigencias de uso.",
          "Suministro, acompañamiento o vínculo con una empresa constructora.",
        ],
      },
      {
        title: "Coordinar antes de construir",
        text: "Modulación, estructura, aberturas, encuentros e instalaciones se resuelven en conjunto. Las reservas y pases requieren coordinación previa al llenado; los cambios posteriores deben evaluarse técnicamente.",
      },
      {
        title: "Prestaciones con alcance",
        text: "La información de fuego, aislación, exposición o capacidad debe corresponder al producto y a la configuración evaluada. Solicitá la evidencia aplicable a tu proyecto; un ensayo de un material no representa automáticamente todo el muro.",
      },
    ],
  },
  {
    slug: "montaje-y-obra",
    title: "Montaje y obra",
    category: "Construir",
    summary:
      "Una lectura del proceso, desde el arranque hasta el muro terminado.",
    sections: [
      {
        title: "Una secuencia coordinada",
        text: "El proceso reúne preparación de base y arranques, ensamblaje de perfiles, colocación coordinada de armaduras y reservas, estabilidad temporal, control previo y hormigonado. El orden detallado depende de la familia y del proyecto.",
      },
      {
        title: "El control antes del llenado",
        text: "La geometría, las uniones, los apoyos temporales, las armaduras y las instalaciones deben verificarse antes de hormigonar. Las condiciones de colocación se definen con documentación y responsables de obra, sin aplicar una receta universal.",
      },
      {
        title: "Documentación para la ejecución",
        text: "El esquema animado del sitio explica el concepto. Para ejecutar necesitás el proyecto y la documentación vigente del sistema suministrado, además de la supervisión profesional que corresponda.",
      },
    ],
  },
  {
    slug: "terminaciones-y-cuidados",
    title: "Terminaciones y cuidados",
    category: "Mantener",
    summary:
      "Superficies, instalaciones, fijaciones y cuidados según la solución elegida.",
    sections: [
      {
        title: "Superficie y acabado",
        text: "Los perfiles permanecen en el muro y pueden constituir una superficie final. Cuando se proyecta un revestimiento o pintura, se debe comprobar su compatibilidad y la preparación indicada para esa solución.",
      },
      {
        title: "Uso y mantenimiento",
        text: "La limpieza y los cuidados se definen según superficie, acabado y condiciones de uso. No se debe asumir mantenimiento nulo ni compatibilidad de cualquier producto de limpieza. Solicitá la guía correspondiente al sistema y al acabado de tu obra.",
      },
      {
        title: "Fijaciones y reformas",
        text: "Para incorporar equipos, abrir pasos o modificar el muro conviene consultar el proyecto y a los responsables técnicos. Cargas, anclajes y perforaciones se evalúan según la configuración; no dependen sólo del revestimiento visible.",
      },
    ],
  },
];

export const faqs = [
  {
    question: "¿Qué es el encofrado permanente?",
    answer:
      "Es un conjunto de perfiles que da forma al muro durante el hormigonado y permanece incorporado después. En VBT, los perfiles son de PVC y el proyecto define el hormigón, las armaduras y el resto de la solución.",
  },
  {
    question: "¿VBT80 y VBT150 se montan igual?",
    answer:
      "No. VBT80 utiliza un deslizamiento vertical de sus componentes y VBT150 un encastre horizontal. Cada familia tiene piezas, detalles y documentación propios.",
  },
  {
    question: "¿VBT sirve sólo para viviendas?",
    answer:
      "No. El sistema se evalúa en proyectos educativos, sanitarios, institucionales, industriales, comerciales y residenciales. Su aplicación concreta depende del proyecto, los requisitos y la configuración elegida.",
  },
  {
    question: "¿Quién realiza el proyecto y el cálculo?",
    answer:
      "Los profesionales responsables de cada obra definen y verifican el proyecto. VBT acompaña la evaluación del sistema dentro de su alcance de provisión y soporte.",
  },
  {
    question: "¿Cómo se resuelven instalaciones y aberturas?",
    answer:
      "Se coordinan con el proyecto antes del llenado. Los pases, reservas, encuentros y vanos necesitan sus detalles específicos; no se recomienda resolverlos como cambios improvisados en obra.",
  },
  {
    question: "¿Se puede revestir el muro?",
    answer:
      "Sí, se pueden estudiar acabados compatibles. La preparación y los productos se definen para la superficie y el uso previstos. Solicitá la documentación correspondiente antes de especificar una terminación.",
  },
  {
    question: "¿VBT construye y vende las viviendas?",
    answer:
      "VBT presenta la tecnología y conecta consultas con empresas y profesionales que trabajan con el sistema. Cada oferta de vivienda debe identificar al responsable de cotizar, contratar, ejecutar y atender la posventa.",
  },
  {
    question: "¿Qué pasa si ya tengo arquitecto o constructor?",
    answer:
      "Podés seguir trabajando con tu equipo. Indicalo al consultar para que podamos acompañar la evaluación del sistema respetando esa relación.",
  },
  {
    question: "¿Los modelos publicados son casas disponibles?",
    answer:
      "Las tipologías conceptuales son puntos de partida para una propuesta. No representan unidades en stock, precios cerrados ni disponibilidad. Una oferta concreta debe precisar ubicación, responsable y alcance.",
  },
  {
    question: "¿Quién otorga el préstamo?",
    answer:
      "El banco evalúa y otorga el crédito. VBT no presta dinero ni aprueba solicitudes. Las condiciones y la elegibilidad del solicitante, del proyecto y del proveedor deben confirmarse con la entidad.",
  },
  {
    question: "¿La cuota UVA es fija en pesos?",
    answer:
      "No. El equivalente en pesos varía con el valor de la UVA, además de las condiciones y costos del producto. Para una evaluación actual utilizá el simulador y los canales oficiales del banco.",
  },
];
