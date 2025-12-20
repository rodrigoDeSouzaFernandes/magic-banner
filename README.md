# Magic Banner Plugin

Este projeto é plugin desenvolvido com **Next.js 14+**, que permite criar e exibir banners personalizados dinamicamente em páginas de e-commerce com base na URL da página e, opcionalmente, no horário de exibição.

A ideia é que qualquer loja possa adicionar banners dinâmicos apenas importando um script público, sem precisar alterar o frontend principal.

---

## Tecnologias

- **Next.js** (App Router, API Routes)
- **TypeScript**
- **Supabase** (PostgreSQL + Storage)
- **React**
- **Vercel** (deploy)

---

## Funcionalidades

### Painel Administrativo

- Criar, listar e excluir banners.
- Cada banner possui:
  - URL da página de destino
  - Imagem do banner (upload ou link)
  - Horário de exibição opcional (ex.: 08:00 às 12:00)

### API de Banners

- `GET /api/banners?url=<url>` retorna o banner ativo para a URL.
- `POST /api/banners` cria um novo banner.
- `DELETE /api/banners?id=<id>` remove um banner existente.

### Script Embutível

- Localizado em `/public/magic-banner.js`.
- Captura a URL da página automaticamente.
- Faz requisição à API para buscar o banner correspondente.
- Exibe o banner dinamicamente no topo da página.
- Suporta animações de entrada e hover.

---

## Decisões técnicas

1. **Framework e bibliotecas**

   - Next.js para API Routes e deploy simplificado na Vercel.
   - Supabase para persistência de dados.
   - TypeScript para maior segurança e clareza de tipos.

2. **Estratégia de persistência**

   - Tabela `banners` com campos: `id`, `url`, `image`, `startTime`, `endTime`.
   - Repository pattern: `SupabaseBannerRepository` isolando consultas ao banco.
   - Serviço `BannerService` para encapsular regras de negócio, incluindo validação de horário.

3. **Estrutura de pastas**

   A estrutura foi pensada para manter **os arquivos mais próximos de sua responsabilidade**, tornando a organização limpa e fácil de manter.
   Cada módulo tem seu escopo claro, o que facilita manutenção, testes e deploy.

4. **Lógica de exibição condicional**

- Banner só é exibido se estiver dentro do intervalo `startTime` e `endTime`.
- O script embutível busca banners pelo URL da página.
- A lógica foi feita para ser leve: primeiro busca os banners correspondentes e depois filtra pelo horário.
- Animações suaves (`fade in` + `slide down`) e hover são aplicadas apenas quando o banner é exibido.

5. **Desafios e soluções**

- Problema: Persistência em arquivo JSON não funcionou bem com deploy na Vercel.  
  Solução: migração para utilização do Supabase.

---

## Como testar o script embutível

- Acesse a aplicação e cadastre um banner para a URL desejada.
- Adicione o seguinte script na página correspondente à URL (página que contém a URL exata):

```html
<script src="https://magic-banner-plugin.vercel.app/magic-banner.js"></script>
```
