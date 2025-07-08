# Domain Events com TypeScript Puro

Este projeto demonstra como implementar Domain Events usando apenas TypeScript, sem dependências de frameworks externos. É uma implementação completa seguindo os princípios de Domain-Driven Design (DDD) e Clean Architecture.

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+
- npm

### Instalação
```bash
npm install
```

### Executar
```bash
# Desenvolvimento (com ts-node)
npm run dev

# Build e execução
npm run build
npm start

# Modo watch (desenvolvimento)
npm run watch
```

## 📁 Estrutura do Projeto

```
src/
├── core/                    # Implementações base dos Domain Events
│   ├── aggregate-root.ts    # Base para agregados que emitem eventos
│   ├── domain-event-bus.ts  # Event Bus customizado
│   └── domain-event.ts      # Interface base para eventos
├── domain/                  # Camada de domínio
│   ├── entities/           # Entidades de domínio
│   │   ├── order.ts        # Entidade Pedido
│   │   └── user.ts         # Entidade Usuário
│   └── events/             # Eventos de domínio
│       ├── order-events.ts # Eventos relacionados a pedidos
│       └── user-events.ts  # Eventos relacionados a usuários
├── application/            # Camada de aplicação
│   ├── handlers/          # Event handlers
│   │   ├── order-handlers.ts
│   │   └── user-handlers.ts
│   ├── services/          # Serviços de aplicação
│   │   ├── email.service.ts
│   │   ├── inventory.service.ts
│   │   ├── invoice.service.ts
│   │   ├── order.service.ts
│   │   └── user.service.ts
│   └── use-cases/         # Casos de uso
│       ├── email-use-cases.ts
│       ├── inventory-use-cases.ts
│       ├── invoice-use-cases.ts
│       └── user-use-cases.ts
├── infrastructure/        # Camada de infraestrutura
│   ├── bootstrap.ts      # Configuração inicial
│   └── repositories/     # Repositórios
│       ├── order.repository.ts
│       └── user.repository.ts
├── shared/               # Utilitários compartilhados
│   └── utils.ts
└── main.ts              # Ponto de entrada da aplicação
```

## 🎯 Funcionalidades

- ✅ **Domain Events**: Implementação pura em TypeScript
- ✅ **Event Bus**: Sistema customizado para dispatch de eventos
- ✅ **Aggregate Root**: Padrão para entidades que emitem eventos
- ✅ **Event Handlers**: Handlers assíncronos para processamento de eventos
- ✅ **Clean Architecture**: Separação clara de responsabilidades
- ✅ **DDD**: Implementação seguindo Domain-Driven Design
- ✅ **Sistema completo**: Exemplo funcional com usuários e pedidos

## 🔧 Conceitos Implementados

### Domain Events
Os eventos de domínio são usados para comunicar mudanças importantes que ocorrem no domínio:

- **UserCreatedEvent**: Disparado quando um usuário é criado
- **UserUpdatedEvent**: Disparado quando um usuário é atualizado
- **OrderCreatedEvent**: Disparado quando um pedido é criado
- **OrderStatusChangedEvent**: Disparado quando o status de um pedido muda

### Event Bus
O Event Bus é responsável por:
- Registrar handlers para tipos específicos de eventos
- Fazer dispatch de eventos para todos os handlers registrados
- Processar eventos de forma assíncrona

### Aggregate Root
Base para entidades que podem emitir eventos de domínio:
- Mantém lista de eventos pendentes
- Fornece métodos para adicionar e limpar eventos
- Utilizado pelas entidades User e Order

## 📖 Como usar

1. **Criar uma entidade que emite eventos**:
```typescript
class User extends AggregateRoot {
  // ... propriedades e métodos
  
  create(userData: UserData) {
    // lógica de criação
    this.addEvent(new UserCreatedEvent(this));
  }
}
```

2. **Registrar handlers para eventos**:
```typescript
eventBus.register(UserCreatedEvent, userCreatedHandler);
```

3. **Fazer dispatch dos eventos**:
```typescript
const user = new User(userData);
user.create();
await eventBus.publishEvents(user.getEvents());
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.