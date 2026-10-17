import { projectSources } from './shared'
import type { ProjectDetail } from './types'

export const projectsEs: readonly ProjectDetail[] = [
  {
    ...projectSources['dulces-flares'],
    title: 'Dulces-Flares · PURO DOCE',
    headline: 'Una experiencia de marca que lleva del antojo al pedido.',
    summary:
      'Web de confitería en portugués con catálogo tipado, carrito persistente y preparación de pedidos por WhatsApp, construida con Next.js, React y TypeScript.',
    intro:
      'PURO DOCE combina una identidad de crema, caramelo y cacao con un recorrido de compra ligero: descubrir los productos, ajustar el carrito y preparar un mensaje para WhatsApp. El trabajo equilibra diseño expresivo, estado del navegador y carga de recursos.',
    role: 'Desarrollador frontend · proyecto personal',
    context: 'Experiencia de marca y catálogo digital para una confitería',
    status: 'Demo publicada · pedidos preparados para WhatsApp',
    period: '2026',
    problem:
      'Una página rica en imágenes y movimiento debe permitir que el visitante encuentre productos y arme su pedido desde el móvil. El reto técnico es conservar esa personalidad visual sin cargar todas las interacciones al abrir la web ni perder el carrito al recargar.',
    solution:
      'Construir el sitio con App Router y secciones renderizadas en el servidor, reservando pequeñas islas cliente para navegación, carrito y efectos. Centralizar los productos en datos tipados, persistir las líneas del carrito y generar el resumen del pedido como un mensaje para WhatsApp.',
    contributions: [
      {
        title: 'Identidad visual y catálogo',
        description:
          'Composición responsive con tipografía expresiva, tokens de color y tamaños fluidos. Un catálogo de seis productos reúne precios en reales e imágenes WebP importadas estáticamente para alimentar las tarjetas de producto.'
      },
      {
        title: 'Carrito que conserva la selección',
        description:
          'Estado centralizado con Zustand para añadir productos, incrementar cantidades, eliminar líneas y derivar totales. La persistencia guarda las líneas en localStorage; la apertura del panel y los pasos del formulario siguen siendo estado de interfaz.'
      },
      {
        title: 'Del carrito a una conversación',
        description:
          'Flujo de carrito, formulario y pantalla final. A partir del nombre, barrio, productos y cantidades se prepara un texto con subtotales y total, codificado en un enlace wa.me que abre WhatsApp para continuar el pedido.'
      },
      {
        title: 'Movimiento con carga bajo demanda',
        description:
          'Panel de carrito importado al necesitarlo, revelados CSS con un IntersectionObserver compartido y cursor decorativo diferido hasta el primer movimiento de un puntero fino. El cursor requiere un puntero fino, ignora movimientos táctiles y respeta la preferencia de movimiento reducido.'
      }
    ],
    architecture: {
      summary:
        'Frontend con Next.js App Router: presentación de contenido en Server Components, componentes cliente acotados y lógica separada para catálogo, estado y composición del pedido. La salida del recorrido es un enlace a WhatsApp; la confirmación se realiza fuera de la web.',
      steps: [
        {
          title: 'Página y datos del catálogo',
          description:
            'Las secciones consumen productos tipados desde lib/products.ts. Precios, identificadores e imágenes tienen una fuente común; el contenido visual no necesita un gestor remoto para renderizarse.'
        },
        {
          title: 'Estado e interacción del carrito',
          description:
            'lib/cart-store.ts concentra las acciones y persiste las líneas del carrito. DeferredCartDrawer carga el panel en la primera apertura y lo mantiene montado para las siguientes interacciones.'
        },
        {
          title: 'Composición del pedido',
          description:
            'lib/order.ts separa el formato monetario y la generación del mensaje de la interfaz. CartDrawer coordina los pasos, abre WhatsApp y limpia la selección tras iniciar esa salida.'
        },
        {
          title: 'Capa visual y contratos de recursos',
          description:
            'CSS y un observador compartido coordinan los revelados. Las pruebas con node:test comprueban contratos de imágenes, secciones servidor y comportamiento del cursor; otras inspeccionan el build para limitar preloads y JavaScript inicial.'
        }
      ]
    },
    decisions: [
      {
        title: 'Separar contenido servidor e interacción cliente',
        description:
          'Mantener las secciones visuales como Server Components y cargar de forma diferida el carrito y el cursor decorativo.',
        tradeoff:
          'Reduce el trabajo de interacción inicial, pero exige cuidar los límites servidor/cliente y asumir la descarga del panel en su primera apertura.'
      },
      {
        title: 'Catálogo tipado y persistencia local',
        description:
          'Guardar los productos en código y persistir solo las líneas del carrito con Zustand, separando los datos de compra del estado visual del panel.',
        tradeoff:
          'Simplifica el despliegue y conserva la selección en el mismo navegador. Los cambios de catálogo requieren desplegar y el carrito no se sincroniza entre dispositivos.'
      },
      {
        title: 'Usar WhatsApp como continuación del pedido',
        description:
          'Generar un mensaje estructurado en lugar de implementar una infraestructura propia de pedidos y pagos.',
        tradeoff:
          'El sitio prepara el pedido, pero abrir WhatsApp no confirma su envío ni aceptación. El carrito se vacía al abrir el enlace; la confirmación y el pago quedan en la conversación.'
      },
      {
        title: 'Proteger el diseño con presupuestos técnicos',
        description:
          'Usar WebP, revelados CSS y carga opcional del cursor, junto con pruebas que establecen límites para imágenes, preloads y JavaScript.',
        tradeoff:
          'Los efectos necesitan lógica propia y los límites deben mantenerse al añadir recursos. Estos contratos documentan restricciones; no sustituyen una medición actual de la experiencia real.'
      }
    ],
    outcomes: [
      'Demo pública que conecta una identidad visual propia con un catálogo de seis productos y navegación responsive.',
      'Carrito con cantidades, eliminación, totales y recuperación de la selección desde el almacenamiento del navegador.',
      'Preparación de un mensaje de pedido con datos del cliente, líneas y total para continuar por WhatsApp.',
      'Separación entre contenido e interacción, carga diferida y pruebas de contratos de rendimiento presentes en el repositorio.'
    ],
    learnings:
      'La inmersión visual también depende de cuándo se carga y ejecuta cada efecto. Separar catálogo, estado y mensaje facilita evolucionar el recorrido; explicitar la salida a WhatsApp ayuda a distinguir una interfaz terminada de un pedido realmente confirmado.'
  },
  {
    ...projectSources['fastapi-ecosystem-lab'],
    title: 'FastAPI Ecosystem Lab',
    headline: 'Un backend, varios clientes y límites explícitos.',
    summary:
      'Un monorepo de aprendizaje que conecta un backend modular con FastAPI y un cliente Streamlit, con una interfaz Next.js en desarrollo.',
    intro:
      'El proyecto explora cómo conectar autenticación, cuentas y operaciones sobre ítems manteniendo la lógica de aplicación separada de bases de datos, caché y servicios externos.',
    role: 'Desarrollador · proyecto personal de aprendizaje',
    context: 'Práctica de arquitectura backend e integración full stack',
    status: 'Backend en evolución · interfaz Next.js en desarrollo',
    period: 'Mar 2026 – Actualidad',
    problem:
      'Un backend que sirve a distintos clientes necesita reglas coherentes de autenticación, propiedad y acceso a datos. Mezclarlas en las rutas dificulta entenderlas a medida que aumentan las integraciones.',
    solution:
      'Organizar autenticación, usuarios e ítems en módulos. Situar los flujos de aplicación detrás de las rutas y conectar persistencia, caché, archivos y eventos mediante adaptadores.',
    contributions: [
      {
        title: 'Autenticación y cuentas',
        description:
          'Conexión de una API versionada con autenticación, renovación de tokens, cierre de sesión y gestión de cuentas.'
      },
      {
        title: 'Operaciones con control de propiedad',
        description:
          'Implementación de flujos que resuelven el propietario autorizado antes de consultar o modificar ítems, junto con lecturas de listas mediante caché bajo demanda.'
      },
      {
        title: 'Adaptadores e integración de clientes',
        description:
          'Composición de adaptadores SQLAlchemy, Redis, Cloudinary y eventos del servidor, con un cliente Streamlit y una interfaz Next.js en desarrollo.'
      }
    ],
    architecture: {
      summary:
        'Un backend modular dentro de un monorepo de aprendizaje. La presentación llama a los flujos de aplicación; las reglas de dominio y los puertos separan esos flujos de la infraestructura.',
      steps: [
        {
          title: 'Clientes y API',
          description:
            'El cliente Streamlit consume la API versionada de FastAPI. Una interfaz independiente con Next.js está en desarrollo.'
        },
        {
          title: 'Flujos de aplicación',
          description:
            'Los módulos de autenticación, usuarios e ítems coordinan operaciones y autorización mediante casos de uso.'
        },
        {
          title: 'Dominio y puertos',
          description:
            'Los límites de aplicación describen la persistencia y los servicios que necesita cada flujo.'
        },
        {
          title: 'Adaptadores de infraestructura',
          description:
            'La composición de dependencias conecta SQLAlchemy, caché Redis, archivos en Cloudinary y eventos SSE.'
        }
      ]
    },
    decisions: [
      {
        title: 'Organizar por funcionalidad y responsabilidad',
        description:
          'Separar autenticación, usuarios e ítems, con responsabilidades de presentación, aplicación, dominio e infraestructura.',
        tradeoff:
          'Más módulos y configuración explícita a cambio de ubicaciones claras para modificar un flujo o una integración.'
      },
      {
        title: 'Usar puertos para servicios externos',
        description:
          'Componer los adaptadores concretos de persistencia, caché, archivos y eventos en el límite de dependencias.',
        tradeoff:
          'Los contratos de adaptadores requieren trabajo inicial y mantienen los detalles de cada servicio fuera de los flujos de aplicación.'
      },
      {
        title: 'Consultar listas mediante caché',
        description:
          'Aplicar caché bajo demanda a las listas de ítems después de resolver el alcance autorizado del usuario.',
        tradeoff:
          'La caché añade necesidades de invalidación y coherencia junto al acceso a la base de datos.'
      }
    ],
    outcomes: [
      'API versionada para autenticación, cuentas y operaciones sobre ítems con control de propiedad.',
      'Flujos de aplicación conectados con persistencia, caché, carga de archivos y adaptadores SSE.',
      'Cliente Streamlit implementado e interfaz Next.js en desarrollo dentro del mismo monorepo.'
    ],
    learnings:
      'Separar reglas de aplicación e infraestructura hace visibles las dependencias. El proyecto permite estudiar el alcance de autorización, la coherencia de caché y cómo distintos clientes comparten una API.'
  },
  {
    ...projectSources['django-ecommerce'],
    title: 'E-commerce con Django',
    headline: 'Conectar el catálogo con el pedido y el pago.',
    summary:
      'Una tienda educativa con Django que reúne catálogo, carrito por sesión, cuentas, pedidos e integración con Stripe Checkout.',
    intro:
      'El foco es el recorrido de compra: encontrar un producto, ajustar cantidades, crear un pedido y delegar el paso de pago a Stripe. Cada parte del flujo se organiza en una aplicación Django.',
    role: 'Desarrollador · proyecto personal de aprendizaje',
    context: 'Flujos de comercio e integración de pagos con Django',
    status: 'Implementación educativa',
    period: 'Ene 2025 – Ene 2026',
    problem:
      'Una compra conecta navegación y estado temporal del carrito con pedidos autenticados y un servicio externo de pago. Cada transición necesita un lugar claro en la aplicación.',
    solution:
      'Construir un monolito modular con aplicaciones para catálogo, cuentas, carrito, pedidos y pagos. Guardar el carrito en la sesión y crear sesiones de Stripe Checkout desde el flujo de pago.',
    contributions: [
      {
        title: 'Catálogo y carrito',
        description:
          'Conexión de categorías y marcas con un carrito por sesión que permite añadir, actualizar, eliminar y calcular totales.'
      },
      {
        title: 'Cuentas y pedidos',
        description:
          'Implementación de pedidos autenticados y modelos con estados pendiente y pagado.'
      },
      {
        title: 'Pago y confirmación',
        description:
          'Integración de la creación de sesiones de Stripe Checkout y del flujo de correo de confirmación de pedidos.'
      }
    ],
    architecture: {
      summary:
        'Monolito Django dividido en account, web, cart, order y payment, con modelos ORM, vistas basadas en clases y plantillas renderizadas en el servidor.',
      steps: [
        {
          title: 'Explorar el catálogo',
          description:
            'Los modelos de productos, categorías y marcas alimentan las páginas del catálogo.'
        },
        {
          title: 'Mantener el carrito en sesión',
          description:
            'El carrito guarda su diccionario de ítems en request.session y gestiona cantidades y totales.'
        },
        {
          title: 'Crear un pedido',
          description:
            'El flujo autenticado conecta el carrito con registros persistentes de pedidos.'
        },
        {
          title: 'Iniciar el pago',
          description:
            'La vista de pago crea una sesión de Stripe Checkout; el proyecto también incluye flujos de estado pagado y confirmación.'
        }
      ]
    },
    decisions: [
      {
        title: 'Mantener la tienda en un monolito Django',
        description:
          'Separar las responsabilidades comerciales en aplicaciones Django dentro de un mismo monolito.',
        tradeoff:
          'Un entorno compartido facilita la integración; los límites entre aplicaciones requieren cuidado al crecer.'
      },
      {
        title: 'Guardar el carrito en la sesión',
        description:
          'Representar el carrito mediante un diccionario gestionado por la sesión de Django.',
        tradeoff:
          'El estado temporal resulta sencillo, mientras que la persistencia y continuidad entre dispositivos dependen de la sesión.'
      },
      {
        title: 'Usar Stripe Checkout alojado',
        description:
          'Crear una sesión de Checkout y delegar la interfaz de pago a Stripe.',
        tradeoff:
          'Reduce el trabajo de interfaz de pago; la conciliación fiable de los estados de pago sigue siendo una responsabilidad de ingeniería independiente.'
      }
    ],
    outcomes: [
      'Catálogo organizado mediante productos, categorías y marcas.',
      'Carrito por sesión con cambios de cantidad, eliminación de ítems y cálculo de totales.',
      'Flujo de pedidos conectado con la creación de sesiones de Stripe Checkout y la lógica de correo de confirmación.'
    ],
    learnings:
      'La integración de pagos abarca datos de sesión, pedidos persistentes y una sesión de pago externa. Seguir esas transiciones ayuda a entender los límites y responsabilidades de cada aplicación Django.'
  },
  {
    ...projectSources['social-bookmarking'],
    title: 'Social Bookmarking',
    headline: 'Convertir imágenes guardadas en descubrimiento social.',
    summary:
      'Una aplicación Django para guardar imágenes, editar perfiles y descubrir contenido mediante likes, seguidores y un feed de actividad.',
    intro:
      'El proyecto conecta la publicación de imágenes con relaciones sociales. Django sirve las páginas y JavaScript actualiza interacciones y carga fragmentos de imágenes mediante solicitudes.',
    role: 'Desarrollador · proyecto personal de aprendizaje',
    context: 'Interacciones sociales y descubrimiento de contenido con Django',
    status: 'Implementación educativa',
    period: 'Oct 2024 – Ago 2025',
    problem:
      'Una colección de imágenes gana utilidad cuando permite descubrir quién las guardó, seguir perfiles relacionados e interactuar sin recargar toda la página en cada acción.',
    solution:
      'Combinar marcadores de imágenes, perfiles y relaciones sociales en Django, con endpoints AJAX para likes, seguidores y carga paginada de imágenes.',
    contributions: [
      {
        title: 'Publicación y descubrimiento de imágenes',
        description:
          'Implementación de marcadores de imágenes, paginación de listas y conteo de visitas por sesión.'
      },
      {
        title: 'Perfiles y relaciones sociales',
        description:
          'Conexión de la edición de perfiles con acciones de like y seguimiento, y sus operaciones inversas.'
      },
      {
        title: 'Feed de actividad',
        description:
          'Construcción de un modelo de actividad con referencias a distintos objetos y un panel que filtra la actividad de usuarios seguidos.'
      }
    ],
    architecture: {
      summary:
        'Los módulos accounts, images y action de Django conectan relaciones ORM, plantillas del servidor y solicitudes JavaScript/AJAX.',
      steps: [
        {
          title: 'Publicar y gestionar el perfil',
          description:
            'Las vistas de cuentas e imágenes gestionan perfiles y el flujo de guardado de imágenes.'
        },
        {
          title: 'Solicitar una interacción',
          description:
            'JavaScript envía solicitudes AJAX para likes y seguimiento; las respuestas de likes devuelven JSON.'
        },
        {
          title: 'Registrar y filtrar actividad',
          description:
            'El modelo enlaza acciones con distintos objetos y el panel selecciona actividad de usuarios seguidos.'
        },
        {
          title: 'Cargar más imágenes',
          description:
            'Los fragmentos paginados permiten ampliar la lista en el navegador mediante solicitudes adicionales.'
        }
      ]
    },
    decisions: [
      {
        title: 'Añadir AJAX a las páginas del servidor',
        description:
          'Mantener plantillas Django y añadir solicitudes específicas para acciones sociales y paginación.',
        tradeoff:
          'Las actualizaciones puntuales mantienen pequeño el frontend; los scripts deben gestionar respuestas y estado de interfaz.'
      },
      {
        title: 'Usar un modelo genérico de actividad',
        description:
          'Referenciar distintos destinos con GenericForeignKey y suprimir eventos recientes coincidentes.',
        tradeoff:
          'El feed representa varios tipos de contenido y deja más responsabilidad sobre esas relaciones a la aplicación.'
      },
      {
        title: 'Contar visitas por sesión',
        description:
          'Registrar las visitas a imágenes en la sesión para evitar contar cada solicitud repetida durante la misma sesión de navegación.',
        tradeoff:
          'Es un conteo sencillo por sesión, cuya precisión depende de cómo se crean y conservan las sesiones.'
      }
    ],
    outcomes: [
      'Marcadores de imágenes y edición de perfiles en una misma aplicación.',
      'Likes, seguimiento y fragmentos paginados de imágenes mediante AJAX.',
      'Feed filtrado por usuarios seguidos y conteo de visitas a imágenes por sesión.'
    ],
    learnings:
      'Las funciones sociales unen relaciones de datos y pequeños cambios de interfaz. Likes, seguidores y un feed genérico hacen concretas las decisiones sobre consultas, eventos duplicados y estado del navegador.'
  }
]
