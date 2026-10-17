import { projectSources } from './shared'
import type { ProjectDetail } from './types'

export const projectsPt: readonly ProjectDetail[] = [
  {
    ...projectSources['dulces-flares'],
    title: 'Dulces-Flares · PURO DOCE',
    headline: 'Uma experiência de marca da vontade ao preparo do pedido.',
    summary:
      'Site de confeitaria em português com catálogo tipado, carrinho persistente e preparação de pedidos pelo WhatsApp, feito com Next.js, React e TypeScript.',
    intro:
      'PURO DOCE une uma identidade de creme, caramelo e cacau a uma jornada de compra leve: descobrir produtos, ajustar o carrinho e preparar uma mensagem para o WhatsApp. A implementação equilibra design expressivo, estado do navegador e carregamento de recursos.',
    role: 'Desenvolvedor frontend · projeto pessoal',
    context: 'Experiência de marca e catálogo digital para uma confeitaria',
    status: 'Demo publicada · preparação de pedidos pelo WhatsApp',
    period: '2026',
    problem:
      'Uma página com muitas imagens e movimento precisa permitir que o visitante encontre produtos e monte um pedido pelo celular. O desafio técnico é preservar a personalidade visual sem carregar todas as interações na abertura nem perder o carrinho ao atualizar a página.',
    solution:
      'Usar App Router e seções renderizadas no servidor, com pequenas ilhas cliente para navegação, carrinho e efeitos. Centralizar os produtos em dados tipados, persistir as linhas do carrinho e gerar o resumo do pedido como mensagem para o WhatsApp.',
    contributions: [
      {
        title: 'Identidade visual e catálogo',
        description:
          'Composição responsiva com tipografia expressiva, tokens de cor e tamanhos fluidos. Um catálogo de seis produtos reúne preços em reais e imagens WebP importadas estaticamente para alimentar os cards.'
      },
      {
        title: 'Carrinho que conserva a seleção',
        description:
          'Estado centralizado com Zustand para adicionar produtos, aumentar quantidades, remover linhas e calcular totais. A persistência guarda as linhas em localStorage; a abertura do painel e as etapas do formulário continuam como estado da interface.'
      },
      {
        title: 'Do carrinho à conversa',
        description:
          'Fluxo de carrinho, formulário e tela final. Nome, bairro, produtos e quantidades compõem uma mensagem com subtotais e total, codificada em um link wa.me que abre o WhatsApp para continuar o pedido.'
      },
      {
        title: 'Movimento carregado sob demanda',
        description:
          'Painel do carrinho importado quando necessário, revelações CSS com um IntersectionObserver compartilhado e cursor decorativo adiado até o primeiro movimento de um ponteiro fino. O cursor exige um ponteiro fino, ignora movimentos de toque e respeita a preferência de movimento reduzido.'
      }
    ],
    architecture: {
      summary:
        'Frontend com Next.js App Router: conteúdo em Server Components, componentes cliente delimitados e módulos separados para catálogo, estado e composição do pedido. A jornada termina em um link para o WhatsApp; a confirmação acontece fora do site.',
      steps: [
        {
          title: 'Página e dados do catálogo',
          description:
            'As seções consomem produtos tipados de lib/products.ts. Preços, identificadores e imagens compartilham uma fonte; o conteúdo visual não depende de um gerenciador remoto para ser renderizado.'
        },
        {
          title: 'Estado e interação do carrinho',
          description:
            'lib/cart-store.ts concentra as ações e persiste as linhas. DeferredCartDrawer carrega o painel na primeira abertura e o mantém montado para as próximas interações.'
        },
        {
          title: 'Composição do pedido',
          description:
            'lib/order.ts separa a formatação monetária e a geração da mensagem da interface. CartDrawer coordena as etapas, abre o WhatsApp e limpa a seleção ao iniciar essa saída.'
        },
        {
          title: 'Camada visual e contratos de recursos',
          description:
            'CSS e um observador compartilhado coordenam as revelações. Testes com node:test verificam contratos de imagens, seções servidor e comportamento do cursor; testes do build inspecionam preloads e limites de JavaScript inicial.'
        }
      ]
    },
    decisions: [
      {
        title: 'Separar conteúdo servidor e interação cliente',
        description:
          'Manter as seções visuais como Server Components e adiar o carregamento do carrinho e do cursor decorativo.',
        tradeoff:
          'Reduz o trabalho de interação inicial, mas exige limites claros entre servidor e cliente e o download do painel na primeira abertura.'
      },
      {
        title: 'Catálogo tipado e persistência local',
        description:
          'Guardar os produtos em código e persistir apenas as linhas do carrinho com Zustand, separando os dados da compra do estado visual do painel.',
        tradeoff:
          'Simplifica o deploy e conserva a seleção no mesmo navegador. Alterar o catálogo exige publicar uma nova versão, e o carrinho não é sincronizado entre dispositivos.'
      },
      {
        title: 'Continuar o pedido pelo WhatsApp',
        description:
          'Gerar uma mensagem estruturada em vez de implementar infraestrutura própria de pedidos e pagamentos.',
        tradeoff:
          'O site prepara o pedido, mas abrir o WhatsApp não confirma envio ou aceitação. O carrinho é limpo ao abrir o link; confirmação e pagamento ficam na conversa.'
      },
      {
        title: 'Proteger o design com orçamentos técnicos',
        description:
          'Usar WebP, revelações CSS e cursor opcional, com testes que estabelecem limites para imagens, preloads e JavaScript.',
        tradeoff:
          'Os efeitos exigem lógica própria, e os limites precisam acompanhar novos recursos. Esses contratos documentam restrições; não substituem medições atuais da experiência real.'
      }
    ],
    outcomes: [
      'Demo pública que conecta uma identidade visual própria a um catálogo de seis produtos e navegação responsiva.',
      'Carrinho com quantidades, remoção, totais e recuperação da seleção pelo armazenamento do navegador.',
      'Preparação de uma mensagem com dados do cliente, itens e total para continuar o pedido pelo WhatsApp.',
      'Separação entre conteúdo e interação, carregamento adiado e testes de contratos de desempenho presentes no repositório.'
    ],
    learnings:
      'A imersão visual também depende de quando cada efeito carrega e executa. Separar catálogo, estado e mensagem facilita evoluir a jornada; tornar explícita a saída para o WhatsApp distingue uma interface concluída de um pedido realmente confirmado.'
  },
  {
    ...projectSources['fastapi-ecosystem-lab'],
    title: 'FastAPI Ecosystem Lab',
    headline: 'Um backend, vários clientes e limites explícitos.',
    summary:
      'Um monorepo de aprendizado que conecta um backend modular com FastAPI a um cliente Streamlit, com uma interface Next.js em desenvolvimento.',
    intro:
      'O projeto explora como conectar autenticação, contas e operações sobre itens mantendo a lógica de aplicação separada de bancos de dados, cache e serviços externos.',
    role: 'Desenvolvedor · projeto pessoal de aprendizado',
    context: 'Prática de arquitetura backend e integração full stack',
    status: 'Backend em evolução · interface Next.js em desenvolvimento',
    period: 'Mar 2026 – Atualmente',
    problem:
      'Um backend que atende a diferentes clientes precisa de regras consistentes de autenticação, propriedade e acesso a dados. Misturá-las às rotas dificulta a compreensão conforme as integrações crescem.',
    solution:
      'Organizar autenticação, usuários e itens em módulos. Posicionar os fluxos de aplicação atrás das rotas e conectar persistência, cache, arquivos e eventos por adaptadores.',
    contributions: [
      {
        title: 'Autenticação e contas',
        description:
          'Conexão de uma API versionada com autenticação, renovação de tokens, encerramento de sessão e gerenciamento de contas.'
      },
      {
        title: 'Operações com controle de propriedade',
        description:
          'Implementação de fluxos que resolvem o proprietário autorizado antes de consultar ou alterar itens, com leituras de listas usando cache sob demanda.'
      },
      {
        title: 'Adaptadores e integração de clientes',
        description:
          'Composição de adaptadores SQLAlchemy, Redis, Cloudinary e eventos do servidor, com um cliente Streamlit e uma interface Next.js em desenvolvimento.'
      }
    ],
    architecture: {
      summary:
        'Um backend modular em um monorepo de aprendizado. A apresentação chama os fluxos de aplicação; regras de domínio e portas separam esses fluxos da infraestrutura.',
      steps: [
        {
          title: 'Clientes e API',
          description:
            'O cliente Streamlit consome a API versionada do FastAPI. Uma interface independente com Next.js está em desenvolvimento.'
        },
        {
          title: 'Fluxos de aplicação',
          description:
            'Os módulos de autenticação, usuários e itens coordenam operações e autorização por casos de uso.'
        },
        {
          title: 'Domínio e portas',
          description:
            'Os limites de aplicação descrevem a persistência e os serviços necessários em cada fluxo.'
        },
        {
          title: 'Adaptadores de infraestrutura',
          description:
            'A composição de dependências conecta SQLAlchemy, cache Redis, arquivos no Cloudinary e eventos SSE.'
        }
      ]
    },
    decisions: [
      {
        title: 'Organizar por funcionalidade e responsabilidade',
        description:
          'Separar autenticação, usuários e itens, com responsabilidades de apresentação, aplicação, domínio e infraestrutura.',
        tradeoff:
          'Mais módulos e configuração explícita em troca de locais claros para alterar um fluxo ou uma integração.'
      },
      {
        title: 'Usar portas para serviços externos',
        description:
          'Compor os adaptadores concretos de persistência, cache, arquivos e eventos no limite de dependências.',
        tradeoff:
          'Os contratos dos adaptadores exigem trabalho inicial e mantêm os detalhes de cada serviço fora dos fluxos de aplicação.'
      },
      {
        title: 'Consultar listas com cache',
        description:
          'Usar cache sob demanda nas listas de itens após resolver o escopo autorizado do usuário.',
        tradeoff:
          'O cache acrescenta necessidades de invalidação e consistência junto ao acesso ao banco de dados.'
      }
    ],
    outcomes: [
      'API versionada para autenticação, contas e operações sobre itens com controle de propriedade.',
      'Fluxos de aplicação conectados a persistência, cache, envio de arquivos e adaptadores SSE.',
      'Cliente Streamlit implementado e interface Next.js em desenvolvimento no mesmo monorepo.'
    ],
    learnings:
      'Separar regras de aplicação e infraestrutura torna as dependências visíveis. O projeto permite estudar escopo de autorização, consistência de cache e como diferentes clientes compartilham uma API.'
  },
  {
    ...projectSources['django-ecommerce'],
    title: 'E-commerce com Django',
    headline: 'Conectar o catálogo ao pedido e ao pagamento.',
    summary:
      'Uma loja educacional com Django que reúne catálogo, carrinho por sessão, contas, pedidos e integração com Stripe Checkout.',
    intro:
      'O foco é o percurso de compra: encontrar um produto, ajustar quantidades, criar um pedido e delegar a etapa de pagamento ao Stripe. Cada parte do fluxo fica organizada em uma aplicação Django.',
    role: 'Desenvolvedor · projeto pessoal de aprendizado',
    context: 'Fluxos de comércio e integração de pagamentos com Django',
    status: 'Implementação educacional',
    period: 'Jan 2025 – Jan 2026',
    problem:
      'Uma compra conecta navegação e estado temporário do carrinho a pedidos autenticados e um serviço externo de pagamento. Cada transição precisa de um lugar claro na aplicação.',
    solution:
      'Construir um monolito modular com aplicações para catálogo, contas, carrinho, pedidos e pagamentos. Guardar o carrinho na sessão e criar sessões do Stripe Checkout no fluxo de pagamento.',
    contributions: [
      {
        title: 'Catálogo e carrinho',
        description:
          'Conexão de categorias e marcas a um carrinho por sessão que permite adicionar, atualizar, remover e calcular totais.'
      },
      {
        title: 'Contas e pedidos',
        description:
          'Implementação de pedidos autenticados e modelos com estados pendente e pago.'
      },
      {
        title: 'Pagamento e confirmação',
        description:
          'Integração da criação de sessões do Stripe Checkout e do fluxo de e-mail de confirmação de pedidos.'
      }
    ],
    architecture: {
      summary:
        'Monolito Django dividido em account, web, cart, order e payment, com modelos ORM, views baseadas em classes e templates renderizados no servidor.',
      steps: [
        {
          title: 'Explorar o catálogo',
          description:
            'Modelos de produtos, categorias e marcas alimentam as páginas do catálogo.'
        },
        {
          title: 'Manter o carrinho na sessão',
          description:
            'O carrinho guarda seu dicionário de itens em request.session e gerencia quantidades e totais.'
        },
        {
          title: 'Criar um pedido',
          description:
            'O fluxo autenticado conecta o carrinho a registros persistentes de pedidos.'
        },
        {
          title: 'Iniciar o pagamento',
          description:
            'A view de pagamento cria uma sessão do Stripe Checkout; o projeto também inclui fluxos de estado pago e confirmação.'
        }
      ]
    },
    decisions: [
      {
        title: 'Manter a loja em um monolito Django',
        description:
          'Separar as responsabilidades comerciais em aplicações Django dentro de um mesmo monolito.',
        tradeoff:
          'Um ambiente compartilhado facilita a integração; os limites entre aplicações exigem cuidado conforme o projeto cresce.'
      },
      {
        title: 'Guardar o carrinho na sessão',
        description:
          'Representar o carrinho por um dicionário gerenciado pela sessão do Django.',
        tradeoff:
          'O estado temporário fica simples, enquanto persistência e continuidade entre dispositivos dependem da sessão.'
      },
      {
        title: 'Usar o Stripe Checkout hospedado',
        description:
          'Criar uma sessão de Checkout e delegar a interface de pagamento ao Stripe.',
        tradeoff:
          'Reduz o trabalho de interface de pagamento; a conciliação confiável dos estados de pagamento continua sendo uma responsabilidade de engenharia separada.'
      }
    ],
    outcomes: [
      'Catálogo organizado por produtos, categorias e marcas.',
      'Carrinho por sessão com alteração de quantidades, remoção de itens e cálculo de totais.',
      'Fluxo de pedidos conectado à criação de sessões do Stripe Checkout e à lógica de e-mail de confirmação.'
    ],
    learnings:
      'A integração de pagamentos envolve dados de sessão, pedidos persistentes e uma sessão de pagamento externa. Acompanhar essas transições ajuda a entender os limites e responsabilidades de cada aplicação Django.'
  },
  {
    ...projectSources['social-bookmarking'],
    title: 'Social Bookmarking',
    headline: 'Transformar imagens salvas em descoberta social.',
    summary:
      'Uma aplicação Django para salvar imagens, editar perfis e descobrir conteúdo por curtidas, seguidores e um feed de atividades.',
    intro:
      'O projeto conecta a publicação de imagens a relações sociais. Django serve as páginas e JavaScript atualiza interações e carrega fragmentos de imagens por requisições.',
    role: 'Desenvolvedor · projeto pessoal de aprendizado',
    context: 'Interações sociais e descoberta de conteúdo com Django',
    status: 'Implementação educacional',
    period: 'Out 2024 – Ago 2025',
    problem:
      'Uma coleção de imagens ganha utilidade quando permite descobrir quem as salvou, seguir perfis relacionados e interagir sem recarregar a página inteira a cada ação.',
    solution:
      'Combinar favoritos de imagens, perfis e relações sociais no Django, com endpoints AJAX para curtidas, seguidores e carregamento paginado de imagens.',
    contributions: [
      {
        title: 'Publicação e descoberta de imagens',
        description:
          'Implementação de favoritos de imagens, paginação de listas e contagem de visitas por sessão.'
      },
      {
        title: 'Perfis e relações sociais',
        description:
          'Conexão da edição de perfis com ações de curtir, seguir e suas operações inversas.'
      },
      {
        title: 'Feed de atividades',
        description:
          'Construção de um modelo de atividade com referências a diferentes objetos e um painel que filtra atividades de usuários seguidos.'
      }
    ],
    architecture: {
      summary:
        'Os módulos accounts, images e action do Django conectam relações ORM, templates do servidor e requisições JavaScript/AJAX.',
      steps: [
        {
          title: 'Publicar e gerenciar o perfil',
          description:
            'As views de contas e imagens gerenciam perfis e o fluxo de salvar imagens.'
        },
        {
          title: 'Solicitar uma interação',
          description:
            'JavaScript envia requisições AJAX para curtidas e seguidores; respostas de curtidas retornam JSON.'
        },
        {
          title: 'Registrar e filtrar atividades',
          description:
            'O modelo vincula ações a diferentes objetos e o painel seleciona atividades de usuários seguidos.'
        },
        {
          title: 'Carregar mais imagens',
          description:
            'Fragmentos paginados permitem ampliar a lista no navegador por requisições adicionais.'
        }
      ]
    },
    decisions: [
      {
        title: 'Adicionar AJAX às páginas do servidor',
        description:
          'Manter templates Django e adicionar requisições específicas para ações sociais e paginação.',
        tradeoff:
          'Atualizações pontuais mantêm o frontend pequeno; os scripts precisam gerenciar respostas e estado da interface.'
      },
      {
        title: 'Usar um modelo genérico de atividade',
        description:
          'Referenciar diferentes destinos com GenericForeignKey e suprimir eventos recentes correspondentes.',
        tradeoff:
          'O feed representa vários tipos de conteúdo e deixa mais responsabilidade sobre essas relações para a aplicação.'
      },
      {
        title: 'Contar visitas por sessão',
        description:
          'Registrar visitas a imagens na sessão para evitar contar cada requisição repetida durante a mesma sessão de navegação.',
        tradeoff:
          'É uma contagem simples por sessão, com precisão limitada pela forma de criação e retenção das sessões.'
      }
    ],
    outcomes: [
      'Favoritos de imagens e edição de perfis em uma mesma aplicação.',
      'Curtidas, seguidores e fragmentos paginados de imagens por AJAX.',
      'Feed filtrado por usuários seguidos e contagem de visitas a imagens por sessão.'
    ],
    learnings:
      'Recursos sociais unem relações de dados e pequenas atualizações de interface. Curtidas, seguidores e um feed genérico tornam concretas as decisões sobre consultas, eventos duplicados e estado do navegador.'
  }
]
