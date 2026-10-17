import { projectSources } from './shared'
import type { ProjectDetail } from './types'

export const projectsEn: readonly ProjectDetail[] = [
  {
    ...projectSources['dulces-flares'],
    title: 'Dulces-Flares · PURO DOCE',
    headline: 'A brand experience from craving to order preparation.',
    summary:
      'A Portuguese-language confectionery storefront with a typed catalog, persistent cart and order preparation for WhatsApp, built with Next.js, React and TypeScript.',
    intro:
      'PURO DOCE pairs a cream, caramel and cocoa identity with a lightweight shopping journey: discover products, adjust the cart and prepare a WhatsApp message. The implementation balances expressive design, browser state and resource loading.',
    role: 'Frontend developer · personal project',
    context: 'Brand experience and digital catalog for a confectionery',
    status: 'Public demo · order preparation for WhatsApp',
    period: '2026',
    problem:
      'An image-rich, animated page still needs to help visitors find products and assemble an order on a phone. The technical challenge is preserving its visual personality without loading every interaction on arrival or losing the cart on reload.',
    solution:
      'Use App Router and server-rendered sections, with small client islands for navigation, cart and effects. Centralize products in typed data, persist cart lines and generate the order summary as a message for WhatsApp.',
    contributions: [
      {
        title: 'Visual identity and product catalog',
        description:
          'Responsive composition with expressive typography, color tokens and fluid sizing. A six-product catalog combines BRL prices and statically imported WebP images to populate the product cards.'
      },
      {
        title: 'A cart that remembers the selection',
        description:
          'Centralized Zustand state for adding products, increasing quantities, removing lines and deriving totals. Persistence saves cart lines in localStorage; drawer visibility and form steps remain interface state.'
      },
      {
        title: 'From cart to conversation',
        description:
          'A cart, form and final-screen flow. The customer name, neighborhood, products and quantities become a message containing subtotals and a total, encoded in a wa.me link that opens WhatsApp to continue the order.'
      },
      {
        title: 'Motion loaded when needed',
        description:
          'A drawer imported on demand, CSS reveals through a shared IntersectionObserver and a decorative cursor deferred until the first fine-pointer movement. The cursor requires a fine pointer, ignores touch movements and respects reduced-motion preferences.'
      }
    ],
    architecture: {
      summary:
        'A Next.js App Router frontend with Server Components for content, focused client components and separate modules for catalog, state and order composition. The journey ends in a WhatsApp link; order confirmation happens outside the site.',
      steps: [
        {
          title: 'Page and catalog data',
          description:
            'Sections consume typed products from lib/products.ts. Prices, identifiers and images share one source; rendering the visual content does not depend on a remote content manager.'
        },
        {
          title: 'Cart state and interaction',
          description:
            'lib/cart-store.ts centralizes actions and persists cart lines. DeferredCartDrawer loads the panel on first opening and keeps it mounted for subsequent interactions.'
        },
        {
          title: 'Order composition',
          description:
            'lib/order.ts separates money formatting and message generation from the interface. CartDrawer coordinates the steps, opens WhatsApp and clears the selection when initiating that handoff.'
        },
        {
          title: 'Visual layer and resource contracts',
          description:
            'CSS and a shared observer coordinate reveals. Tests using node:test check image, server-section and cursor-behavior contracts; build tests inspect preloads and initial JavaScript limits.'
        }
      ]
    },
    decisions: [
      {
        title: 'Separate server content from client interaction',
        description:
          'Keep visual sections as Server Components and defer the cart drawer and decorative cursor.',
        tradeoff:
          'This reduces initial interaction work, but requires explicit server/client boundaries and a panel download on first opening.'
      },
      {
        title: 'Typed catalog and local persistence',
        description:
          'Keep products in source code and persist only cart lines with Zustand, separating shopping data from drawer presentation state.',
        tradeoff:
          'Deployment stays simple and the same browser retains the selection. Catalog changes require redeployment, and the cart does not sync across devices.'
      },
      {
        title: 'Continue the order through WhatsApp',
        description:
          'Generate a structured message rather than building proprietary order and payment infrastructure.',
        tradeoff:
          'The site prepares the order, but opening WhatsApp does not confirm sending or acceptance. The cart clears when the link opens; confirmation and payment remain part of the conversation.'
      },
      {
        title: 'Protect the design with technical budgets',
        description:
          'Use WebP, CSS reveals and optional cursor loading alongside tests that establish image, preload and JavaScript limits.',
        tradeoff:
          'Effects require custom logic, and budgets must be maintained as resources change. These contracts specify constraints; they do not replace current measurements of the real experience.'
      }
    ],
    outcomes: [
      'A public demo connecting a distinctive visual identity with a six-product catalog and responsive navigation.',
      'Cart quantities, removal, totals and selection recovery from browser storage.',
      'Order-message preparation containing customer details, line items and a total for continuing through WhatsApp.',
      'Separated content and interaction, deferred loading and performance-contract tests available in the repository.'
    ],
    learnings:
      'Visual immersion also depends on when each effect loads and runs. Separating catalog, state and message composition makes the journey easier to evolve; an explicit WhatsApp handoff distinguishes a finished interface from an order that has actually been confirmed.'
  },
  {
    ...projectSources['fastapi-ecosystem-lab'],
    title: 'FastAPI Ecosystem Lab',
    headline: 'One backend, multiple clients, explicit boundaries.',
    summary:
      'A learning monorepo that connects a modular FastAPI backend to a Streamlit client, with a Next.js frontend in progress.',
    intro:
      'This project explores how authentication, account management and item workflows fit together when application logic stays separate from databases, caching and external services.',
    role: 'Developer · personal learning project',
    context: 'Backend architecture and full stack integration practice',
    status: 'Evolving backend · Next.js frontend in progress',
    period: 'Mar 2026 – Present',
    problem:
      'A backend serving different clients needs consistent rules for authentication, ownership and data access. Mixing those rules directly into routes makes them harder to follow as integrations grow.',
    solution:
      'Organize authentication, users and items into feature modules. Put application workflows behind API routes and connect persistence, caching, media and events through dedicated adapters.',
    contributions: [
      {
        title: 'Authentication and account workflows',
        description:
          'Connected a versioned API with authentication, token refresh, logout and account management.'
      },
      {
        title: 'Ownership-aware item operations',
        description:
          'Implemented item workflows that resolve the authorized owner before reading or changing records, alongside cache-aside list reads.'
      },
      {
        title: 'Adapters and client integration',
        description:
          'Composed SQLAlchemy, Redis, Cloudinary and server-sent event adapters, with a Streamlit client and an ongoing Next.js frontend.'
      }
    ],
    architecture: {
      summary:
        'A modular backend in one learning monorepo. Presentation calls application workflows; domain rules and ports separate those workflows from infrastructure.',
      steps: [
        {
          title: 'Clients and API',
          description:
            'A Streamlit client consumes the versioned FastAPI API. A separate Next.js frontend is in progress.'
        },
        {
          title: 'Application workflows',
          description:
            'Auth, users and items modules coordinate operations and authorization through use cases.'
        },
        {
          title: 'Domain and ports',
          description:
            'Application boundaries describe the persistence and service behavior each workflow needs.'
        },
        {
          title: 'Infrastructure adapters',
          description:
            'Dependency composition connects SQLAlchemy persistence, Redis cache, Cloudinary media and SSE events.'
        }
      ]
    },
    decisions: [
      {
        title: 'Organize by feature and responsibility',
        description:
          'Keep auth, users and items distinct, with presentation, application, domain and infrastructure responsibilities.',
        tradeoff:
          'More modules and explicit wiring in exchange for clearer places to change a workflow or integration.'
      },
      {
        title: 'Use ports for external services',
        description:
          'Compose concrete persistence, cache, media and event adapters at the dependency boundary.',
        tradeoff:
          'Adapter contracts add setup work, while keeping service-specific details out of application workflows.'
      },
      {
        title: 'Cache item-list reads',
        description:
          'Use a cache-aside path for item lists after resolving the caller’s permitted scope.',
        tradeoff:
          'Caching introduces invalidation and consistency concerns alongside the database read path.'
      }
    ],
    outcomes: [
      'A versioned API for authentication, accounts and ownership-aware item operations.',
      'Application workflows connected to persistence, caching, media uploads and SSE adapters.',
      'An implemented Streamlit client, with the Next.js frontend continuing in the same monorepo.'
    ],
    learnings:
      'Separating application rules from infrastructure makes dependencies visible. The project is also a practical setting for studying authorization scope, cache consistency and how different clients share one API.'
  },
  {
    ...projectSources['django-ecommerce'],
    title: 'Django E-commerce',
    headline: 'Connect product discovery to an order and checkout.',
    summary:
      'An educational Django shop bringing together a product catalog, session cart, accounts, orders and Stripe Checkout integration.',
    intro:
      'The focus is the path through a shop: find a product, manage quantities, create an order and hand the payment step to Stripe. Separate Django apps organize each part of that flow.',
    role: 'Developer · personal learning project',
    context: 'Commerce workflows with Django and payment integration',
    status: 'Educational implementation',
    period: 'Jan 2025 – Jan 2026',
    problem:
      'A shopping flow must connect browsing and temporary cart state with authenticated orders and an external checkout. Each transition needs a clear place in the application.',
    solution:
      'Build a modular Django monolith with catalog, account, cart, order and payment apps. Store cart state in the session and create Stripe Checkout Sessions from the payment flow.',
    contributions: [
      {
        title: 'Catalog and cart flow',
        description:
          'Connected product categories and brands with a session cart that supports adding, updating, removing and totaling items.'
      },
      {
        title: 'Accounts and orders',
        description:
          'Implemented authenticated ordering and order models that represent pending and paid states.'
      },
      {
        title: 'Checkout and confirmation',
        description:
          'Integrated Stripe Checkout Session creation and an order confirmation email flow.'
      }
    ],
    architecture: {
      summary:
        'A Django monolith divided into account, web, cart, order and payment apps, using ORM models, class-based views and server-rendered templates.',
      steps: [
        {
          title: 'Browse the catalog',
          description:
            'Product, category and brand models supply the catalog pages.'
        },
        {
          title: 'Keep a session cart',
          description:
            'The cart stores its item dictionary in request.session and handles quantities and totals.'
        },
        {
          title: 'Create an order',
          description:
            'Authenticated ordering connects the cart flow with persistent order records.'
        },
        {
          title: 'Start checkout',
          description:
            'The payment view creates a Stripe Checkout Session; the project also includes paid-state and confirmation flows.'
        }
      ]
    },
    decisions: [
      {
        title: 'Keep the shop in one Django application',
        description:
          'Use separate Django apps for distinct commerce responsibilities within one monolith.',
        tradeoff:
          'A shared runtime keeps integration approachable; boundaries between apps still need care as the project grows.'
      },
      {
        title: 'Store the cart in the session',
        description:
          'Represent the cart with a dictionary managed through Django’s request session.',
        tradeoff:
          'This keeps temporary cart state simple, while persistence and cross-device continuity depend on session behavior.'
      },
      {
        title: 'Use hosted Stripe Checkout',
        description:
          'Create a Checkout Session and delegate the payment interface to Stripe.',
        tradeoff:
          'Hosted checkout reduces payment UI work; reliable payment-state reconciliation remains a separate engineering concern.'
      }
    ],
    outcomes: [
      'A catalog organized by products, categories and brands.',
      'A session cart with quantity updates, item removal and total calculation.',
      'An ordering flow connected to Stripe Checkout Session creation and confirmation email logic.'
    ],
    learnings:
      'A checkout integration spans several kinds of state: session data, persistent orders and an external payment session. Following those transitions makes the boundaries and responsibilities of each Django app easier to reason about.'
  },
  {
    ...projectSources['social-bookmarking'],
    title: 'Social Bookmarking',
    headline: 'Turn saved images into a shared discovery feed.',
    summary:
      'A Django application for bookmarking images, editing profiles and discovering content through likes, follows and an activity feed.',
    intro:
      'The project connects image publishing with social relationships. Django serves the pages, while JavaScript requests update interactions and load additional image fragments.',
    role: 'Developer · personal learning project',
    context: 'Social interactions and content discovery with Django',
    status: 'Educational implementation',
    period: 'Oct 2024 – Aug 2025',
    problem:
      'An image collection becomes more useful when people can discover who saved it, follow related profiles and interact without reloading an entire page for each action.',
    solution:
      'Combine image bookmarking, user profiles and social relationships in Django, with AJAX endpoints for likes, follows and paginated image loading.',
    contributions: [
      {
        title: 'Image publishing and discovery',
        description:
          'Implemented image bookmarking, image-list pagination and per-session view counting.'
      },
      {
        title: 'Profiles and social relationships',
        description:
          'Connected profile editing with like/unlike and follow/unfollow interactions.'
      },
      {
        title: 'Activity feed',
        description:
          'Built an activity model that references different objects and a dashboard that filters activity from followed users.'
      }
    ],
    architecture: {
      summary:
        'Django accounts, images and action modules connect ORM relationships, server-rendered templates and JavaScript/AJAX requests.',
      steps: [
        {
          title: 'Publish and manage identity',
          description:
            'Account and image views handle profiles and the image bookmarking flow.'
        },
        {
          title: 'Request an interaction',
          description:
            'JavaScript sends AJAX requests for likes and follows; image-like responses return JSON.'
        },
        {
          title: 'Record and filter activity',
          description:
            'The activity model links actions to different objects, and the dashboard selects followed-user activity.'
        },
        {
          title: 'Load more images',
          description:
            'Paginated image fragments let the browser extend the list through additional requests.'
        }
      ]
    },
    decisions: [
      {
        title: 'Enhance server-rendered pages with AJAX',
        description:
          'Keep Django templates and add targeted requests for social actions and pagination.',
        tradeoff:
          'Focused updates keep the frontend small, while client scripts still need to handle responses and interface state.'
      },
      {
        title: 'Use a generic activity model',
        description:
          'Reference different action targets through GenericForeignKey and suppress matching recent events.',
        tradeoff:
          'A flexible feed can represent several content types, with more application-level responsibility for target relationships.'
      },
      {
        title: 'Count views per session',
        description:
          'Track image visits in the session to avoid counting each repeat request in the same browsing session.',
        tradeoff:
          'This is a simple browsing-session count, with accuracy limited by how sessions are created and retained.'
      }
    ],
    outcomes: [
      'Image bookmarking and profile editing in one application.',
      'Likes, follows and paginated image fragments handled through AJAX.',
      'An activity feed filtered by followed users, with per-session image view counting.'
    ],
    learnings:
      'Social features combine data relationships with small interface updates. Working through likes, follows and a generic activity feed makes query scope, duplicate events and browser state concrete design concerns.'
  }
]
